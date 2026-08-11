/*
 * build_proposal.js — Tromml branded proposal builder.
 *
 * Usage:  node build_proposal.js <content.json> <output.docx> [logo.png]
 *
 * Reads a content JSON (see assets/content.schema.json) and emits a .docx
 * styled in Tromml's house brand: Inter, navy/peach/copper, logo header,
 * address footer, summary table, sectioned body, tiered investment tables,
 * and a signature block. The brand is locked in this script; vary the deal
 * by editing the JSON, not this file.
 */
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
  Header, Footer, AlignmentType, BorderStyle, WidthType, ShadingType,
  LevelFormat, PageNumber,
} = require("docx");

// ---- Brand constants (do not drift) ----
const NAVY = "06043A";   // titles, section headers
const INK = "1A1830";    // body text
const MUTE = "565473";   // subtitles, captions, italic notes
const COPPER = "B46A43"; // eyebrow, rules, inline labels
const PEACH = "F6ECE6";  // summary/total row + callout fill
const WHITE = "FFFFFF";
const FONT = "Inter";
const CONTENT_W = 9360;  // US Letter, 1" margins

// ---- args ----
const contentPath = process.argv[2];
const outPath = process.argv[3] || "proposal.docx";
const logoPath = process.argv[4] || path.join(__dirname, "..", "assets", "tromml_logo.png");
if (!contentPath) { console.error("Need a content JSON path."); process.exit(1); }
const C = JSON.parse(fs.readFileSync(contentPath, "utf8"));

// ---- small helpers ----
const f = (extra = {}) => ({ font: FONT, ...extra });
function para(opts) { return new Paragraph(opts); }
function run(text, extra = {}) { return new TextRun({ text, font: FONT, ...extra }); }

function eyebrow(text) {
  return para({ spacing: { after: 40 }, children: [run(text, { bold: true, color: COPPER, size: 18, characterSpacing: 30 })] });
}
function title(text) {
  return para({ spacing: { before: 40, after: 60 }, children: [run(text, { bold: true, color: NAVY, size: 44 })] });
}
function subtitle(text) {
  return para({ spacing: { after: 20 }, children: [run(text, { italics: true, color: MUTE, size: 24 })] });
}
function dateline(text) {
  return para({ spacing: { after: 200 }, children: [run(text, { color: COPPER, size: 18 })] });
}
function sectionHeader(text) {
  return para({
    spacing: { before: 260, after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: COPPER, space: 4 } },
    children: [run(text, { bold: true, color: NAVY, size: 26 })],
  });
}
function bodyPara(text) {
  return para({ spacing: { after: 120, line: 264 }, children: [run(text, { color: INK, size: 21 })] });
}
function notepara(text) {
  return para({ spacing: { after: 120, line: 264 }, children: [run(text, { italics: true, color: MUTE, size: 21 })] });
}
function introItalic(text) {
  return para({ spacing: { after: 120, line: 264 }, children: [run(text, { italics: true, color: MUTE, size: 21 })] });
}
function subHead(text) {
  return para({ spacing: { before: 120, after: 40 }, children: [run(text, { bold: true, color: NAVY, size: 22 })] });
}
function bullet(text) {
  return para({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 60, line: 252 }, children: [run(text, { color: INK, size: 21 })] });
}
function labeledLine(parts) {
  // parts: [["Signal: ", text], ...] -> copper bold label + ink text
  const children = [];
  parts.forEach(([label, text]) => {
    children.push(run(label, { bold: true, color: COPPER, size: 21 }));
    children.push(run(text + "  ", { color: INK, size: 21 }));
  });
  return para({ spacing: { after: 120, line: 264 }, children });
}

