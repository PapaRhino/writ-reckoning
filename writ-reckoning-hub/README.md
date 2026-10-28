# Writ & Reckoning — Hub

The home base for running Writ & Reckoning out of this vault. Everything links from here.

## Start here

- [[Writ-and-Reckoning]] — the game itself: what Writ is, what Reckoning is, how a session flows. (Mostly TODO — yours to define.)
- [[Campaign-Index]] — campaigns, and the sessions inside them.
- [[Maps-Index]] — Atlas maps and the tokens that live on them.
- [[Card-Library]] — TCG cards imported as map tokens and reference notes.
- [[Rules-Index]] — rules reference, section by section.
- [[GM-Screen]] — pre-session, during-session, and post-session checklists.

## Folders

| Folder | What's in it |
|---|---|
| `Campaigns/` | Campaign notes and session logs |
| `Characters/` | PCs and NPCs |
| `Locations/` | Map notes that pair with Atlas scenes |
| `Rules/` | Rules reference |
| `Cards/` | Imported TCG card notes |
| `GM/` | GM screen and prep |
| `Plugins/` | Plugin concepts and build notes |

## How this vault is wired

- **Atlas VTT** runs the maps. Map notes in `Locations/` link to their Atlas scenes; tokens live in `atlas-vtt/collections/`.
- **Git** backs the vault up to `github.com/PapaRhino/writ-reckoning`. Commit and push after sessions so nothing lives only on one machine.
- **TCG cards** come in through the importer concept in `Plugins/` — one card, one token, one reference note.
