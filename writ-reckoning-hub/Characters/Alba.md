# Alba Ferrer

- **Name:** Alba Ferrer
- **Affinity:** Reyer, King of the Heavens (creatures)
- **Vessel:** Gem-socketed armor — a reinforced breastplate and pauldrons with Forms set directly into the metal (Worn, +3 HP)
- **DEF:** 5
- **Max Health:** 12
- **Current Health:** 12
- **Health Dice:** d8
- **Card Pool:** 4
- **Background:** Hardened (+3 HP, 50 starting coin)
- **Starting coin:** 50

## Health math

6 base + 3 (Worn vessel) + 3 (Hardened background) = 12 Max Health. Health Dice band 12–15 = d8 (Resilient).

## Stats

- **Command:** 5
- **Imagination:** 2
- **Might:** 3
- **Finesse:** 2
- **Craft:** 2
- **Essence:** 3

## Dice pools

Each stat's pool is a number of physical d6s equal to the stat value, and the dice pool max equals the stat value unless noted otherwise. Modifier die: d6 by default, d8 with Clarity, d4 with Strain (sourcebook). Dice pool d6s explode on 6s (6 = success + reroll, chaining).

- **Command:** pool 5d6, max 5
- **Imagination:** pool 2d6, max 2
- **Might:** pool 3d6, max 3
- **Finesse:** pool 2d6, max 2
- **Craft:** pool 2d6, max 2
- **Essence:** pool 3d6, max 3

HOUSE RULE: pool d6s succeed on 4+. Check total = successes + modifier die. Difficulties: Easy 3, Standard 5, Hard 7, Heroic 9.

## Abilities (4, as per character creation)

- **Vessel — Gem-socketed armor:** Her Forms are set into her breastplate and pauldrons, so her creatures answer from armor she wears into the fight. This vessel type determines her first Form's creature affinity.
- **Defensive style — Armored Bulwark:** DEF 5. She blocks and absorbs harm behind her armor. As the sourcebook notes for armored styles, she is sturdy in a fight and poor at sneaking quietly.
- **Affinity — Reyer's Call (creature affinity):** Her affinity is to Reyer, who controls the distribution of creature shards. Her summoned allies fight under her Command — per the sourcebook, allies have no set Defense and use their controller's Command as Defense, and the summoner rolls Command for their attacks.
- **Physical trait — Parade-ground bearing:** Years of standing in formation left her with an upright, unmistakable posture and a voice trained to carry across a village green. People look to her first, whether she wants them to or not.

## Backstory

Alba served as captain of the militia in a farming village on Paldea's central plain, where she learned the two lessons that now define her: a leader stands where her people can see her, and a plan spoken clearly beats a clever plan nobody understood. She left the village militia after one too many orders that protected storehouses instead of people, and took her armor — and the vessel set into it — west, hiring on as escort and guide for travelers heading toward the Great Crater's rim. She has never regretted the trade: the pay is worse and the company is better.

She commands rather than brawls. In a fight she plants herself, calls her creatures forward, and directs them the way she once directed a watch detail — who holds, who flanks, who falls back. She trusts her armor, trusts her people, and expects the same trust back. The crater expedition is, to her, a protection job with stranger cargo than usual: get the party in, keep them alive, and get them out with whatever they came for.

## Personality + roleplaying hooks

- **Decisive, then loyal.** Once she calls a plan, she commits fully — and she expects the party to say so at once if they disagree, not after the fact.
- **Protective to a fault.** She will put herself between a threat and a wounded ally without thinking, and she will be annoyed if thanked for it.
- **Hook — old militia habits:** she still counts exits when entering a room, and still addresses strangers by their role before their name ("Guide. Merchant."). It is a habit, not a suspicion.
- **Hook — the armor:** the gem sockets are old and well kept; she polishes them herself each night. Offer to help and she will hand you the cloth — a small trust she does not extend lightly.

## Adventure role

One-shot PC — the party's Command-focused summoner leader: she directs allied creatures in combat, holds the front with her armor, and makes the call when the party hesitates.

## Continuation hook (intro one-shot — thread stays open)

The expedition's immediate job resolves in session one, but Alba's story does not seal shut: whoever is hoarding crater shards has allies beyond the rim, and a former militia captain who walked away from bad orders will not be able to walk away from that. The larger thread stays open for a second session.

## Forms

See `Cards/Alba-Forms.md` — 4 Forms, within her Card Pool of 4.

## Soulrocks / death (sourcebook reminders)

- Soulrocks are gained on critical successes or GM-ruled significant moments (1–3 per player per session).
- At 0 HP the player chooses: die, pay 1 Soulrock to postpone 1 turn, or take the Summoner's Bargain (lose a random card permanently and stabilize at 1 HP, OR take a lasting wound and stabilize at 1 HP).

## Statblock (Fantasy Statblocks)

Renders with the "Writ & Reckoning Layout" — build it once in Settings (see [[WR-Statblock-Setup]]; set it as the Default Layout, or add `layout: Writ & Reckoning Layout` to the codeblock below).

```statblock
name: "Alba Ferrer"
defense: 5
health: 12
health_dice: d8
card_pool: 4
command: 5
imagination: 2
might: 3
finesse: 2
craft: 2
essence: 3
vessel: "Gem-socketed armor — a reinforced breastplate and pauldrons with Forms set directly into the metal (Worn, +3 HP)"
affinity: "Reyer, King of the Heavens (creatures)"
traits:
  - name: "Vessel — Gem-socketed armor"
    desc: "Her Forms are set into her breastplate and pauldrons, so her creatures answer from armor she wears into the fight. This vessel type determines her first Form's creature affinity."
  - name: "Defensive style — Armored Bulwark"
    desc: "DEF 5. She blocks and absorbs harm behind her armor. As the sourcebook notes for armored styles, she is sturdy in a fight and poor at sneaking quietly."
  - name: "Affinity — Reyer's Call (creature affinity)"
    desc: "Her affinity is to Reyer, who controls the distribution of creature shards. Her summoned allies fight under her Command — per the sourcebook, allies have no set Defense and use their controller's Command as Defense, and the summoner rolls Command for their attacks."
  - name: "Physical trait — Parade-ground bearing"
    desc: "Years of standing in formation left her with an upright, unmistakable posture and a voice trained to carry across a village green. People look to her first, whether she wants them to or not."
```
