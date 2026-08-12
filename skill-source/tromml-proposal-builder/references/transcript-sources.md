# Finding the call transcript

Fathom is the primary recorder, but the Fathom connector is sometimes
unavailable (disconnected, unauthorized, or the call simply isn't in it).
The transcripts also live in Google Drive, so never stall or ask Lauren to
paste a transcript before you've looked there. Route in this order:

## 1. Fathom tools (when connected)

If the Fathom MCP tools are available: resolve a pasted link/ID with
`get_recording_by_url` / `get_recording_by_call_id`, otherwise find the call
with `list_meetings` / `search_meetings`, then pull the full transcript with
`get_meeting_transcript`. If the tools are missing or erroring, don't wait
for auth — go straight to Drive.

## 2. Google Drive (the fallback that always works)

Four places transcripts land, in the order to try them:

**a. The "Fathom Recordings" folder** — one Google Doc per company, titled
with just the company name ("Auto Wares Group", "Parts for Trucks",
"Driven Brands"). Each doc holds that company's Fathom calls: a `# <date>`
heading per call, a "VIEW RECORDING" fathom.video link, then timestamped
speaker turns. Search inside it with
`parentId = '1tfyxZtb0q2SSv9xo8hUa8XlCiAzHG5y9' and title contains '<company>'`
(if that folder ID ever goes stale, find it again with
`title contains 'Fathom Recordings' and mimeType = 'application/vnd.google-apps.folder'`).
Match the specific call by its date heading — these docs hold multiple calls.

**b. Google Meet auto-transcripts** — Docs titled
`<Meeting name> - YYYY/MM/DD HH:MM TZ - Transcript`. Lauren's live in her
"Meet Recordings" folder; teammates' calls (e.g. Corrina's) arrive as
docs shared with her, so don't filter by owner. Search:
`title contains 'Transcript' and title contains '<company or attendee>'`,
optionally bounded with `modifiedTime` around the call date.

**c. Fathom text exports** — plain-text files named
`fathom_meeting__transcript__<fathom-call-id>.txt`, dropped into project
folders. Search `title contains 'fathom_meeting__transcript'` (add the call
ID if Lauren gave one).

**d. Ad-hoc raw transcripts** — Docs named
`YYYY-MM-DD - <meeting name> - Raw Transcript` inside client/project
folders. Search `title contains 'Raw Transcript'` plus a company keyword.

If titles come up empty, fall back to a full-text search:
`fullText contains '<company>' and fullText contains 'VIEW RECORDING'`
catches Fathom-format docs whose titles don't mention the company.

## 3. Verify before mining

Whatever the source, confirm it's the right call before mining it: date,
attendees, and company must match what Lauren described. Company docs and
Meet folders hold many calls, and quoting the wrong meeting into a proposal
is worse than asking. If two candidates plausibly match, show Lauren both
titles/dates and ask. If nothing matches anywhere, say exactly where you
looked and ask her to point at the file — don't draft from memory or
summaries.

One more source worth checking when Drive misses: Granola tools, if
connected — some meetings are captured there instead.
