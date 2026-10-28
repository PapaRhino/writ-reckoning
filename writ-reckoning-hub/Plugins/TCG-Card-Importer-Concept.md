# TCG Card Importer — Plugin Concept

> Status: concept only, not built. This doc exists so the build starts from a real plan instead of a guess.

## What it would do

In Obsidian, open a search box, pick a game (Pokémon TCG, Magic, Lorcana, Yu-Gi-Oh!), type a card name, and get:

1. The card image saved into the vault.
2. An Atlas token for that card, ready to drop onto a map.
3. A reference note in `Cards/<Game>/` with the card's data.

V1 could stop at steps 1 and 3 (image + note, token placed by hand in Atlas). V2 would write the token JSON directly so the card lands on a chosen map in one action.

## How Atlas tokens work (as seen in this vault)

Tokens are JSON files in `atlas-vtt/collections/<Collection>/tokens/` paired with images — the vault already ships starter tokens (assassin, cleric, fighter, etc.). The importer would copy that shape: one token JSON + one image per card.

**Open question before building:** read one starter token file (e.g. `token-starter-fighter.json`) and confirm exactly which fields Atlas needs — name, image path, size, and anything else. The build should match that schema exactly, not a guessed one.

## Card data sources, per game

| Game | Source | Notes |
|---|---|---|
| Magic: The Gathering | Scryfall API | Free, no key needed, stable. Best first build target. Images + full data. |
| Pokémon TCG | TCGdex (tcgdex.dev) | Free, no key, multilingual. Card list cached per session, full card fetched on import for the set name. |
| Pokémon creatures | PokéAPI (pokeapi.co) | Free, no key. Species list cached per session; official artwork (or sprite) + types/height/weight on import. Separate from cards — creatures, not card data. |
| Yu-Gi-Oh! | YGOPRODeck API | Free, no key. Images + data. |
| Lorcana | No official public API | Community data sources exist (e.g. dreamborn.ink data) but need vetting for stability and image rights. Build this one last. |

## Suggested build order

1. **MTG via Scryfall** — simplest API, proves the token-writing path.
2. **Pokémon TCG via TCGdex** — same path, second source, no key.
3. **Pokémon creatures via PokéAPI** — same token path, different data (artwork + types).
4. **Yu-Gi-Oh!** — same path, third card source.
5. **Lorcana** — only after a stable data source is confirmed.

## What kind of plugin

An Obsidian community plugin (TypeScript): a search modal, an API client per game, a file writer for images/notes/token JSON. It would need to be installed as a community plugin in this vault, and its Atlas compatibility checked against the Atlas version here (including Atlas Online, if remote play is in use).

## Things to decide before building

- Which game first? (Suggestion: MTG.)
- Where do card images live? (Suggestion: a `Cards/Images/` folder, or alongside the token.)
- What goes on a card note — full rules text, or just name/set/image/stats? (Depends on what [[Rules-Index]] says cards do in play.)
- Token defaults: size on the grid, and whether all cards in a collection share a style.
- Card art note: card images belong to their publishers. Importing them for private tabletop play is the standard community-plugin pattern; republishing or redistributing the images is a different matter.

## What this is NOT

- Not a card database for the vault to browse — it's an importer: you search, you pick, it lands in the vault.
- Not a rules engine — it doesn't adjudicate what a card does in Writ & Reckoning. That's [[Rules-Index]]'s job.
