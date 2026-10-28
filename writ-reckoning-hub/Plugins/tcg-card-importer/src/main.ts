import { App, Modal, Notice, Plugin, PluginSettingTab, Setting, requestUrl } from "obsidian";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Game = "mtg" | "ptcg" | "ygo";

interface CardResult {
	name: string;
	set: string;
	imageSmall: string;
	imageLarge: string;
	game: Game;
	detail: string;
	// TCGdex only: full-card fetch id (needed for set name on import).
	tcgdexId?: string;
	// Statblock source data (populated per game; all optional — the fence
	// builder omits anything missing, so a thin source still yields a fence).
	typeLine?: string;
	rulesText?: string;
	health?: number;
	powerText?: string;
}

interface CreatureResult {
	name: string;
	detail: string;
}

interface ImporterSettings {
	cardsFolder: string;
	imagesFolder: string;
	tokenCollection: string;
	creatureFolder: string;
}

const DEFAULT_SETTINGS: ImporterSettings = {
	cardsFolder: "Cards",
	// Atlas resolves token images from its own assets folder, so token images
	// live here (verified against the repo's starter token: imagePath points
	// into atlas-vtt/assets/).
	imagesFolder: "atlas-vtt/assets",
	tokenCollection: "Imported",
	creatureFolder: "Characters/Pokemon",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function sanitizeFileName(name: string): string {
	return name.replace(/[\\/:*?"<>|#^[\]]/g, "").trim();
}

function slugify(name: string): string {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

function capitalize(s: string): string {
	return s.charAt(0).toUpperCase() + s.slice(1);
}

async function ensureFolder(app: App, path: string): Promise<void> {
	try {
		await app.vault.createFolder(path);
	} catch {
		// Folder already exists — fine.
	}
}

function imageExtension(url: string): string {
	const m = url.match(/\.(png|jpe?g|webp)(\?|#|$)/i);
	if (!m) return "png";
	const ext = m[1].toLowerCase();
	return ext === "jpeg" ? "jpg" : ext;
}

/** YAML-safe double-quoted scalar (JSON quoting is valid YAML here). */
function yamlStr(s: string): string {
	return JSON.stringify(s);
}

/**
 * A Fantasy Statblocks fence for an imported card/creature. Uses only
 * WR-layout fields (name, health, traits) so it renders under the Writ &
 * Reckoning layout with no layout line needed; anything missing is omitted
 * (conditioned blocks hide). This is what makes an import a potential
 * statblock instead of just a reference note: the note now carries a real
 * statblock the Bestiary can pick up and Reading view renders.
 */
function statblockFence(
	name: string,
	health: number | undefined,
	traits: { name: string; desc: string }[]
): string {
	const lines = ["```statblock", `name: ${yamlStr(name)}`];
	if (health !== undefined) lines.push(`health: ${health}`);
	const kept = traits.filter((t) => t.name !== "");
	if (kept.length > 0) {
		lines.push("traits:");
		for (const t of kept) {
			lines.push(`  - name: ${yamlStr(t.name)}`);
			lines.push(`    desc: ${yamlStr(t.desc)}`);
		}
	}
	lines.push("```");
	return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Card sources
// ---------------------------------------------------------------------------

async function searchScryfall(query: string): Promise<CardResult[]> {
	const url = `https://api.scryfall.com/cards/search?q=${encodeURIComponent(`name:${query}`)}&unique=prints`;
	const res = await requestUrl({ url });
	const json = res.json as { data?: Record<string, unknown>[] };
	if (!json.data) return [];
	return json.data.slice(0, 20).map((c) => {
		const images = c.image_uris as { small?: string; normal?: string } | undefined;
		// Double-faced cards carry text on faces, not top level.
		const faces = c.card_faces as Record<string, unknown>[] | undefined;
		const face = faces?.[0] ?? {};
		const typeLine = String(c.type_line ?? face.type_line ?? "");
		const oracleText = String(c.oracle_text ?? face.oracle_text ?? "");
		const power = c.power ?? face.power;
		const toughness = c.toughness ?? face.toughness;
		const toughNum =
			typeof toughness === "string" && /^\d+$/.test(toughness)
				? parseInt(toughness, 10)
				: undefined;
		return {
			name: String(c.name ?? "Unknown"),
			set: String(c.set_name ?? ""),
			imageSmall: images?.small ?? "",
			imageLarge: images?.normal ?? images?.small ?? "",
			game: "mtg" as Game,
			detail: `${c.set_name ?? ""} — ${typeLine}`,
			typeLine,
			rulesText: oracleText,
			health: toughNum,
			powerText:
				typeof power === "string" && typeof toughness === "string"
					? `${power}/${toughness}`
					: undefined,
		};
	});
}

// TCGdex (tcgdex.dev): free, no key. CardBrief list is cached per session and
// filtered locally; the full card is fetched on import for the set name.
interface TcgdexBrief {
	id: string;
	name: string;
	image: string;
}

let tcgdexBriefCache: TcgdexBrief[] | null = null;

async function searchTcgdex(query: string): Promise<CardResult[]> {
	if (!tcgdexBriefCache) {
		const res = await requestUrl({ url: "https://api.tcgdex.net/v2/en/cards" });
		tcgdexBriefCache = (res.json as TcgdexBrief[]) ?? [];
	}
	const q = query.toLowerCase();
	return tcgdexBriefCache
		.filter((c) => c.name.toLowerCase().includes(q))
		.slice(0, 20)
		.map((c) => ({
			name: c.name,
			set: "",
			// TCGdex asset pattern: base image URL + quality suffix.
			imageSmall: `${c.image}/low.png`,
			imageLarge: `${c.image}/high.png`,
			game: "ptcg" as Game,
			detail: c.id,
			tcgdexId: c.id,
		}));
}

async function fetchTcgdexCard(id: string): Promise<{
	name: string;
	setName: string;
	image: string;
	hp?: number;
	types?: string[];
	attacks?: { name: string; desc: string }[];
	abilities?: { name: string; desc: string }[];
}> {
	const res = await requestUrl({ url: `https://api.tcgdex.net/v2/en/cards/${id}` });
	const json = res.json as {
		name?: string;
		image?: string;
		set?: { name?: string };
		hp?: number | string;
		types?: string[];
		attacks?: { cost?: string[]; name?: string; damage?: string | number; effect?: string }[];
		abilities?: { type?: string; name?: string; effect?: string }[];
	};
	const hpNum =
		typeof json.hp === "number"
			? json.hp
			: typeof json.hp === "string" && /^\d+$/.test(json.hp)
				? parseInt(json.hp, 10)
				: undefined;
	return {
		name: String(json.name ?? ""),
		setName: json.set?.name ?? "",
		image: String(json.image ?? ""),
		hp: hpNum,
		types: json.types ?? [],
		attacks: (json.attacks ?? []).map((a) => ({
			name: String(a.name ?? "Attack"),
			desc: [
				(a.cost ?? []).join(", "),
				a.damage !== undefined && a.damage !== "" ? String(a.damage) : "",
				String(a.effect ?? ""),
			]
				.filter(Boolean)
				.join(" — "),
		})),
		abilities: (json.abilities ?? []).map((a) => ({
			name: String(a.name ?? "Ability"),
			desc: String(a.effect ?? ""),
		})),
	};
}

// YGOPRODeck (db.ygoprodeck.com): free, no key. fname = fuzzy name search.
// Rate limit: 20 requests/second.
async function searchYgo(query: string): Promise<CardResult[]> {
	const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${encodeURIComponent(query)}`;
	const res = await requestUrl({ url });
	const json = res.json as { data?: Record<string, unknown>[] };
	if (!json.data) return [];
	return json.data.slice(0, 20).map((c) => {
		const images = c.card_images as { image_url?: string; image_url_small?: string }[] | undefined;
		const sets = c.card_sets as { set_name?: string }[] | undefined;
		return {
			name: String(c.name ?? "Unknown"),
			set: sets?.[0]?.set_name ?? "",
			imageSmall: images?.[0]?.image_url_small ?? "",
			imageLarge: images?.[0]?.image_url ?? images?.[0]?.image_url_small ?? "",
			game: "ygo" as Game,
			detail: `${c.type ?? ""} — ${c.race ?? ""}`,
			typeLine: `${c.type ?? ""} — ${c.race ?? ""}`,
			rulesText: String(c.desc ?? ""),
			health: typeof c.def === "number" ? c.def : undefined,
			powerText: typeof c.atk === "number" ? `ATK ${c.atk}` : undefined,
		};
	});
}

// Lorcana: NOT SHIPPED. lorcana-api.com exists and is free, but its documented
// /cards/all endpoint could not be verified to return JSON (it returned the
// site homepage), and community tooling notes it lags on newer sets (LoranaJSON
// is preferred for set 12+). Rather than ship a broken source, Lorcana stays
// out until a working endpoint + image field shape is confirmed. Candidates:
// lorcana-api.com, LorcanaJSON.

// ---------------------------------------------------------------------------
// PokéAPI creatures (pokeapi.co): free, no key. Species list cached per
// session; detail fetched on import for artwork, types, and stats.
// ---------------------------------------------------------------------------

let pokemonListCache: string[] | null = null;

async function searchPokeapi(query: string): Promise<CreatureResult[]> {
	if (!pokemonListCache) {
		const res = await requestUrl({ url: "https://pokeapi.co/api/v2/pokemon?limit=2000" });
		const json = res.json as { results?: { name: string }[] };
		pokemonListCache = (json.results ?? []).map((r) => r.name);
	}
	const q = query.toLowerCase();
	return pokemonListCache
		.filter((name) => name.includes(q))
		.slice(0, 20)
		.map((name) => ({ name: capitalize(name), detail: name }));
}

interface PokeapiDetail {
	name: string;
	artwork: string;
	sprite: string;
	types: string[];
	height: number;
	weight: number;
	hp?: number;
	abilities?: { name: string; hidden: boolean }[];
}

async function fetchPokeapiDetail(name: string): Promise<PokeapiDetail> {
	const res = await requestUrl({ url: `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}` });
	const json = res.json as {
		name?: string;
		height?: number;
		weight?: number;
		sprites?: {
			front_default?: string | null;
			other?: Record<string, { front_default?: string | null }>;
		};
		types?: { type?: { name?: string } }[];
		stats?: { base_stat?: number; stat?: { name?: string } }[];
		abilities?: { ability?: { name?: string }; is_hidden?: boolean }[];
	};
	const other = json.sprites?.other ?? {};
	const artwork = other["official-artwork"]?.front_default ?? null;
	return {
		name: capitalize(String(json.name ?? name)),
		artwork: artwork ?? "",
		sprite: json.sprites?.front_default ?? "",
		types: (json.types ?? []).map((t) => t.type?.name ?? "").filter(Boolean),
		height: json.height ?? 0,
		weight: json.weight ?? 0,
		hp: (json.stats ?? []).find((s) => s.stat?.name === "hp")?.base_stat,
		abilities: (json.abilities ?? [])
			.map((a) => ({
				name: capitalize(String(a.ability?.name ?? "")),
				hidden: a.is_hidden ?? false,
			}))
			.filter((a) => a.name !== ""),
	};
}

// ---------------------------------------------------------------------------
// Search modals
// ---------------------------------------------------------------------------

const GAME_TITLES: Record<Game, string> = {
	mtg: "Import a Magic card",
	ptcg: "Import a Pokémon card (TCGdex)",
	ygo: "Import a Yu-Gi-Oh! card",
};

class CardSearchModal extends Modal {
	private game: Game;
	private plugin: TcgCardImporterPlugin;

	constructor(app: App, plugin: TcgCardImporterPlugin, game: Game) {
		super(app);
		this.plugin = plugin;
		this.game = game;
	}

	onOpen(): void {
		const { contentEl } = this;
		contentEl.empty();
		contentEl.createEl("h2", { text: GAME_TITLES[this.game] });

		const input = contentEl.createEl("input", { type: "text", placeholder: "Card name…" });
		input.style.width = "100%";
		const resultsEl = contentEl.createDiv();
		resultsEl.style.marginTop = "12px";

		const runSearch = async () => {
			const query = input.value.trim();
			if (!query) return;
			resultsEl.empty();
			resultsEl.createEl("p", { text: "Searching…" });
			try {
				const results = this.game === "mtg"
					? await searchScryfall(query)
					: this.game === "ptcg"
						? await searchTcgdex(query)
						: await searchYgo(query);
				resultsEl.empty();
				if (results.length === 0) {
					resultsEl.createEl("p", { text: "No matches." });
					return;
				}
				for (const card of results) {
					const row = resultsEl.createDiv();
					row.style.display = "flex";
					row.style.alignItems = "center";
					row.style.gap = "10px";
					row.style.marginBottom = "8px";
					if (card.imageSmall) {
						const img = row.createEl("img");
						img.src = card.imageSmall;
						img.style.width = "48px";
					}
					const label = row.createDiv();
					label.createEl("strong", { text: card.name });
					label.createEl("div", { text: card.detail });
					const btn = row.createEl("button", { text: "Import" });
					btn.addEventListener("click", async () => {
						btn.disabled = true;
						btn.textContent = "Importing…";
						try {
							await this.plugin.importCard(card);
							new Notice(`Imported ${card.name}`);
							this.close();
						} catch (e) {
							new Notice(`Import failed: ${(e as Error).message}`);
							btn.disabled = false;
							btn.textContent = "Import";
						}
					});
				}
			} catch (e) {
				resultsEl.empty();
				resultsEl.createEl("p", { text: `Search failed: ${(e as Error).message}` });
			}
		};

		input.addEventListener("keydown", (e) => {
			if (e.key === "Enter") void runSearch();
		});
		const searchBtn = contentEl.createEl("button", { text: "Search" });
		searchBtn.style.marginTop = "8px";
		searchBtn.addEventListener("click", () => void runSearch());
		input.focus();
	}

	onClose(): void {
		this.contentEl.empty();
	}
}

class CreatureSearchModal extends Modal {
	private plugin: TcgCardImporterPlugin;

	constructor(app: App, plugin: TcgCardImporterPlugin) {
		super(app);
		this.plugin = plugin;
	}

	onOpen(): void {
		const { contentEl } = this;
		contentEl.empty();
		contentEl.createEl("h2", { text: "Import a Pokémon creature (PokéAPI)" });

		const input = contentEl.createEl("input", { type: "text", placeholder: "Pokémon name…" });
		input.style.width = "100%";
		const resultsEl = contentEl.createDiv();
		resultsEl.style.marginTop = "12px";

		const runSearch = async () => {
			const query = input.value.trim();
			if (!query) return;
			resultsEl.empty();
			resultsEl.createEl("p", { text: "Searching…" });
			try {
				const results = await searchPokeapi(query);
				resultsEl.empty();
				if (results.length === 0) {
					resultsEl.createEl("p", { text: "No matches." });
					return;
				}
				for (const creature of results) {
					const row = resultsEl.createDiv();
					row.style.display = "flex";
					row.style.alignItems = "center";
					row.style.gap = "10px";
					row.style.marginBottom = "8px";
					row.createEl("strong", { text: creature.name });
					const btn = row.createEl("button", { text: "Import" });
					btn.addEventListener("click", async () => {
						btn.disabled = true;
						btn.textContent = "Importing…";
						try {
							await this.plugin.importCreature(creature.detail);
							new Notice(`Imported ${creature.name}`);
							this.close();
						} catch (e) {
							new Notice(`Import failed: ${(e as Error).message}`);
							btn.disabled = false;
							btn.textContent = "Import";
						}
					});
				}
			} catch (e) {
				resultsEl.empty();
				resultsEl.createEl("p", { text: `Search failed: ${(e as Error).message}` });
			}
		};

		input.addEventListener("keydown", (e) => {
			if (e.key === "Enter") void runSearch();
		});
		const searchBtn = contentEl.createEl("button", { text: "Search" });
		searchBtn.style.marginTop = "8px";
		searchBtn.addEventListener("click", () => void runSearch());
		input.focus();
	}

	onClose(): void {
		this.contentEl.empty();
	}
}

// ---------------------------------------------------------------------------
// Plugin
// ---------------------------------------------------------------------------

const GAME_LABELS: Record<Game, string> = {
	mtg: "Magic: The Gathering",
	ptcg: "Pokémon TCG",
	ygo: "Yu-Gi-Oh!",
};

const GAME_FOLDERS: Record<Game, string> = {
	mtg: "MTG",
	ptcg: "PTCG",
	ygo: "YGO",
};

export default class TcgCardImporterPlugin extends Plugin {
	settings: ImporterSettings = DEFAULT_SETTINGS;

	async onload(): Promise<void> {
		await this.loadSettings();

		this.addCommand({
			id: "import-mtg-card",
			name: "Import Magic card",
			callback: () => new CardSearchModal(this.app, this, "mtg").open(),
		});
		this.addCommand({
			id: "import-ptcg-card",
			name: "Import Pokémon card (TCGdex)",
			callback: () => new CardSearchModal(this.app, this, "ptcg").open(),
		});
		this.addCommand({
			id: "import-ygo-card",
			name: "Import Yu-Gi-Oh! card",
			callback: () => new CardSearchModal(this.app, this, "ygo").open(),
		});
		this.addCommand({
			id: "import-pokemon-creature",
			name: "Import Pokémon creature (PokéAPI)",
			callback: () => new CreatureSearchModal(this.app, this).open(),
		});

		this.addSettingTab(new ImporterSettingTab(this.app, this));
	}

	async loadSettings(): Promise<void> {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings(): Promise<void> {
		await this.saveData(this.settings);
	}

	/**
	 * Shared: save an image into Atlas's assets folder and write a real Atlas
	 * token file. Schema verified against the repo's starter token
	 * (atlas-vtt/collections/Default/tokens/token-starter-fighter.json):
	 * { atlasRecord: { format: 1, name, imagePath, collection, tags,
	 *   showRing, type: "token", id, createdAt, modifiedAt } }.
	 * Returns the vault-relative image path.
	 */
	private async saveImageAndToken(
		displayName: string,
		imageUrl: string,
		tag: string,
		idBase: string
	): Promise<string> {
		const { imagesFolder, tokenCollection } = this.settings;
		const safeName = sanitizeFileName(displayName);
		await ensureFolder(this.app, imagesFolder);
		await ensureFolder(this.app, `atlas-vtt/collections/${tokenCollection}/tokens`);

		const now = Date.now();
		const random = Math.random().toString(36).slice(2, 8);
		const ext = imageUrl ? imageExtension(imageUrl) : "png";
		const fileName = `${safeName}_${now}_${random}.${ext}`;
		const imagePath = `${imagesFolder}/${fileName}`;
		if (imageUrl) {
			const imgRes = await requestUrl({ url: imageUrl });
			if (!this.app.vault.getAbstractFileByPath(imagePath)) {
				await this.app.vault.createBinary(imagePath, imgRes.arrayBuffer);
			}
		}

		const id = slugify(idBase);
		const token = {
			atlasRecord: {
				format: 1,
				name: displayName,
				imagePath,
				collection: tokenCollection,
				tags: [tag],
				showRing: true,
				type: "token",
				id,
				createdAt: now,
				modifiedAt: now,
			},
		};
		const tokenPath = `atlas-vtt/collections/${tokenCollection}/tokens/${id}.json`;
		if (!this.app.vault.getAbstractFileByPath(tokenPath)) {
			await this.app.vault.create(tokenPath, JSON.stringify(token, null, 2));
		}
		return imagePath;
	}

	async importCard(card: CardResult): Promise<void> {
		const gameFolder = GAME_FOLDERS[card.game];
		const safeName = sanitizeFileName(card.name);
		const { cardsFolder } = this.settings;

		// TCGdex briefs carry no set name — fetch the full card on import.
		let setName = card.set;
		let imageLarge = card.imageLarge;
		let ptcgFull: Awaited<ReturnType<typeof fetchTcgdexCard>> | undefined;
		if (card.game === "ptcg" && card.tcgdexId) {
			ptcgFull = await fetchTcgdexCard(card.tcgdexId);
			setName = ptcgFull.setName;
			if (ptcgFull.image) imageLarge = `${ptcgFull.image}/high.png`;
		}

		const imagePath = await this.saveImageAndToken(
			card.name,
			imageLarge,
			gameFolder,
			`${card.game}-${safeName}`
		);

		// Statblock fence: traits/health per game, from the source data.
		let fenceHealth = card.health;
		let fenceTraits: { name: string; desc: string }[] = [];
		if (card.game === "mtg" || card.game === "ygo") {
			if (card.typeLine || card.rulesText) {
				fenceTraits.push({ name: card.typeLine ?? "Card", desc: card.rulesText ?? "" });
			}
			if (card.powerText) {
				fenceTraits.push({
					name: card.game === "mtg" ? "Power / Toughness" : "Attack",
					desc: card.powerText,
				});
			}
		} else if (ptcgFull) {
			fenceHealth = ptcgFull.hp;
			fenceTraits = [
				...(ptcgFull.attacks ?? []),
				...(ptcgFull.abilities ?? []),
				...(ptcgFull.types && ptcgFull.types.length > 0
					? [{ name: "Types", desc: ptcgFull.types.join(", ") }]
					: []),
			];
		}
		const fence = statblockFence(card.name, fenceHealth, fenceTraits);

		await ensureFolder(this.app, `${cardsFolder}/${gameFolder}`);
		const notePath = `${cardsFolder}/${gameFolder}/${safeName}.md`;
		const noteBody = `---\ngame: ${card.game}\nset: "${setName.replace(/"/g, "")}"\nimage: "[[${imagePath}]]"\n---\n\n# ${card.name}\n\n![[${imagePath}]]\n\n- **Game:** ${GAME_LABELS[card.game]}\n- **Set:** ${setName}\n- **Detail:** ${card.detail}\n\n## Statblock\n\n${fence}\n`;
		if (!this.app.vault.getAbstractFileByPath(notePath)) {
			await this.app.vault.create(notePath, noteBody);
		}
	}

	async importCreature(pokemonName: string): Promise<void> {
		const detail = await fetchPokeapiDetail(pokemonName);
		const imageUrl = detail.artwork || detail.sprite;
		const imagePath = await this.saveImageAndToken(
			detail.name,
			imageUrl,
			"Pokemon",
			`pokemon-${sanitizeFileName(detail.name)}`
		);

		const { creatureFolder } = this.settings;
		await ensureFolder(this.app, creatureFolder);
		const safeName = sanitizeFileName(detail.name);
		const notePath = `${creatureFolder}/${safeName}.md`;
		const fenceTraits: { name: string; desc: string }[] = [];
		if (detail.types.length > 0) {
			fenceTraits.push({ name: "Types", desc: detail.types.join(", ") });
		}
		if (detail.abilities && detail.abilities.length > 0) {
			fenceTraits.push({
				name: "Abilities",
				desc: detail.abilities
					.map((a) => (a.hidden ? `${a.name} (Hidden)` : a.name))
					.join(", "),
			});
		}
		const fence = statblockFence(detail.name, detail.hp, fenceTraits);
		const noteBody = `---\ngame: pokemon-creature\ntypes: [${detail.types.join(", ")}]\nimage: "[[${imagePath}]]"\n---\n\n# ${detail.name}\n\n![[${imagePath}]]\n\n- **Types:** ${detail.types.join(", ") || "—"}\n- **Height:** ${detail.height} dm\n- **Weight:** ${detail.weight} hg\n- **Source:** PokéAPI\n\n## Statblock\n\n${fence}\n`;
		if (!this.app.vault.getAbstractFileByPath(notePath)) {
			await this.app.vault.create(notePath, noteBody);
		}
	}
}

class ImporterSettingTab extends PluginSettingTab {
	plugin: TcgCardImporterPlugin;

	constructor(app: App, plugin: TcgCardImporterPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();
		containerEl.createEl("h2", { text: "TCG Card Importer" });
		containerEl.createEl("p", { text: "All sources are key-free: Scryfall (Magic), TCGdex (Pokémon cards), YGOPRODeck (Yu-Gi-Oh!), PokéAPI (Pokémon creatures). Lorcana is not shipped yet — see the README." });

		new Setting(containerEl)
			.setName("Cards folder")
			.setDesc("Where card reference notes are saved.")
			.addText((text) =>
				text
					.setValue(this.plugin.settings.cardsFolder)
					.onChange(async (value) => {
						this.plugin.settings.cardsFolder = value || DEFAULT_SETTINGS.cardsFolder;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Atlas assets folder")
			.setDesc("Where token images are saved. Atlas resolves token images from its own assets folder, so keep this at atlas-vtt/assets unless you know otherwise.")
			.addText((text) =>
				text
					.setValue(this.plugin.settings.imagesFolder)
					.onChange(async (value) => {
						this.plugin.settings.imagesFolder = value || DEFAULT_SETTINGS.imagesFolder;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Token collection")
			.setDesc("Atlas collection imported tokens go into.")
			.addText((text) =>
				text
					.setValue(this.plugin.settings.tokenCollection)
					.onChange(async (value) => {
						this.plugin.settings.tokenCollection = value || DEFAULT_SETTINGS.tokenCollection;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Creature folder")
			.setDesc("Where PokéAPI creature notes are saved.")
			.addText((text) =>
				text
					.setValue(this.plugin.settings.creatureFolder)
					.onChange(async (value) => {
						this.plugin.settings.creatureFolder = value || DEFAULT_SETTINGS.creatureFolder;
						await this.plugin.saveSettings();
					})
			);
	}
}
