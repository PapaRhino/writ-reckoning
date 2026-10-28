# Corvin Ash — Villain NPC

- **Name:** Corvin Ash
- **Role:** Villain — disgraced scholar-summoner draining the crater's shard through a cracked lodestone
- **Home:** The Hollow Heart grotto, beneath the Great Crater's rim, west Paldea
- **Affinity:** Ginanig (spell shards), corrupted by his own experiment — he no longer serves any Power cleanly
- **Vessel:** A cracked lodestone set in an iron circlet (Worn, +3 HP)
- **DEF:** 4
- **Max Health:** 13
- **Current Health:** 13
- **Health Dice:** d8
- **AP:** 6 per turn (HOUSE RULE)

## Stats and dice pools

HOUSE RULE: pool d6s succeed on 4+. Check total = successes + modifier die. Difficulties: Easy 3, Standard 5, Hard 7, Heroic 9.

- **Command:** 5 — pool 5d6, max 5. His corrupted allies fight under his Command as their Defense (sourcebook: allies use their controller's Command as Defense).
- **Imagination:** 4 — pool 4d6, max 4
- **Might:** 2 — pool 2d6, max 2
- **Finesse:** 2 — pool 2d6, max 2
- **Craft:** 4 — pool 4d6, max 4. The lodestone rig, the siphon lines, the grotto wards — all his making.
- **Essence:** 3 — pool 3d6, max 3

## Abilities (4)

- **Vessel — Cracked lodestone circlet:** The lodestone drinks the crater's shard-light and feeds it back to him as power. While the siphon runs, his spell Forms hit harder — see the climax fight's HOUSE RULE siphon bonus in the adventure file.
- **Defensive style — Warded circle:** DEF 4. Rings of chalk, iron, and old spell-work turn blows aside around his circle. He is weakest when drawn out of it.
- **Affinity — Ginanig's stolen palette:** He still works spell shards, but the colors are wrong now — light that bends the wrong way, spells that leave frost or ash behind.
- **Physical trait — Lodestone pallor:** Pale, grey-veined hands, eyes that reflect light like wet stone. He looks ill, and he is — the siphon is eating him as surely as it eats the crater.

## Description

Corvin was once a scholar of shards, respected, careful, and patient — until a failed experiment cost him his standing and, as he tells it, his name. He came to the crater convinced that one true shard, properly harnessed, would restore everything he lost. Instead the lodestone cracked, the shard began to drain, and Corvin began to lie to himself about the difference between harnessing and stealing. He is polite, learned, and entirely sincere when he says the party should leave: he believes he is saving the crater by owning it.

## What he wants

To finish the siphon and carry the crater shard out whole, believing it will restore his standing and his health. He will bargain, threaten, and fight in that order — and he genuinely believes the party will thank him later.

## How to use him

- **Before the climax:** he is a rumor, a mark on a contract, a cold draft in the grotto antechamber. Do not let the party meet him early; his politeness is more useful as a surprise.
- **At the climax:** he opens with a bargain (leave, and he will pay the party in shards), then fights when refused. He surrenders if reduced to 3 HP or fewer and the siphon is broken — a surrender the party must decide what to do with.
- **If he escapes:** he becomes a continuation hook, carrying a fragment of the shard and a grudge (see the adventure's hooks).

## Forms

See `Cards/Corvin-Forms.md`.

## Secrets (GM only)

The lodestone did not crack by accident. Corvin cracked it himself, deliberately, when the shard refused his first careful harness — and he has told himself so many versions of the story since that he half believes the accident now. If the party confronts him with the grotto's own record (the warden's marker and the scorched first circle, both in the antechamber), he falters for one full turn — the GM may grant the party that turn's opening without a fight. It is the adventure's one scripted moment of mercy, and it only works once.

## Statblock (Fantasy Statblocks)

Renders with the "Writ & Reckoning Layout" — build it once in Settings (see [[WR-Statblock-Setup]]; set it as the Default Layout, or add `layout: Writ & Reckoning Layout` to the codeblock below).

```statblock
name: "Corvin Ash"
defense: 4
health: 13
health_dice: d8
command: 5
imagination: 4
might: 2
finesse: 2
craft: 4
essence: 3
vessel: "A cracked lodestone set in an iron circlet (Worn, +3 HP)"
affinity: "Ginanig (spell shards), corrupted by his own experiment — he no longer serves any Power cleanly"
traits:
  - name: "Vessel — Cracked lodestone circlet"
    desc: "The lodestone drinks the crater's shard-light and feeds it back to him as power. While the siphon runs, his spell Forms hit harder — see the climax fight's HOUSE RULE siphon bonus in the adventure file."
  - name: "Defensive style — Warded circle"
    desc: "DEF 4. Rings of chalk, iron, and old spell-work turn blows aside around his circle. He is weakest when drawn out of it."
  - name: "Affinity — Ginanig's stolen palette"
    desc: "He still works spell shards, but the colors are wrong now — light that bends the wrong way, spells that leave frost or ash behind."
  - name: "Physical trait — Lodestone pallor"
    desc: "Pale, grey-veined hands, eyes that reflect light like wet stone. He looks ill, and he is — the siphon is eating him as surely as it eats the crater."
```