// ---- summary table (label | value), alternating peach rows ----
function summaryTable(rows) {
  const L = 2600, R = CONTENT_W - L;
  const border = { style: BorderStyle.SINGLE, size: 1, color: "E5DCD5" };
  const borders = { top: border, bottom: border, left: border, right: border };
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [L, R],
    rows: rows.map((r, i) => {
      const fill = i % 2 === 1 ? PEACH : WHITE;
      const cell = (text, w, opts = {}) => new TableCell({
        width: { size: w, type: WidthType.DXA }, borders,
        shading: { fill, type: ShadingType.CLEAR },
        margins: { top: 70, bottom: 70, left: 140, right: 140 },
        children: [para({ children: [run(text, { color: opts.bold ? NAVY : INK, bold: !!opts.bold, size: 20 })] })],
      });
      return new TableRow({ children: [cell(r[0], L, { bold: true }), cell(r[1], R, { bold: /^\$|total/i.test(r[1]) })] });
    }),
  });
}

// ---- table: navy header, body rows, optional peach total row ----
// rightAlignLast=true gives the investment look (fee column right-aligned);
// set it false for a left-aligned capabilities/feature table.
function investmentTable(t, opts = {}) {
  const rightAlignLast = opts.rightAlignLast !== false;
  const cols = t.columnWidths || (t.columns && t.columns.length === 2 ? [2600, 6760] : [2300, 5060, 2000]);
  const border = { style: BorderStyle.SINGLE, size: 1, color: "E5DCD5" };
  const borders = { top: border, bottom: border, left: border, right: border };
  const mkRow = (cells, { fill = WHITE, headerText = false, bold = false } = {}) =>
    new TableRow({
      children: cells.map((text, i) => new TableCell({
        width: { size: cols[i], type: WidthType.DXA }, borders,
        shading: { fill, type: ShadingType.CLEAR },
        margins: { top: 70, bottom: 70, left: 140, right: 140 },
        children: [para({
          alignment: (rightAlignLast && i === cells.length - 1) ? AlignmentType.RIGHT : AlignmentType.LEFT,
          children: [run(text, { color: headerText ? WHITE : (bold ? NAVY : INK), bold: headerText || bold, size: headerText ? 18 : 20 })],
        })],
      })),
    });
  const rows = [];
  if (t.title) rows.push(); // title rendered as a sub-head paragraph outside the table
  rows.push(mkRow(t.columns, { fill: NAVY, headerText: true }));
  (t.rows || []).forEach((r) => rows.push(mkRow(r)));
  if (t.totalRow) rows.push(mkRow(t.totalRow, { fill: PEACH, bold: true }));
  return new Table({ width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: cols, rows });
}

// ---- signature block (two columns via a borderless table) ----
function signatureBlock(s) {
  const half = CONTENT_W / 2;
  const noB = { style: BorderStyle.NONE, size: 0, color: WHITE };
  const borders = { top: noB, bottom: noB, left: noB, right: noB };
  const colCell = (lines) => new TableCell({
    width: { size: half, type: WidthType.DXA }, borders,
    margins: { top: 40, bottom: 40, left: 0, right: 240 },
    children: lines,
  });
  const sigLines = (name, sub) => [
    para({ spacing: { before: 260, after: 0 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: INK, space: 6 } }, children: [run(" ")] }),
    para({ spacing: { before: 60, after: 0 }, children: [run(name, { bold: true, color: NAVY, size: 21 })] }),
    para({ spacing: { after: 0 }, children: [run(sub, { color: MUTE, size: 19 })] }),
    para({ spacing: { before: 40 }, children: [run("Date: ____________________", { color: MUTE, size: 19 })] }),
  ];
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: [half, half],
    rows: [new TableRow({ children: [
      colCell(sigLines(s.provider_name || "Lauren McCullough", s.provider_title || "CEO, Tromml, Inc.")),
      colCell(sigLines(s.client_line || "", s.client_sub || "Name and title")),
    ] })],
  });
}

// ---- assemble body ----
const children = [];
const M = C.meta || {};
children.push(eyebrow(M.eyebrow || ""));
children.push(title(M.title || "Proposal"));
if (M.subtitle) children.push(subtitle(M.subtitle));
if (M.date_confidential) children.push(dateline(M.date_confidential));
if (Array.isArray(C.summary) && C.summary.length) children.push(summaryTable(C.summary));

