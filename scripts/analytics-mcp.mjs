import { readFile } from "node:fs/promises";
import path from "node:path";

const cachePath = path.resolve(process.env.ANALYTICS_CACHE_PATH ?? "data/private/analytics-latest.json");

function send(message) {
  const body = JSON.stringify(message);
  process.stdout.write(`Content-Length: ${Buffer.byteLength(body)}\r\nContent-Type: application/json\r\n\r\n${body}`);
}

async function report() {
  try {
    return JSON.parse(await readFile(cachePath, "utf8"));
  } catch {
    throw new Error("No analytics cache exists yet. Run npm run analytics:sync first.");
  }
}

function text(value) {
  return { content: [{ type: "text", text: JSON.stringify(value, null, 2) }] };
}

function queryRows(cache, { limit = 20, contains = "" } = {}) {
  const rows = cache.gsc?.report?.rows ?? [];
  const needle = contains.toLowerCase();
  return rows
    .filter((row) => row.keys?.[0]?.toLowerCase().includes(needle))
    .slice(0, Math.min(Math.max(Number(limit) || 20, 1), 100));
}

const tools = [
  {
    name: "analytics_overview",
    description: "Read the most recently synced GSC, GA4, and Adsterra reporting snapshot.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "analytics_search_queries",
    description: "Return top Search Console query/page rows from the latest reporting snapshot.",
    inputSchema: {
      type: "object",
      properties: {
        contains: { type: "string", description: "Optional case-insensitive text to match in a search query." },
        limit: { type: "integer", minimum: 1, maximum: 100, default: 20 },
      },
    },
  },
  {
    name: "analytics_ad_revenue",
    description: "Return the raw Publisher report from the most recent Adsterra sync.",
    inputSchema: { type: "object", properties: {} },
  },
];

async function handle(request) {
  if (request.method === "initialize") {
    return {
      protocolVersion: request.params?.protocolVersion ?? "2024-11-05",
      capabilities: { tools: {} },
      serverInfo: { name: "dawnwalker-analytics", version: "1.0.0" },
    };
  }
  if (request.method === "tools/list") return { tools };
  if (request.method === "tools/call") {
    const cache = await report();
    if (request.params?.name === "analytics_overview") return text(cache);
    if (request.params?.name === "analytics_search_queries") return text(queryRows(cache, request.params.arguments));
    if (request.params?.name === "analytics_ad_revenue") return text(cache.adsterra);
    throw new Error(`Unknown analytics tool: ${request.params?.name}`);
  }
  if (request.method === "notifications/initialized") return null;
  throw new Error(`Unsupported MCP method: ${request.method}`);
}

let buffer = Buffer.alloc(0);
process.stdin.on("data", (chunk) => {
  buffer = Buffer.concat([buffer, chunk]);
  while (true) {
    const separator = buffer.indexOf("\r\n\r\n");
    if (separator < 0) return;
    const header = buffer.subarray(0, separator).toString("utf8");
    const match = /content-length:\s*(\d+)/i.exec(header);
    if (!match) {
      console.error("Ignoring MCP message without Content-Length.");
      buffer = buffer.subarray(separator + 4);
      continue;
    }
    const length = Number(match[1]);
    const bodyStart = separator + 4;
    if (buffer.length < bodyStart + length) return;
    const body = buffer.subarray(bodyStart, bodyStart + length).toString("utf8");
    buffer = buffer.subarray(bodyStart + length);
    void (async () => {
      let request;
      try {
        request = JSON.parse(body);
        const result = await handle(request);
        if (request.id !== undefined && result !== null) send({ jsonrpc: "2.0", id: request.id, result });
      } catch (error) {
        if (request?.id !== undefined) {
          send({
            jsonrpc: "2.0",
            id: request.id,
            error: { code: -32000, message: error instanceof Error ? error.message : String(error) },
          });
        } else {
          console.error(error);
        }
      }
    })();
  }
});
