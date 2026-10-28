# Atlas VTT — The Crater Call tokens

Session-1 cast tokens for the one-shot (5 pregens + 4 session-1 NPCs), in the
verified Atlas token schema (`atlasRecord` with `format: 1`, `name`,
`imagePath`, `collection`, `tags`, `showRing: true`, `type: "token"`, `id`,
`createdAt`, `modifiedAt`).

## Placement

The token files ship in the vault's own `atlas-vtt/collections/Writ & Reckoning/tokens/`
folder (repo-root `atlas-vtt/`, not the hub subfolder), so after pulling they are
already where Atlas looks for them — no copying needed.

**Do NOT overwrite your vault's `atlas-vtt/library.json`.** That file is only
`{format: 1, defaultCollectionId, starterTokensAdded}` — there is no per-token
index to update, so the token files alone suffice.

## Token images — PLACEHOLDERS, not yet filled

The `imagePath` in each token points to an Atlas-style filename in
`atlas-vtt/assets/` (for example `Alba_Ferrer_<timestamp>_<random>.png`).
**Those image files do not exist yet.** Before play, save one square image per
token into your vault's `atlas-vtt/assets/` folder under the exact filename in
the table below. Suggested art is the character's first Creature Form card art
via TCGdex (Nick's card database pick); Hedda and Tamsin have no Forms files,
so any fitting portrait works for them.

| Token | Token file | Image filename (save art as this) | Suggested art |
| --- | --- | --- | --- |
| Alba Ferrer | 670ba3b8-9490-4a4c-be58-e128a48626bc.json | Alba_Ferrer_1793201820002_q52nv6.png | Growlithe card art (TCGdex) |
| Tomas Vidal | 763dfe86-168e-427d-b868-deed96585893.json | Tomas_Vidal_1793201820002_me6oed.png | Machop card art (TCGdex) |
| Luz Ortega | 808f8493-8a7a-4ee8-b205-c0e423ab27df.json | Luz_Ortega_1793201820002_ianmgt.png | Abra card art (TCGdex) |
| Willa Bramble | d57af45c-7779-48a7-8b95-635d20d87783.json | Willa_Bramble_1793201820002_5yktyr.png | Oddish card art (TCGdex) |
| Jory Fenwick | 78288ecc-ed6f-4609-a277-a275551a5870.json | Jory_Fenwick_1793201820002_l4lwgk.png | Eevee card art (TCGdex) |
| Hedda | fbbd919b-7919-4acc-9755-f693a2460d72.json | Hedda_1793201820002_c9j4gr.png | Placeholder portrait (no Forms file) |
| Kess Varro | ee04bbbd-dfc2-4253-a452-9d4adddf3ef6.json | Kess_Varro_1793201820002_1n5v4x.png | Zoroark card art (TCGdex) |
| Corvin Ash | 9ecef065-7af2-4b6b-b53c-5cf403ffb94e.json | Corvin_Ash_1793201820002_gh2plf.png | Houndoom card art (TCGdex) |
| Tamsin | 1ae12ea6-7620-486b-8907-7e57fae4a261.json | Tamsin_1793201820002_umpfpk.png | Placeholder portrait (no Forms file) |

## Not included (deliberate)

- No tokens for the continuation cast (Rosa, Vicente, Severo, Miró) or the
  additional starter options (Wren, Rowan) — add them the same way when those
  sessions come up.
- No scene file: the Atlas scene format is unverified, so none is invented.
  See `Scene-Staging.md` for prose staging instead.