for (const blk of (C.sections || [])) {
  const t = blk.type;
  if (t === "examples") {
    // Labels are configurable so this works for non-marketing deals too.
    // Default is the marketing pattern; override per block with `labels`,
    // or give each item its own `rows: [[label, text], ...]`.
    const mkLabel = (s) => (/[:]\s*$/.test(s) ? s : s.replace(/\s*$/, "") + ": ");
    const L = blk.labels || {};
    const lbl = { signal: L.signal || "Signal", collateral: L.collateral || "Collateral", ai: L.ai || "AI executes" };
    children.push(sectionHeader(blk.heading));
    if (blk.intro) children.push(bodyPara(blk.intro));
    (blk.items || []).forEach((it, idx) => {
      children.push(subHead(`${idx + 1}. ${it.title}`));
      let parts = [];
      if (Array.isArray(it.rows)) {
        parts = it.rows.map((r) => [mkLabel(r[0]), r[1]]);
      } else {
        if (it.signal) parts.push([mkLabel(lbl.signal), it.signal]);
        if (it.collateral) parts.push([mkLabel(lbl.collateral), it.collateral]);
        if (it.ai) parts.push([mkLabel(lbl.ai), it.ai]);
      }
      children.push(labeledLine(parts));
    });
    if (blk.closing) children.push(introItalic(blk.closing));
  } else if (t === "investment" || t === "table") {
    const rightAlignLast = t === "investment"; // fee tables right-align the last column; plain tables don't
    children.push(sectionHeader(blk.heading));
    if (blk.intro) children.push(bodyPara(blk.intro));
    (blk.body || []).forEach((p) => children.push(bodyPara(p)));
    (blk.tables || []).forEach((tb) => {
      if (tb.title) children.push(para({ spacing: { before: 120, after: 70 }, children: [run(tb.title, { bold: true, color: NAVY, size: 20 })] }));
      children.push(investmentTable(tb, { rightAlignLast }));
    });
    (blk.bullets || []).forEach((b) => children.push(bullet(b)));
    if (blk.note) children.push(notepara(blk.note));
  } else {
    // generic section: heading + optional italic intro + body paras + bullets + note
    children.push(sectionHeader(blk.heading));
    if (blk.intro) children.push(introItalic(blk.intro));
    (blk.body || []).forEach((p) => children.push(bodyPara(p)));
    (blk.bullets || []).forEach((b) => children.push(bullet(b)));
    if (blk.note) children.push(notepara(blk.note));
  }
}

// signature
if (C.signature) {
  children.push(sectionHeader(C.signature.heading || "Agreement"));
  if (C.signature.intro) children.push(bodyPara(C.signature.intro));
  children.push(signatureBlock(C.signature));
}
if (C.contact) children.push(para({ spacing: { before: 240 }, children: [run(C.contact, { italics: true, color: MUTE, size: 19 })] }));

// ---- header (logo) + footer (address) ----
let headerChildren = [para({ children: [run("")] })];
try {
  const logo = fs.readFileSync(logoPath);
  headerChildren = [para({ spacing: { after: 40 }, children: [new ImageRun({
    type: "png", data: logo, transformation: { width: 116, height: 73 },
    altText: { title: "Tromml", description: "Tromml logo", name: "Tromml" },
  })] })];
} catch (e) { /* no logo available; header stays blank */ }

const footerText = C.footer || "Tromml, Inc.  •  201 E Main Street, Durham, NC 27701  •  tromml.com";

const doc = new Document({
  numbering: { config: [
    { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 460, hanging: 260 } } } }] },
  ] },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1080, right: 1440, bottom: 1080, left: 1440 } } },
    headers: { default: new Header({ children: headerChildren }) },
    footers: { default: new Footer({ children: [para({ alignment: AlignmentType.CENTER, children: [run(footerText, { color: MUTE, size: 16 })] })] }) },
    children,
  }],
});

Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(outPath, buf); console.log("Wrote " + outPath); });
