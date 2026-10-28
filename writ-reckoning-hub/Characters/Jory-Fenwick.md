# Jory Fenwick

- **Name:** Jory Fenwick
- **Affinity:** Verdant, the Energy Shepherd (Lesser Power)
- **Vessel:** Messenger's satchel — a worn leather satchel with a reinforced flap and stitched shard pockets (Carried, +1 HP)
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

- **Command:** 2
- **Imagination:** 3
- **Might:** 3
- **Finesse:** 4
- **Craft:** 2
- **Essence:** 3

## Dice pools

Each stat's pool is a number of physical d6s equal to the stat value, and the dice pool max equals the stat value unless noted otherwise. Modifier die: d6 by default, d8 with Clarity, d4 with Strain (sourcebook). Dice pool d6s explode on 6s (6 = success + reroll, chaining).

- **Command:** pool 2d6, max 2
- **Imagination:** pool 3d6, max 3
- **Might:** pool 3d6, max 3
- **Finesse:** pool 4d6, max 4
- **Craft:** pool 2d6, max 2
- **Essence:** pool 3d6, max 3

HOUSE RULE: pool d6s succeed on 4+. Check total = successes + modifier die. Difficulties: Easy 3, Standard 5, Hard 7, Heroic 9.

## Abilities (4, as per character creation)

- **Vessel — Unstable Form + satchel:** His satchel holds Verdant's unstable form: a deck of basic Pokémon energy cards (see `Cards/Jory-Forms.md`). It takes 1 card slot and cannot be traded away without consequence (sourcebook).
- **Defensive style — Runner's Dodge:** DEF 4. He avoids harm by moving — ducking, sprinting, and never standing where the blow is aimed. He is a poor target because he is rarely still.
- **Affinity — Verdant's trail-sense:** His Verdant affinity lets him sense where energy pools and where it runs thin in a place — a trail-runner's instinct for currents, turned toward the raw stuff of magic. The GM describes what pooled energy feels like; Jory decides what to do about it.
- **Physical trait — Charcoal-burner's hands and a runner's stride:** Hands marked by years of tending slow fires in the pine woods, and legs built by running messages between hamlets over ridge paths. He can keep a steady pace all day and still sprint at the end of it.

## Backstory

Jory grew up in the pine woods above the west road, where his father burned charcoal in slow earth mounds and his mother kept the tally of every load. As a boy he ran messages between the scattered woodland hamlets — a folded note, a warning about a washed-out path, a summons for the midwife — and he learned the ridge paths the way other children learned songs. His satchel came to him young, as vessels do for those raised in the practice: first a message bag, then, pocket by pocket, the thing that held his Forms. Verdant's unstable deck suits a runner exactly — he does not carry one answer, he carries the raw energy to meet whatever the road brings.

He has come to the crater rim because the roads there have gone strange. Messages arrive late or not at all, travelers report lights where no lantern should be, and the energy currents he feels under his feet run the wrong way near the rim. A runner notices when a road stops behaving, and he would rather find out why than keep running blind. He travels light, eats walking, and knows every shortcut the party will need — and one or two that will get them into trouble.

## Personality + roleplaying hooks

- **Restless on his feet, steady in a crisis.** He paces while thinking, volunteers for every scout run, and goes very still and very focused when something actually goes wrong.
- **Knows everyone, trusts slowly.** Years of carrying messages taught him who keeps their word in each hamlet — and who talks too much to be trusted with it.
- **Hook — the satchel:** he checks its flap the way other people check a door latch. He will show an energy card to a curious child, but he will not let anyone else carry the satchel.
- **Hook — shortcuts:** he always knows a faster way. It is sometimes a better way. The party should ask which before following him down it.

## Adventure role

One-shot PC — the party's energy-shepherd scout: he ranges ahead, reads pooled energy near the crater, and feeds the right energy to the right moment at range.

## Forms

See `Cards/Jory-Forms.md` — Verdant's unstable energy deck (1 slot) plus 3 regular Forms, 4 total, within his Card Pool of 4.

## Soulrocks / death (sourcebook reminders)

- Soulrocks are gained on critical successes or GM-ruled significant moments (1–3 per player per session).
- At 0 HP the player chooses: die, pay 1 Soulrock to postpone 1 turn, or take the Summoner's Bargain (lose a random card permanently and stabilize at 1 HP, OR take a lasting wound and stabilize at 1 HP).

## Statblock (Fantasy Statblocks)

Renders with the "Writ & Reckoning Layout" — build it once in Settings (see [[WR-Statblock-Setup]]; set it as the Default Layout, or add `layout: Writ & Reckoning Layout` to the codeblock below).

```statblock
name: "Jory Fenwick"
defense: 4
health: 9
health_dice: d6
card_pool: 4
command: 2
imagination: 3
might: 3
finesse: 4
craft: 2
essence: 3
vessel: "Messenger's satchel — a worn leather satchel with a reinforced flap and stitched shard pockets (Carried, +1 HP)"
affinity: "Verdant, the Energy Shepherd (Lesser Power)"
traits:
  - name: "Vessel — Unstable Form + satchel"
    desc: "His satchel holds Verdant's unstable form: a deck of basic Pokémon energy cards (see `Cards/Jory-Forms.md`). It takes 1 card slot and cannot be traded away without consequence (sourcebook)."
  - name: "Defensive style — Runner's Dodge"
    desc: "DEF 4. He avoids harm by moving — ducking, sprinting, and never standing where the blow is aimed. He is a poor target because he is rarely still."
  - name: "Affinity — Verdant's trail-sense"
    desc: "His Verdant affinity lets him sense where energy pools and where it runs thin in a place — a trail-runner's instinct for currents, turned toward the raw stuff of magic. The GM describes what pooled energy feels like; Jory decides what to do about it."
  - name: "Physical trait — Charcoal-burner's hands and a runner's stride"
    desc: "Hands marked by years of tending slow fires in the pine woods, and legs built by running messages between hamlets over ridge paths. He can keep a steady pace all day and still sprint at the end of it."
```
