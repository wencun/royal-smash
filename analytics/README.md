# Dawnwalker analytics integration

This integration is intentionally read-only. It syncs GSC and GA4 reports into a local private cache, then exposes that cache to Codex as three MCP tools: an overview, top search queries, and Adsterra revenue.

## One-time provider setup

1. In Google Cloud project `steady-service-508003-p3`, enable **Google Search Console API** and **Google Analytics Data API**.
2. Add `dawnwalker-reporting@steady-service-508003-p3.iam.gserviceaccount.com` to the `sc-domain:dawnwalker.cc` Search Console property with read access.
3. In GA4 Property `551486768`, add the same service account as a Viewer.
4. Copy `.env.analytics.example` to `.env.analytics.local`. The downloaded service-account JSON already has a safe default path under `secrets/`; both paths are ignored by Git.
5. Generate an Adsterra **Publisher** token in the dashboard and add it to `ADSTERRA_API_TOKEN`. The default Publisher statistics endpoint groups the report by placement; change it only if you need a custom API query.

Do not put the service-account JSON, Google OAuth tokens, or Adsterra token in Git or chat.

## Sync and query

Run `npm run analytics:sync` to fetch the last 28 completed days. Google Search Console data has a short reporting delay, so the sync intentionally stops three days before today.

Run `npm run analytics:mcp` to start the local MCP server. Add it to Codex from this repository:

```bash
codex mcp add dawnwalker-analytics -- node --env-file-if-exists=.env.analytics.local scripts/analytics-mcp.mjs
```

Restart or open a new Codex task after adding the server. Once it is available, ask questions such as:

- “Show the latest Dawnwalker analytics overview.”
- “Which Search Console queries drive the most clicks?”
- “Show the latest Adsterra Publisher report.”

The MCP server never calls external APIs itself. It only reads the most recent local sync result, so asking questions cannot modify GSC, GA4, or Adsterra.
