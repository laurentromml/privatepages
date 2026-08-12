# Building the Google Doc format

Lauren's executive pre-reads (Advance Auto Parts, Auto-Wares) ship as Google
Docs she shares from Drive. Build them by uploading HTML that converts to a
native Doc, which preserves the formatting conventions that matter.

## Creating the Doc

Use the Google Drive `create_file` tool with `contentMimeType: "text/html"`
and the full document as `textContent`. Drive converts HTML to a native
Google Doc, preserving bold, italics, strikethrough, tables, and headings.
Leave conversion enabled (do not set `disableConversionToGoogleType`).

- **Title convention:** match her file names — `ClientName_Minecart_90Day_Pilot`
  or `Client — [Offer] Pilot Proposal`. No "draft"/"v2" suffixes on the one
  you deliver; lock the name early.
- The file lands in My Drive; give Lauren the link/ID. She controls sharing.
- For revisions, prefer updating/iterating in the same Doc (or clearly
  replacing it) over scattering near-duplicate files — her Drive already has
  six Auto-Wares variants; don't add to the pile without being asked.

## Tromml branding (required — a bare doc reads as unfinished)

The Doc must look like it came from Tromml, not from a text editor:

- **Logo at the top**, above the memo block:
  `<img src="https://cdn.prod.website-files.com/697676589a486c82d39f0601/697676589a486c82d39f0859_Tromml%20Blue.png" width="150">`
  (the live CDN logo; Drive fetches and embeds it during HTML conversion).
- **Navy headings**: inline-style the title and section headings with
  Tromml navy — `<h1 style="color:#06043a">`, `<h2 style="color:#06043a">`.
  Copper `#b46a43` may accent the tagline or labels, sparingly.
- **Footer line** at the bottom, slate and small:
  `<p style="color:#565473">Tromml, Inc. &bull; 201 E Main Street, Durham, NC 27701 &bull; tromml.com</p>`
- The API read-back is text-only, so it cannot confirm the logo or colors
  rendered. Tell Lauren to eyeball the Doc once before sending — say so
  explicitly when delivering.

## Formatting conventions (these read as "finished" to her)

- **Memo letterhead:** `FROM:` / `TO:` / `RE:` in caps, bold labels, at the
  top. Real names on every line; the ask and price in the RE line.
- *Italic one-line tagline* under the title.
- **Bold lead-in label** on the summary: "**Executive summary.**" then the
  paragraph runs on in regular weight.
- **Quotes:** italicized, preceded by a blank line so they sit apart from
  the analysis, attributed with name (+ company/title).
- **Success criteria:** a real two-column Measure/Target table.
- **Pricing:** strikethrough standard price next to actual price
  (`<s>$25,000</s> $15,000`), with the reason for the difference in the
  adjacent prose. Fee column right-aligned in tables.
- **Headers:** plain sentence-case labels ("Project Summary", "Pilot
  Details", "Investment") — no decorative styling; Docs heading levels only.
- End with the signature/agreement block and, when quotes or illustrative
  material appear, the provenance footnote (see playbook §13).

## Register

Executive pre-read register (see voice-and-review.md): formal-but-direct,
sparse contractions, colon apposition, every claim concrete. This is the
format where the memo reads like it was written for one named executive to
forward upward.
