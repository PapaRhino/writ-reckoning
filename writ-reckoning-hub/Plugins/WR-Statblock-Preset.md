# Writ & Reckoning — Fantasy Statblocks Template

> **Import first: `writ-and-reckoning-layout.json` (in this same folder)
> is the installable layout.** Import it in Settings → Fantasy Statblocks
> → Layouts via the JSON import option, and the "Writ & Reckoning Layout"
> appears without building it block by block. Its schema was verified
> against the plugin's own layout types and its built-in Fate Core layout
> (block `type` / `id` / `properties` / `conditioned`, group `nested`,
> traits `heading`, property `display` labels). After importing, set it as
> the Default Layout (see [[WR-Statblock-Setup]]) — the character sheets
> carry no `layout:` line, so the default is what makes them render.
>
> If your install has no layout import option, fall back to the manual
> build spec below — same blocks, same order.
>
> What this file *is*:
>
> 1. A **copy-paste `statblock` codeblock** in the plugin's verified format,
>    with one complete example statblock using a clearly-labeled generic
>    demo character (sample stats invented for format demonstration only —
>    not a real campaign character).
> 2. A **block-by-block build spec** for the "Writ & Reckoning Layout" you
>    create once in Settings (see
>    [[WR-Statblock-Setup]] for the step-by-step).
>
> Once that layout exists in Settings, every WR character note is just the
> codeblock below with different values — that is the closest verified
> equivalent of a preset this plugin offers.

## Why this works: custom fields are real

The plugin is not limited to D&D fields. Its docs show a Fate Core statblock
using entirely custom properties (`description`, `aspects`, `stress`,
`skills`, `stunts`, `items`) rendered by the "Basic Fate Core Layout", and
state that a layout block is associated to a monster **property** via
"Link Monster Property", and that a Property block "will display the property
name and the value of the property" and "will recursively stringify
non-string items". WR fields work the same way: any YAML key you put in the
codeblock can be shown by a layout block pointed at that key.

## Example: generic demo character (NOT a real campaign character)

The statblock below uses invented sample stats for format demonstration
only. Nothing here is a real WR character — replace every value with your
own character's stats.

Copy everything inside the fence into a character note. In Reading view it
renders with the "Writ & Reckoning Layout" (after you build it once — see
[[WR-Statblock-Setup]]). Without that layout it still parses, but the
WR-only fields are not shown by the default 5e layout.

```statblock
layout: Writ & Reckoning Layout
name: Demo Character
defense: 3
health: 12
health_dice: d6
card_pool: 3
command: 3
imagination: 2
might: 2
finesse: 3
craft: 1
essence: 2
vessel: Demo Vessel
affinity: Demo Affinity
traits:
  - name: Demo Ability (Vessel)
    desc: ""
  - name: Demo Ability (Defense)
    desc: ""
  - name: Demo Ability (Affinity)
    desc: ""
  - name: Demo Ability (Physical)
    desc: ""
```

Notes on the example:

- `layout:` must match the layout name in Settings **exactly**
  ("Writ & Reckoning Layout"), or the block falls back to the default layout
  and the WR fields are not shown.
- `traits:` uses the plugin's standard `name:` / `desc:` pair format. The
  ability descriptions are left as `""` because these are demo abilities —
  fill them in from your rules notes for a real character.
- `health_dice: d6` is kept as the literal string `d6`, exactly as specified.
  It is displayed as-is; it is not a 5e-style hit-dice formula.
- All fields are optional in the plugin ("if not provided, that Statblock
  will simply not render them"), so a character missing a field still renders.

## Field dictionary

| YAML key | Type | Shown by | Notes |
|---|---|---|---|
| `layout` | string | — (plugin directive) | Must equal the layout name in Settings. Omit it if you set the WR layout as the Default Layout. |
| `name` | string | Heading block | Character name. |
| `defense` | number | Property block | WR Defense. Deliberately *not* mapped to the built-in `ac`, so the layout labels it Defense, not Armor Class. |
| `health` | number | Property block | WR Health (max). Deliberately *not* mapped to `hp`, for the same labeling reason. |
| `health_dice` | string | Property block | e.g. `d6`. Displayed literally. |
| `card_pool` | number | Property block | WR Card Pool. |
| `command` | number | Property block | WR attribute. |
| `imagination` | number | Property block | WR attribute. |
| `might` | number | Property block | WR attribute. |
| `finesse` | number | Property block | WR attribute. |
| `craft` | number | Property block | WR attribute. |
| `essence` | number | Property block | WR attribute. |
| `vessel` | string | Property block | e.g. any vessel name. |
| `affinity` | string | Property block | e.g. any affinity name. |
| `traits` | list of `name:` / `desc:` | Traits block, Section Heading "Abilities" | WR abilities. Same pair format the plugin uses for traits/actions/reactions. |

## Layout build spec: "Writ & Reckoning Layout"

Build this once in Settings → Community Plugins → Fantasy Statblocks →
Layouts → New Layout. Name it exactly `Writ & Reckoning Layout`
(layout names must be unique). Add the blocks in this order; for each block
set "Link Monster Property" to the key shown. Set "Conditional" on for every
block except `name`, so a missing field hides its line instead of rendering
an empty one.

| # | Block type | Link Monster Property | Extra setting |
|---|---|---|---|
| 1 | Heading | `name` | — |
| 2 | Property | `defense` | — |
| 3 | Property | `health` | — |
| 4 | Property | `health_dice` | — |
| 5 | Property | `card_pool` | — |
| 6 | Group (or Inline) containing 6 Property blocks | `command`, `imagination`, `might`, `finesse`, `craft`, `essence` | Grouping is cosmetic; six plain Property blocks in a row work identically. |
| 7 | Property | `vessel` | — |
| 8 | Property | `affinity` | — |
| 9 | Traits | `traits` | Section Heading: `Abilities` |

Why Property blocks for the six attributes instead of one Table block:
a Table block requires an array of numbers plus a "Table Headers" list, and
the 5e table rendering is tied to D&D-style score/modifier display — whether
it would add modifier parentheses to WR's flat attribute values is
**unverified**. Six Property blocks are the safe, fully documented route
(the Property block simply displays the property name and value).

## What does NOT work

- **Do not hand-edit plugin settings JSON to install the layout.** Use
  the `writ-and-reckoning-layout.json` import instead. Hand-editing
  `<vault>/.obsidian/plugins/obsidian-5e-statblocks/data.json` by hand can
  corrupt your Fantasy Statblocks settings; the import path writes the same
  object through the plugin's own code.
- **No D&D-field mapping is needed, and forcing one would mislabel things.**
  `ac` would render as Armor Class, `hp` as Hit Points, `stats` as the six
  D&D abilities. WR uses its own keys above instead.
- **Unknown layout name behavior is unverified.** If `layout:` does not
  match a layout in Settings, the docs only say a statblock "will use the
  Default Layout specified in settings, unless a layout is specified" — they
  do not state what happens for a name that matches nothing. Test it once
  with a deliberately misspelled name before relying on it.
- **Block display labels are unverified.** The docs say a Property block
  displays "the property name and the value"; whether the layout editor lets
  you override that label (e.g. title-case "Card Pool" instead of the raw
  key `card_pool`) was not confirmed in the docs. Check the block editor when
  you build the layout.
- **Dice rolling on `health_dice` is optional and untested.** The plugin can
  parse dice strings in blocks when the Dice Roller plugin is installed and
  "Integrate Dice Roller" is on, but a bare `d6` was not verified to produce
  a roller. Treat any roller on that line as a bonus, not a feature.
