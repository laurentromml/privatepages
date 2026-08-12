---
name: tromml-proposal-builder
description: >-
  Turns a discovery/sales call transcript (Fathom, Granola, or pasted notes)
  into a client-ready Tromml/Minecart proposal, delivered as either a Google
  Doc shared in Drive or a published HTML page in the privatepages repo
  (always ask Lauren which, every time). Use whenever Lauren or anyone at
  Tromml wants to create, draft, or write up a proposal, pilot, POC,
  engagement proposal, SOW, scope document, or pricing-and-scope doc for a
  prospect or client, including adapting an earlier proposal or turning a
  call into a proposal. Trigger on phrases like "draft a proposal for this
  client", "turn this call into a proposal", "write up the pilot", "make a
  SOW", "put together scope and pricing", even if Tromml or Minecart isn't
  named. Do NOT use for the standalone illustrative case-study one-pager,
  generic non-Tromml business docs, or pure prose with no proposal structure.
---

# Tromml proposal builder

Turn a call transcript and Lauren's notes into a finished proposal that wins
pilots. The bar: these proposals close at a 75%+ pilot win rate, so every one
gets full rigor — voice-of-customer evidence, auditable ROI math, and a
disciplined review pass before it goes anywhere near the prospect.

This skill encodes what actually worked across Lauren's recent proposals
(Auto-Wares, Advance Auto Parts, PowerStop, Worldpac, WHI): the structure her
final drafts converged on, the messaging she repeats deal after deal, and the
mistakes her revision history shows she had to fix by hand. Follow it so she
doesn't have to fix them again.

Proposals are high-stakes, client-facing work. Draft on the strongest model
available; don't delegate the prose to a lightweight model tier.

## What's in this skill

- `references/transcript-sources.md` — where call transcripts live and how
  to find them when Fathom doesn't show up (it often doesn't): the Fathom
  Recordings folder in Drive, Meet auto-transcripts, txt exports. **Read
  whenever you need to locate a transcript.**
- `references/playbook.md` — the proposal spine, the canonical Minecart
  messaging lines, and the sizing rules (how big a proposal this deal
  deserves). **Read before planning any draft.**
- `references/voice-and-review.md` — how to mine the transcript for
  voice-of-customer material, the two registers, quote-handling rules, and
  the pre-delivery win-rate checklist. **Read before drafting and again
  before delivering.**
- `references/google-doc.md` — how to build and deliver the Google Doc
  format. Read only when that format is chosen.
- `references/html-page.md` — the privatepages design system and repo
  workflow for the web-page format. Read only when that format is chosen.
- `references/docx-format.md` — the legacy branded `.docx` renderer
  (`scripts/build_proposal.js` + `assets/content.schema.json` +
  `examples/*.json`). Use only when Lauren asks for a signable Word file.

## Workflow

### 1. Mine the inputs

Get the transcript. Fathom tools first when they're connected, but Fathom is
often unavailable — the transcripts also live in Google Drive, and
`references/transcript-sources.md` maps exactly where (the Fathom Recordings
folder's per-company docs, Meet auto-transcripts, txt exports). Look there
yourself before asking Lauren to paste anything, and verify you have the
right call (date, attendees, company) before mining it. Gather any notes or
earlier proposals too. Then mine them the way
`references/voice-and-review.md` describes: verbatim quotes with names and
dates, the client's own vocabulary for their rituals and problems, their past
failed attempts, scope narrowing, who's who (especially the approver), what
was actually agreed (fees, term, phases, dates), and any real calendar
deadline in their world.

If load-bearing facts are missing — fees, term, approver, scope boundary —
ask Lauren rather than inventing them. Never invent a name, quote, or number.

### 2. Ask the format — every time

Ask Lauren, every single time, with no default:

> **Google Doc in Drive, or HTML page on privatepages?**

Both are in active use and the choice depends on the deal that day, so never
assume from precedent. Use AskUserQuestion when available. Offer the branded
`.docx` (see `references/docx-format.md`) as a third option only when a
signable file is being discussed. While asking, also confirm anything Step 1
left open (price, term, pilot scope).

### 3. Plan the structure

Read `references/playbook.md`. Pick the spine sections this deal needs and
size the document to the deal: a $5K single-pilot memo is short and lean; a
multi-stakeholder phased deal earns the full treatment with appendix. The
sizing rules in the playbook are derived from what Lauren actually shipped —
follow them instead of filling a maximal template.

### 4. Draft

Write the prose with the **lauren-voice** skill, in the register the format
calls for (see `references/voice-and-review.md`), reusing the client's own
words as the evidence backbone. Keep the canonical messaging lines from the
playbook consistent — those lines (system of record vs. system of action, the
data-record-before-AI throughline, the three measures) are the brand; the
client-specific material around them is what changes. Then run a
**stop-slop** pass. The product-description section is where slop
historically sneaks back in — give it double attention.

### 5. Build the deliverable

Follow the format reference chosen in Step 2 (`google-doc.md`,
`html-page.md`, or `docx-format.md`). Get the format conventions right —
they're part of how the proposal reads as finished work, not decoration.

### 6. The win-rate review

Run the full checklist in `references/voice-and-review.md` before presenting
anything. This is the step that protects the win rate; never skip it, never
soften it. If a check fails, fix and re-check.

### 7. Deliver and flag

Present the deliverable and call out, explicitly, every place you assumed or
changed something relative to the call (a fee, a duration, a scope edge) so
Lauren can confirm before it goes out. If the format was a Google Doc, give
the link; if HTML, give the page path/URL and confirm the push.

## Hard rules (each one earned by a real revision)

- **One document, one register.** Never a "CEO brief + full proposal" pair;
  Auto-Wares started that way and Lauren collapsed it immediately.
- **Never invent names, quotes, or figures.** Lauren had to hand-fix
  fabricated attributions once ("Angelica Polly" → "Angelo Capoli, Capoli
  Sales"). Verified material or a clearly-marked placeholder — nothing in
  between. Illustrative examples get the explicit fictional label.
- **The guarantee and the closing ask are required sections.** Her strongest
  drafts always had both; the one final that shipped without them lost its
  risk-reversal and its CTA in a merge accident, not by decision.
- **No internal/meta content survives past the first draft**: no deal
  politics, no "[LAST NAME]" placeholders, no internal codenames in the
  banner, no call-specific lines in a doc that will be reused with people
  who weren't on that call.
- **Match what was agreed on the call.** If the draft differs from what was
  floated (price, term, scope), flag it — don't silently differ.
