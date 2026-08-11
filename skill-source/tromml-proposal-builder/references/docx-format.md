# Building the branded .docx (signable file)

Use this format only when Lauren asks for a Word file — usually when a deal
is at the signature stage. Content and structure come from
`references/playbook.md` like every other format; this file covers only the
mechanics of the renderer.

## How it works

`scripts/build_proposal.js` renders a branded `.docx` from a content JSON.
The Tromml brand is locked in the script — Inter throughout; navy `#06043A`
titles/headers with a thin copper underline rule; ink `#1A1830` body; muted
`#565473` subtitles; copper `#B46A43` eyebrow and labels; peach `#F6ECE6`
alt rows, total rows, callouts; logo in the page header; address footer; US
Letter. **Vary the deal by editing the JSON, not the script.**

- `assets/content.schema.json` — the exact JSON shape, with notes per field.
- `examples/snap-on-content.json` — a two-phase engagement (audit +
  enablement).
- `examples/eastern-pilot-content.json` — a single-phase fixed-fee pilot
  with a capabilities-map `table` block. Read the example closest to your
  deal alongside the schema, then adapt.

## Build and validate

```bash
npm install docx   # if not already available in the working dir
node scripts/build_proposal.js <content.json> <ClientName_Proposal.docx> assets/tromml_logo.png
```

Render to PDF and actually look at the pages before delivering:

```bash
python <docx-skill>/scripts/office/soffice.py --headless --convert-to pdf out.docx --outdir .
pdftoppm -jpeg -r 90 out.pdf page   # then view the page images
```

## Renderer-specific rules

- Fees stated in words *and* tables, and they must agree and sum to the
  total. Fee column is the last column, right-aligned. Never label a flat
  fee "Monthly".
- The `examples` block defaults to marketing labels
  (Signal / Collateral / AI executes); override `labels` or use custom
  `rows` for non-marketing deals — don't force marketing labels onto a
  sales-ops deal.
- No internal codename in the eyebrow; optional add-ons clearly optional.
- Summary table labels: Client, Primary Contacts, Scope, Engagement, Term,
  Investment.
- Signature defaults: Lauren McCullough, CEO, Tromml, Inc.; contact line
  `Questions? Contact lauren@tromml.com`; footer with the Durham address.
