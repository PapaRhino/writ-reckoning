# TCG Card Importer (v0.3)

Obsidian plugin for the Writ & Reckoning vault. Search cards and creatures,
import each as: a saved image, a reference note, a real Atlas token JSON,
and a `statblock` fence in the note — so the import lands as a potential
statblock (Fantasy Statblocks picks it up, and it renders under the Writ &
Reckoning layout) as well as a token Atlas can use.

## Sources (all key-free)

| What | Source | Command |
|---|---|---|
| Magic: The Gathering cards | Scryfall | Import Magic card |
| Pokémon TCG cards | TCGdex (tcgdex.dev) | Import Pokémon card (TCGdex) |
| Yu-Gi-Oh! cards | YGOPRODeck | Import Yu-Gi-Oh! card |
| Pokémon creatures | PokéAPI (pokeapi.co) | Import Pokémon creature (PokéAPI) |

Cards land as image + note in `Cards/<Game>/` + token. Creatures land as
artwork/sprite + note in `Characters/Pokemon/` + token. Every note also
carries a `statblock` fence under a `## Statblock` heading, using only
WR-layout fields (name, health, traits) so it renders with no layout line:

| Import | Health | Traits |
|---|---|---|
| Magic card | Toughness (creatures) | Type line + rules text, Power/Toughness |
| Pokémon card | HP | Attacks (cost, damage, effect), abilities, types |
| Yu-Gi-Oh! card | DEF | Type + race + card text, ATK |
| Pokémon creature | Base HP | Types, abilities (hidden marked) |

WR stats (Command, Imagination, etc.) are not on foreign cards, so those
rows stay hidden until you fill them in — the fence is a starting
statblock, not a finished WR character sheet. The Atlas side is unchanged:
the token JSON + image already land in `atlas-vtt/` per the verified schema,
which is what Atlas's token creator works from.

## Token schema — verified

Token files match the vault's real starter token
(`atlas-vtt/collections/Default/tokens/token-starter-fighter.json`):

```json
{ "atlasRecord": { "format": 1, "name": "...", "imagePath": "atlas-vtt/assets/...",
  "collection": "Imported", "tags": ["MTG"], "showRing": true, "type": "token",
  "id": "mtg-lightning-bolt", "createdAt": 0, "modifiedAt": 0 } }
```

Token images go into `atlas-vtt/assets/` (Atlas's own asset folder, where the
starter tokens' images live), with Atlas-style filenames
(`<Name>_<timestamp>_<random>.<ext>`). Token files go into
`atlas-vtt/collections/<collection>/tokens/<id>.json`. The library index
(`atlas-vtt/library.json`) holds no per-token entries, so files alone are
enough for Atlas to pick them up.

Caveat: the schema was verified against the copy in the repo. If the live
vault's Atlas version writes tokens differently, compare one fresh starter
token before trusting imports on a real map.

## Lorcana — not shipped

Lorcana is deliberately left out of this build. lorcana-api.com exists and is
free, but its documented `/cards/all` endpoint could not be verified to return
JSON (it returned the site homepage), and community tooling notes it lags on
newer sets (LoranaJSON is preferred for set 12+). Rather than ship a broken
source, Lorcana stays out until a working endpoint and image field shape are
confirmed. Candidates: lorcana-api.com, LorcanaJSON.

Note: Disney has enforced Lorcana card-image rights before (Pixelborn was shut
down at Disney's request in 2024). Keep any future Lorcana imports private.

## Install

`main.js` is built and in this folder alongside `manifest.json`. To install:

1. Copy `main.js` and `manifest.json` into the vault at
   `.obsidian/plugins/tcg-card-importer/`.
2. In Obsidian: Settings → Community plugins → enable "TCG Card Importer".
3. No API keys needed anywhere.

To rebuild from source:

```sh
npm install
npm run build
```

## Use

Command palette → one of the four import commands → type a name → pick a
result → Import.

## Status: what works, what is untested

- **Works (code-complete):** all four search clients, image download, note
  creation, statblock fence in every note, token writing in the verified Atlas schema, settings tab.
- **Untested:** the plugin has not been run inside Obsidian yet — no live
  import has been done, no token has been placed on a map, and the four APIs
  have not been exercised from the plugin runtime (only their docs were
  checked). First live test should be one cheap import per source, then
  opening the token in Atlas and the note's statblock in Reading view.
- **Known gaps:** Lorcana (see above); MTG art-crop / `layout:token` /
  type-search options from the earlier exploration are not in this build;
  general TTRPG token-pack indexing is not in this build.

## Notes

- Card art belongs to its publishers; this is for private tabletop play, not
  redistribution.
