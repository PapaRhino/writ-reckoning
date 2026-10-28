# Wren Ashdown

- **Name:** Wren Ashdown
- **Affinity:** Verdant, the Energy Shepherd (Lesser Power)
- **Vessel:** Shepherd's satchel — a worn woven satchel with energy stones set into its flap (Carried, +1 HP)
- **DEF:** 4
- **Max Health:** 9
- **Current Health:** 9
- **Health Dice:** d6
- **Card Pool:** 4
- **Background:** Working (+2 HP, 100 starting coin)
- **Starting coin:** 100

## Health math

6 base + 1 (Carried vessel) + 2 (Working background) = 9 Max Health. Health Dice band 8–11 = d6 (Average).

## Stats

- **Command:** 3
- **Imagination:** 2
- **Might:** 2
- **Finesse:** 4
- **Craft:** 1
- **Essence:** 5

## Dice pools

Each stat's pool is a number of physical d6s equal to the stat value, and the dice pool max equals the stat value unless noted otherwise. Modifier die: d6 by default, d8 with Clarity, d4 with Strain (sourcebook). Dice pool d6s explode on 6s (6 = success + reroll, chaining).

- **Command:** pool 3d6, max 3
- **Imagination:** pool 2d6, max 2
- **Might:** pool 2d6, max 2
- **Finesse:** pool 4d6, max 4
- **Craft:** pool 1d6, max 1
- **Essence:** pool 5d6, max 5

HOUSE RULE: pool d6s succeed on 4+. Check total = successes + modifier die. Difficulties: Easy 3, Standard 5, Hard 7, Heroic 9.

## Abilities (4, as per character creation)

- **Vessel — Unstable Form + Elemental:** Wren's satchel holds Verdant's unstable form: a deck of basic Pokémon energy cards (see `Cards/Wren-Forms.md`). It takes 1 card slot and cannot be traded away without consequence (sourcebook).
- **Defensive style — Unarmored:** DEF 4. She avoids harm by moving, not by armor — quick feet and open ground, not plate.
- **Affinity — Energy Choice + Distant:** Her Verdant affinity lets her choose which energy she draws on and work at range — she is the party's flexible energy source, not a front-line fighter.
- **Physical trait — Shepherd's stride and weather-lined hands:** Years of walking hill country in all weather left her with an effortless long-distance gait and hands that know rope, harness, and animal alike.

## Backstory

Wren grew up herding sheep and goats through the hill pastures of west Paldea, the daughter of a shepherd family that measured wealth in healthy animals and honest neighbors. She learned to read weather, water, and tired animals the way other children learned road signs — and she learned to walk long distances without complaint, satchel at her hip, because in hill country everything useful is one more ridge away. Her satchel came to her young, as vessels do for those raised in the practice, and her gift turned out to be not for commanding creatures or forging gear, but for the raw stuff underneath it all: energy itself.

When she was old enough to hire out, she followed the work toward the Great Crater's rim — guiding travelers, carrying goods, and tending the pack animals others neglected — and found that energy behaves strangely near the crater. A shepherd notices when the flock's water tastes wrong, and she wants to know why before anyone else has to drink it. She joined this expedition as guide and carrier, and stayed when she realized the strangeness had a cause with hands on it.

## Personality + roleplaying hooks

- **Calm under open sky, restless indoors.** She thinks best while walking. Give her a reason to pace, scout, or step outside and she will volunteer before anyone else.
- **Practical generosity.** She shares food, energy, and effort without ceremony — but she notices who takes without giving back, and she remembers it.
- **Distant by habit, not by coldness.** She hangs back in a fight, watches, and feeds the right energy to the right ally at the right moment. In conversation she is the same — a beat slower to speak, and worth listening to when she does.
- **Hook — the satchel:** she keeps it close and does not lend it. Anyone asking to "just hold" the satchel gets a flat no.
- **Hook — animal sense:** she notices distressed or restless creatures before anyone else does. The GM can use her as an early-warning voice when something near the crater is wrong.

## Adventure role

Intro one-shot PC — the party's flexible energy source and ranged support: she feeds energy to allies' Forms, covers distance, and reads the crater's strange energy before the party walks into it. Works with any 4–5 player combination; with five players she pairs naturally with the scout (Rowan) on the party's mobile edge.

## Continuation hook (intro one-shot — thread stays open)

The expedition's immediate job resolves in session one, but Wren's story does not seal shut: the crater's strange energy will not settle just because one hoarder is stopped, and a shepherd who has seen the water taste wrong does not unsee it. The larger thread stays open for a second session.

## Forms

See `Cards/Wren-Forms.md` — Verdant's unstable energy deck (1 slot) plus 3 regular Forms, 4 total, within her Card Pool of 4.

## Soulrocks / death (sourcebook reminders)

- Soulrocks are gained on critical successes or GM-ruled significant moments (1–3 per player per session).
- At 0 HP the player chooses: die, pay 1 Soulrock to postpone 1 turn, or take the Summoner's Bargain (lose a random card permanently and stabilize at 1 HP, OR take a lasting wound and stabilize at 1 HP).

## Statblock (Fantasy Statblocks)

Renders with the "Writ & Reckoning Layout" — build it once in Settings (see [[WR-Statblock-Setup]]; set it as the Default Layout, or add `layout: Writ & Reckoning Layout` to the codeblock below).

```statblock
name: "Wren Ashdown"
defense: 4
health: 9
health_dice: d6
card_pool: 4
command: 3
imagination: 2
might: 2
finesse: 4
craft: 1
essence: 5
vessel: "Shepherd's satchel — a worn woven satchel with energy stones set into its flap (Carried, +1 HP)"
affinity: "Verdant, the Energy Shepherd (Lesser Power)"
traits:
  - name: "Vessel — Unstable Form + Elemental"
    desc: "Wren's satchel holds Verdant's unstable form: a deck of basic Pokémon energy cards (see `Cards/Wren-Forms.md`). It takes 1 card slot and cannot be traded away without consequence (sourcebook)."
  - name: "Defensive style — Unarmored"
    desc: "DEF 4. She avoids harm by moving, not by armor — quick feet and open ground, not plate."
  - name: "Affinity — Energy Choice + Distant"
    desc: "Her Verdant affinity lets her choose which energy she draws on and work at range — she is the party's flexible energy source, not a front-line fighter."
  - name: "Physical trait — Shepherd's stride and weather-lined hands"
    desc: "Years of walking hill country in all weather left her with an effortless long-distance gait and hands that know rope, harness, and animal alike."
```
