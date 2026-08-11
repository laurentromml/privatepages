# Building the HTML page format

Prospect-facing proposal pages live in the `laurentromml/privatepages` GitHub
repo and are served as standalone pages (PowerStop, Worldpac, WHI, PSKB,
Niterra). They share one design system — treat the existing pages as the
reference implementation and start from the closest one rather than
hand-rolling new CSS.

## Repo workflow

- Clone/open `laurentromml/privatepages`. Short single-proposal pages sit at
  the root (`powerstop.html`, `worldpac.html`); briefing-style pages get a
  directory (`whi-solutions/index.html`).
- **Start by copying the closest existing page**: `powerstop.html` for a
  short single-pilot memo, `worldpac.html` for a phased multi-stakeholder
  proposal, `whi-solutions/index.html` for a cold exec briefing. The
  stylesheet carries the full component library; each page uses a subset,
  and unused classes are fine to leave in place.
- Commit with a plain descriptive message; push to the branch Lauren
  specifies (or the default flow for the session). Confirm the final URL
  path with her before she sends it.

## Design tokens (do not drift)

- Navy `#06043a` (headings, footer, dark heroes) · navy-mid `#2a2769`
- Copper `#b46a43` (buttons, eyebrows, checkmarks, section rules)
- Sand `#d9b39f` / sand-tint `#f6ece6` (callout backgrounds, "our" column in
  compare tables)
- Ink `#1a1830` body text · slate `#565473` secondary · line `#e7ded8` borders
- Inter (Google Fonts, 400–700), line-height 1.6–1.65
- Single column, `max-width` 760–820px, centered wrap, 24–28px side padding

## Component library (pick per the playbook's sizing rules)

- **Header:** thin line, logo left, one outlined CTA button right.
- **Hero:** eyebrow ("Minecart for [Client]") + h1 + lede stating
  problem-and-fix in one breath.
- **Memo `<dl>` block:** From / To / Re grid naming every stakeholder, price
  and ask in Re. Every proposal page has one.
- **Pull-quote blockquote:** copper left border, tinted background, named +
  dated attribution. Lives in "The problem."
- **Today vs. With Minecart cycle comparison** (broken cycle vs. compounding
  cycle) or **was → now swap table** for behavior change.
- **Flow-line breadcrumbs:** `See the day's accounts › Read the briefing ›
  Talk for sixty seconds`.
- **Phase/pricing card(s):** duration + price in the `<h3>` itself
  ("30 days of live activity, $5,000"), tag "Recommended" when one option,
  then the three labeled lists (validating / get back / need from you).
- **Stat tiles / before→after stat cards** for measured results (appendix
  case studies, briefings).
- **Compare table** (incumbent "contains the record" vs. Minecart "turns it
  into action") — briefing pages.
- **Trust/logo strip + About Tromml** (the trommel naming story) — cold
  briefings only, near the bottom, never in the hero.
- **CTA:** persistent low-emphasis outline button in the header; solid
  copper button on a navy full-width band at the close for longer pages.
  One link, the standard HubSpot booking URL used across the corpus (copy
  it from the source page you started from).
- **Screenshots:** phone mockups or macOS/Windows window chrome frames;
  caption demo data as demo data.

## Page-specific checks (beyond the main review checklist)

- After any copy cut, sweep for stranded visuals: a floating badge, callout,
  or image whose anchoring text is gone (a real WHI bug that took its own
  design pass to fix).
- Cross-references survive restructuring: "the four measures below" broke
  when the measures moved to an appendix — search for "above/below" language
  after moving sections.
- Check the page at phone width; the wrap and tables must not overflow.
- Web register: contractions on, short fragments for emphasis, quotes dated.
