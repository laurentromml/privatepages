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
