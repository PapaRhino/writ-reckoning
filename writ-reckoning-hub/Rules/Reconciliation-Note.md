# Reconciliation Note — Sourcebook V2.2: Google Doc vs. Attached .docx

**Compared:** the imported Google Doc "Writ & Reckoning Official Sourcebook V2.2 (October 2025)"
(document `1J_RsdPQ5kjgkX3aZvyjBTzZ3YhcXdd7_wjhiX6mqULU`) against the attached file
`Writ___Reckoning_Official_Sourcebook_V2.2__October_2025___2.docx`.

**Verdict: they are the same document.** Same prose throughout — every substantive sentence
in the Google-Doc import is present in the .docx, and vice versa. The apparent differences
in a raw line-diff are extraction artifacts (paragraph breaks joined or split differently),
not content changes. No prose contradiction was found. Neither version wins; the campaign is
built from the reconciled text below.

**The one real difference: the .docx contains five tables that the Google-Doc import
dropped** (the import rendered them as bare "TABLE" placeholders). Those tables have been
restored into `Chapter-1-Core-Mechanics.md` from the .docx, verbatim:

1. Common Uses for Different Stat Skill checks (action → stat mapping; duplicates and one
   blank entry kept as written).
2. Interpreting Card Effects (Draw a Card = gain 1 AP, buffs, poison, confusion, sleep/stun).
3. Soulrock spending costs (Max HP 2 SR/1 HP; Card Pool 5 SR/slot; dice pool max 4 SR/point;
   Feats + Abilities 9 SR; Adjective Upgrades 9 SR; card upgrades 3 SR × Max Card Tier).
4. Scaling upgrade costs (Def Style and Card Tier MAX: 5 / 9 / 12 / 15 SR across upgrades 1–4).
5. Summoner's Bargain penalty table (d12 consequences).

**Source quirks preserved, not silently fixed:**

- Penalty table row 9 says "-1 to Arcane," but Arcane is not one of the six WR stats
  (Command, Imagination, Might, Finesse, Craft, Essence). It likely means Imagination.
  Kept verbatim in the table with a labeled editor's note; the GM decides.
- Chapters 3 (Vessels and Forms) and 4 (GM's Guide to Storybuilding) are stubs in BOTH
  versions — headings only, no body text. Nothing was invented to fill them.
- The AP Cost Table referenced in the Spells section ("pay AP based on distance") does not
  exist in either version, and neither version specifies an AP pool size, per-action AP
  costs, or the d6 success threshold for dice pools. The one-shot supplies clearly-labeled
  house rules for those gaps where play requires numbers.

**Build decision:** campaign content uses the Google-Doc prose plus the five restored .docx
tables. Anything not in either version is either omitted or marked HOUSE RULE.
