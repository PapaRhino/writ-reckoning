# Vicente Corso

- **Name:** Vicente Corso
- **Affinity:** Reyer, King of the Heavens (creatures)
- **Vessel:** Gem-socketed staff — a tall walking staff with Forms set along its length (Held, +2 HP)
- **DEF:** 4
- **Max Health:** 10
- **Current Health:** 10
- **Health Dice:** d6
- **Card Pool:** 4
- **Background:** Working (+2 HP, 100 starting coin)
- **Starting coin:** 100
- **Role:** Rival — a competing summoner after the same goal

## Health math

6 base + 2 (Held vessel) + 2 (Working background) = 10 Max Health. Health Dice band 8–11 = d6 (Average).

## Stats

- **Command:** 4
- **Imagination:** 4
- **Might:** 2
- **Finesse:** 3
- **Craft:** 2
- **Essence:** 2

## Dice pools

Each stat's pool is a number of physical d6s equal to the stat value, and the dice pool max equals the stat value unless noted otherwise. Modifier die: d6 by default, d8 with Clarity, d4 with Strain (sourcebook). Dice pool d6s explode on 6s (6 = success + reroll, chaining).

- **Command:** pool 4d6, max 4
- **Imagination:** pool 4d6, max 4
- **Might:** pool 2d6, max 2
- **Finesse:** pool 3d6, max 3
- **Craft:** pool 2d6, max 2
- **Essence:** pool 2d6, max 2

HOUSE RULE: pool d6s succeed on 4+. Check total = successes + modifier die. Difficulties: Easy 3, Standard 5, Hard 7, Heroic 9.

## Abilities (4, as per character creation)

- **Vessel — Gem-socketed staff:** His Forms are set along a staff that doubles as walking aid and weapon — a relic-hunter's vessel, built for long trails and sudden trouble.
- **Defensive style — Dexterous Dodging (relic-hunter's footwork):** DEF 4. He avoids harm by moving — he has survived trapped ruins and angry rivals by being somewhere else when the blow lands.
- **Affinity — Reyer's Call (creature affinity):** His affinity is to Reyer. His summoned allies use his Command (4) as Defense, per the sourcebook, and he rolls Command for their attacks.
- **Physical trait — Quick hands, restless eyes:** He handles small precious things with practiced care, and his eyes never stop moving — exits, pouches, hands, doors. He notices what others carry before he notices their faces.

## Description

Vicente is a relic-hunter and freelance summoner — charming, well-traveled, and entirely mercenary about old things. He heard the same rumors the party heard about crater shards, and he got to the rim first by a day and a worse road. He is not evil; he is competition. He will trade information, race the party to a site, and cut a deal the moment a deal is worth more than a rivalry — and he will also pocket anything left unguarded, because that is what relic-hunters do.

## GM note — how to run him

- **Goals:** Reach the shard cache first and sell it to the highest bidder; avoid a real fight if a race or a deal will do; keep his reputation as a man who delivers.
- **Tactics:** He fights through summoned allies (see `Cards/Vicente-Forms.md`) while keeping his distance, and he retreats rather than dying for a cache — he can always sell the next one. He uses negotiation (Command) and misdirection before violence, and he surrenders or bargains if cornered.
- **What he knows:** The cache's approximate location (he found it first, roughly); that someone else — bigger, organized, and less scrupulous — is also collecting shards; and one practical fact the party lacks (GM's choice: a safe trail, a guardian's weakness, or the cache's trap). He shares information only in trade.
- **How he pressures without dominating:** He shows up ahead of the party, behind them, or bargaining at the worst moment. He should complicate scenes, not win them. If the party befriends him, he becomes a useful, untrustworthy contact for later sessions.

## Adventure role

Rival NPC for the intro one-shot — the competing summoner racing the party to the same goal; a complication, a bargaining partner, and a potential future contact, not the main antagonist.

## Continuation hook (intro one-shot — thread stays open)

Vicente does not leave the story when the first session's job resolves: the buyer he intended to sell to is still out there, and so is the question of who else is buying crater shards. He is built to recur.

## Statblock (Fantasy Statblocks)

Renders with the "Writ & Reckoning Layout" — build it once in Settings (see [[WR-Statblock-Setup]]; set it as the Default Layout, or add `layout: Writ & Reckoning Layout` to the codeblock below).

```statblock
name: "Vicente Corso"
defense: 4
health: 10
health_dice: d6
card_pool: 4
command: 4
imagination: 4
might: 2
finesse: 3
craft: 2
essence: 2
vessel: "Gem-socketed staff — a tall walking staff with Forms set along its length (Held, +2 HP)"
affinity: "Reyer, King of the Heavens (creatures)"
traits:
  - name: "Vessel — Gem-socketed staff"
    desc: "His Forms are set along a staff that doubles as walking aid and weapon — a relic-hunter's vessel, built for long trails and sudden trouble."
  - name: "Defensive style — Dexterous Dodging (relic-hunter's footwork)"
    desc: "DEF 4. He avoids harm by moving — he has survived trapped ruins and angry rivals by being somewhere else when the blow lands."
  - name: "Affinity — Reyer's Call (creature affinity)"
    desc: "His affinity is to Reyer. His summoned allies use his Command (4) as Defense, per the sourcebook, and he rolls Command for their attacks."
  - name: "Physical trait — Quick hands, restless eyes"
    desc: "He handles small precious things with practiced care, and his eyes never stop moving — exits, pouches, hands, doors. He notices what others carry before he notices their faces."
```
