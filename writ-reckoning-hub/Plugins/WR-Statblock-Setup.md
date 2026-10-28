# Writ & Reckoning Statblocks — Setup

How to get WR character statblocks rendering in Obsidian with the
Fantasy Statblocks plugin (plugin id: `obsidian-5e-statblocks`).

**The one-sentence version:** the plugin has no preset file you can install,
so you build the "Writ & Reckoning Layout" once in Settings (about 10
minutes, following the table below), and after that every character is just
a copy-paste `statblock` codeblock. The template and the generic demo
example live
in [[WR-Statblock-Preset]].

## Step 1 — Put the template file in your vault

Copy `Plugins/WR-Statblock-Preset.md` into your vault (any folder works —
its location does not matter to the plugin; it is only a reference you copy
from). **This step alone installs nothing.** It does not register a layout,
a preset, or a creature. The layout is created in Step 2.

Prerequisite: Fantasy Statblocks installed and enabled
(Settings → Community Plugins → Browse → "Fantasy Statblocks" → Install →
Enable).

## Step 2 — Build the layout (once)

1. Open Settings → Community Plugins → Fantasy Statblocks → Layouts.
2. Click **New Layout**. (Or copy an existing layout and click Edit — the
   docs describe both routes. Starting fresh is cleaner for WR.)
3. Name it exactly:

   ```
   Writ & Reckoning Layout
   ```

   Layout names must be unique, and the `layout:` line in every character
   statblock must match this name character-for-character.
4. Click **Add Block** for each row below, in order. For each block, set
   "Link Monster Property" to the key shown, and turn "Conditional" on for
   every block except `name` (a conditional block is not rendered when its
   property does not exist).

   | # | Block type | Link Monster Property | Extra setting |
   |---|---|---|---|
   | 1 | Heading | `name` | — |
   | 2 | Property | `defense` | — |
   | 3 | Property | `health` | — |
   | 4 | Property | `health_dice` | — |
   | 5 | Property | `card_pool` | — |
   | 6 | Group (or Inline) with 6 Property blocks inside | `command`, `imagination`, `might`, `finesse`, `craft`, `essence` | Grouping is cosmetic only. |
   | 7 | Property | `vessel` | — |
   | 8 | Property | `affinity` | — |
   | 9 | Traits | `traits` | Section Heading: `Abilities` |

5. Save the layout. (Blocks can be reordered by dragging the drag handle,
   and edited via the Edit Block button on hover, per the docs.)

Optional: in the same Layouts settings section, set **Default Layout** to
"Writ & Reckoning Layout". Then character statblocks render with it even
without a `layout:` line — but keep the `layout:` line in the template
anyway, so a note still renders correctly if the default is ever changed
back to 5e.

## Step 3 — Write a new WR character statblock

In any character note, paste the blank template below and fill in the
values. Switch to Reading view to see it rendered. (All fields are optional
in the plugin — a missing field simply does not render, so a half-filled
draft still works.)

```statblock
layout: Writ & Reckoning Layout
name:
defense:
health:
health_dice:
card_pool:
command:
imagination:
might:
finesse:
craft:
essence:
vessel:
affinity:
traits:
  - name:
    desc: ""
```

Rules that will save you errors (from the plugin docs — the codeblock is
parsed as YAML):

- Quote any value containing `:` or `*` (e.g. a trait description like
  `"Melee Weapon Attack: +5 to hit"`).
- Indent list items exactly as shown: two spaces before `- name:`, four
  spaces before `desc:`.
- Keep the six attributes as separate keys (`command: 4`, etc.), not as a
  `stats:` array — `stats` is the D&D six-ability array and would render
  with D&D labels/modifiers.

### Optional: save a character to the Bestiary

Rendering does not need this. If you want the character reusable by name
(e.g. for the Initiative Tracker plugin), open the rendered statblock's menu
(top-right icon) and choose "Save to Bestiary". You can then reference it
with `monster: Demo Character` in another statblock and override individual fields.

## Troubleshooting

| Symptom | Likely cause / fix |
|---|---|
| Only the name (or nothing WR-specific) renders | The `layout:` line does not exactly match the layout name in Settings, so the default 5e layout is used. Check spelling, including the `&`. |
| A field shows an empty line | That block's "Conditional" is off. Turn it on so missing properties hide. |
| A field you added does not appear at all | No block in the layout points at that YAML key. Add a Property block linked to the key. Unknown keys are ignored, not errors. |
| YAML error / block does not render | Usually bad indentation or an unquoted `:` in a value. Quote the value and re-check indentation. |
| Labels look like raw keys (`card_pool`) | The docs say a Property block displays the property name and value; whether the editor allows a custom display label was not confirmed. Check the block editor for a label field when building the layout. |

## What does NOT work — honestly

- **There is no preset file, import button, or template folder for layouts.**
  The docs' only layout-sharing routes are a GitHub discussion and a pull
  request adding a layout to the plugin's own code. This setup's "preset" is
  therefore a build spec + a copy-paste codeblock, not an installable file.
- **Do not hand-edit plugin settings JSON** to inject a layout. Layouts live
  in plugin settings, not in a vault file, and their JSON schema is not
  documented. A bad edit risks corrupting your Fantasy Statblocks settings.
- **WR fields do not render under the default 5e layout.** Until the WR
  layout is built, `defense`, `health_dice`, `card_pool`, `vessel`,
  `affinity`, and the six WR attributes are parsed but not displayed.
- **Dice rolling is not promised.** A bare `health_dice: d6` is displayed
  literally. The plugin's dice integration (Dice Roller plugin +
  "Integrate Dice Roller" + "Parse for Dice" on a block) parses strings like
  `19 (2d10 + 8)`; a bare `d6` producing a roller was not verified.

## Sources

- Fantasy Statblocks docs (README mirrored; documentation moved to
  plugins.javalent.com): `statblock` codeblock format, "All fields are
  optional", Layouts section ("As of Fantasy Statblocks v2.0.0, custom
  layouts may be created in settings"), block types (Heading, Subheading,
  Image, Property, Saves, Spells, Table, Traits, Group, Inline), "Sharing
  Layouts" and "Adding a Layout to the Plugin" (pull request, not a vault
  file), and the Settings list (which includes "Import Creatures" but no
  layout import).
- Fate Core full example in the same docs, proving arbitrary custom
  properties render under a custom layout.
