# Proposal Maker Skill — What I Found and What I Changed

August 11, 2026

You asked for three things: an honest evaluation of the old proposal-builder skill, an analysis of how your recent proposals actually evolved from first draft to the version you sent, and an updated skill that blends best practices with your own style so it can take a call transcript and build a proposal that wins pilots. Here's all three.

## What I analyzed

- **Auto-Wares** — all six Drive versions, Aug 8 through the final `AutoWares_Minecart_90Day_Pilot` (Aug 11)
- **Advance Auto Parts** — both versions of "Reconnecting Store Ops to AAP Intelligence" (no HTML version exists in Drive; the two Docs are 5 minutes apart and the delta is pure formatting, which was itself instructive)
- **PowerStop and Worldpac** — full git history in privatepages, including the PowerStop trim and the Worldpac QA and objection-handling passes
- **Your manual edits** — the commit where you hand-corrected the Niterra one-pager, plus the WHI briefing's four-commit evolution
- The old skill package, plus lauren-voice, stop-slop, and tromml-asset-builder for the blend

## Evaluation of the old skill

The old skill was built for a world you've moved past. Three structural problems:

1. **Wrong output formats.** It only produced a Tromml-branded .docx. Your last four proposals shipped as Google Docs (AAP, Auto-Wares) and HTML pages on privatepages (PowerStop, Worldpac). The skill had no idea either format existed.
2. **Wrong spine.** Its section structure (Signal Audit / What This Looks Like in Practice / Signal-Collateral-AI examples) is the marketing-engagement offer. Your recent proposals are Minecart pilot proposals with a different shape: problem with named quotes, pilot details, success criteria table, ROI math, strikethrough pricing.
3. **Missing everything you learned the hard way.** Nothing about memo blocks, epistemic hedges, headcount-equivalent ROI, objection sizing, pilot-card grammar, or the never-invent-names rule you had to enforce by hand on Niterra.

What it got right and I kept: the transcript-mining orientation, ask-don't-invent for missing facts, lauren-voice + stop-slop integration, the fee-math checklist, and the .docx renderer (still useful for signature-stage files).

## What your revisions taught me

The patterns below come from watching what you cut, added, and fixed across every first-to-last comparison.

**Structure converged, everywhere, on the same spine.** Auto-Wares went from a two-document package (CEO brief + long proposal, ~2,500 words, essay headlines like "Why this is in front of you now") to one 1,500-word document with plain labels: Project Summary, Pilot Details, Success Criteria, ROI, Investment, Agreement. Success criteria went prose → loose bullets → broken formatting → a clean Measure/Target table, and the table won.

**Evidence is voice of customer, always named.** Your problem sections are carried by verbatim quotes with real names and dates ("I haven't seen a field report in two years." — Brian Rowland, CCO). The AAP final pass, the very last edit before sending, was italicizing every quote and setting it off with white space: visually separating "the customer said this" from "we claim this." And the Niterra commit shows the inverse rule: you had to fix fabricated attributions ("Angelica Polly" → "Angelo Capoli, Capoli Sales"), so invented names are now a hard ban in the skill.

**Credibility devices repeat on every deal:**
- Strikethrough anchor pricing with a stated reason ("the difference is integration work that is already built") — present in every single draft of every deal
- A hedge next to every projection ("These are assumptions, not promises", "we land around 80 percent... and tune from there")
- ROI as auditable arithmetic, and percentages translated to headcount ("the field coverage of about ten additional reps, without hiring any of them")
- The keep-it-either-way artifact ("yours whether or not you continue... we shake hands")
- Three concrete next steps anchored to a real date ("before Labor Day", "holding the week of September 14 open")

**Objection handling gets sized, not defaulted.** On PowerStop ($5K, warm buyer) you deleted the whole "Why not just Salesforce" section rather than trimming it. On WHI (cold, Agentforce-aware) you sharpened the header into the literal question "Why not just use Agentforce?". On Worldpac, tactical IT worries got a clause woven into an existing sentence ("no app store, no MDM project, no new hardware"), not a section. The skill now carries that sizing rule.

**Your messaging is already consistent; the skill now protects it.** "System of record vs. system of action" appears in PowerStop, Worldpac, Niterra, WHI, AAP, and Auto-Wares. The "every agentic system you eventually build needs this record, and it takes time to accumulate" throughline appears in every Auto-Wares draft. These are now canonical lines the skill treats as fixed, with the client-specific material varying around them.

**Two things went wrong in your finals that the skill now guards against:**
1. The Auto-Wares final's product section regressed into exactly the slop the earlier CEO-ready rewrite had fixed ("unified intelligence layer", "administrative friction is eliminated", "simultaneously optimizing efficiency and impact") while the rest of the doc stayed clean. So the review checklist now has a section-regression check aimed specifically at the product-description section, and a rule to merge from each section's best version when assembling from multiple drafts.
2. The Auto-Wares final also shipped without the guarantee and next-steps sections that every earlier draft had. Best practice and your own earlier drafts agree those belong, so the skill makes them required and checks for them at review time.

That's the "blend" you asked for in practice: where your final version and best practices disagreed, I sided with your own best drafts (guarantee, next steps, headcount framing) rather than blindly copying the last file.

## What the new skill does

**Workflow:** mine the transcript (Fathom/Granola supported) for quotes, vocabulary, past failed attempts, stakeholders, agreed numbers, and their calendar → confirm anything load-bearing that's missing → **ask you, every time, Google Doc or HTML page** (docx offered only when a signable file comes up) → size and structure the doc from the playbook → draft in your voice with the canonical messaging held constant → build in the chosen format → run the win-rate review before you ever see it.

**Files:**

| File | Status | What it holds |
|---|---|---|
| `SKILL.md` | rewritten | The workflow above, plus five hard rules (one document one register; never invent names/quotes/figures; guarantee + closing ask required; no internal content; match the call) |
| `references/playbook.md` | new | The 13-section spine, the canonical messaging lines, the deal-sizing table (PowerStop-size vs Worldpac-size vs WHI-size), and the anti-patterns your revisions removed |
| `references/voice-and-review.md` | rewritten | Voice-of-customer mining, quote-handling rules, the two registers (exec pre-read vs web page), and a 15-point win-rate review checklist |
| `references/google-doc.md` | new | Creates real Google Docs in Drive via HTML conversion, with your formatting conventions: FROM/TO/RE memo caps, bold "Executive summary." lead-in, italic set-off quotes, Measure/Target tables, strikethrough pricing |
| `references/html-page.md` | new | The privatepages design system (navy/copper/sand tokens, memo dl block, phase cards, stat tiles), start-from-the-closest-page workflow, and the stranded-visual sweep after cuts |
| `references/docx-format.md` | trimmed from old house-style.md | The .docx renderer mechanics only; structure now comes from the playbook |
| `scripts/`, `assets/`, `examples/` | unchanged | The docx build pipeline |

## How to install it

The synced copy of a skill can't be updated from inside a session, so I packaged the new version as `tromml-proposal-builder.skill` and sent it in the chat. Click **Save skill** on that file card and it replaces the current version in your profile (same name, so it slots in). The source files are also on the `claude/proposal-maker-analysis-9hsphw` branch of privatepages under `skill-source/` if you ever want to diff or edit them. One caution: don't merge that folder to the branch your Pages site serves from, since anything on the live branch is publicly reachable.

## Suggested next step

The right test is a real one: pick the next discovery call, invoke the skill on the transcript, and see how close the draft lands. If you want more rigor before trusting it, I can run a structured eval round (same transcript through old skill vs new skill, side by side in a review page) — just say the word.
