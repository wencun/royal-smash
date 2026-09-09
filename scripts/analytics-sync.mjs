import { createSign } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { setGlobalProxyFromEnv } from "node:http";
import path from "node:path";

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const DEFAULT_CREDENTIALS_PATH = "secrets/steady-service-508003-p3-4a71fc17b73e.json";
const ADSTERRA_PUBLISHER_STATS_URL = "https://api3.adsterratools.com/publisher/stats.json";
const GOOGLE_SCOPES = [
  "https://www.googleapis.com/auth/webmasters.readonly",
  "https://www.googleapis.com/auth/analytics.readonly",
].join(" ");

// Node's global fetch does not otherwise reliably inherit proxy environment
// variables when launched through npm scripts.
if (process.env.HTTP_PROXY || process.env.HTTPS_PROXY || process.env.http_proxy || process.env.https_proxy) {
  setGlobalProxyFromEnv();
}

function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required. Add it to .env.analytics.local.`);
  return value;
}

function base64Url(value) {
  return Buffer.from(typeof value === "string" ? value : JSON.stringify(value))
    .toString("base64")
    .replaceAll("=", "")
    .replaceAll("+", "-")
    .replaceAll("/", "_");
}

function dateRange(days) {
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - 3);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - days + 1);
  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
  };
}

async function accessToken() {
  const credentialsPath = path.resolve(process.env.GOOGLE_APPLICATION_CREDENTIALS ?? DEFAULT_CREDENTIALS_PATH);
  const credentials = JSON.parse(await readFile(credentialsPath, "utf8"));
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url({ alg: "RS256", typ: "JWT" });
  const payload = base64Url({
    iss: credentials.client_email,
    scope: GOOGLE_SCOPES,
    aud: credentials.token_uri ?? GOOGLE_TOKEN_URL,
    iat: now,
    exp: now + 3600,
  });
  const unsigned = `${header}.${payload}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  signer.end();
  const assertion = `${unsigned}.${signer.sign(credentials.private_key).toString("base64url")}`;
  const response = await fetch(credentials.token_uri ?? GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  if (!response.ok) throw new Error(`Google token request failed: ${response.status} ${await response.text()}`);
  return (await response.json()).access_token;
}

async function googleRequest(url, token, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`Google API request failed: ${response.status} ${await response.text()}`);
  return response.json();
}

async function fetchGsc(token, range) {
  const site = required("GSC_SITE_URL");
  return googleRequest(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/searchAnalytics/query`,
    token,
    {
      ...range,
      type: "web",
      dimensions: ["query", "page"],
      rowLimit: 250,
    },
  );
}

async function fetchGa4(token, range) {
  const propertyId = required("GOOGLE_ANALYTICS_PROPERTY_ID");
  return googleRequest(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
    token,
    {
      dateRanges: [range],
      dimensions: [{ name: "date" }],
      metrics: [
        { name: "activeUsers" },
        { name: "sessions" },
        { name: "screenPageViews" },
        { name: "engagementRate" },
      ],
      orderBys: [{ dimension: { dimensionName: "date" }, desc: true }],
    },
  );
}

async function fetchGa4AdFunnel(token, range) {
  const propertyId = required("GOOGLE_ANALYTICS_PROPERTY_ID");
  return googleRequest(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
    token,
    {
      dateRanges: [range],
      dimensions: [{ name: "date" }, { name: "eventName" }],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: {
        filter: {
          fieldName: "eventName",
          inListFilter: {
            values: [
              "ad_consent_choice",
              "ad_slot_requested",
              "ad_slot_script_loaded",
              "ad_slot_rendered",
              "ad_slot_empty",
              "ad_slot_load_error",
            ],
          },
        },
      },
    },
  );
}

function configuredAdsterraUrl(range) {
  if (!process.env.ADSTERRA_API_TOKEN) return null;
  const raw = process.env.ADSTERRA_PUBLISHER_REPORT_URL ?? ADSTERRA_PUBLISHER_STATS_URL;
  const url = new URL(raw);
  if (!url.searchParams.has("start_date")) url.searchParams.set("start_date", range.startDate);
  if (!url.searchParams.has("finish_date")) url.searchParams.set("finish_date", range.endDate);
  if (!url.searchParams.has("group_by[]")) url.searchParams.append("group_by[]", "placement");
  return url;
}

async function fetchAdsterra(range) {
  const url = configuredAdsterraUrl(range);
  if (!url) {
    return {
      status: "not_configured",
      message: "Set ADSTERRA_API_TOKEN and ADSTERRA_PUBLISHER_REPORT_URL to enable Publisher reporting.",
    };
  }
  const header = process.env.ADSTERRA_API_TOKEN_HEADER ?? "X-API-Key";
  const prefix = process.env.ADSTERRA_API_TOKEN_PREFIX ?? "";
  const tokenValue = [prefix, process.env.ADSTERRA_API_TOKEN].filter(Boolean).join(" ");
  const response = await fetch(url, { headers: { [header]: tokenValue, accept: "application/json" } });
  if (!response.ok) throw new Error(`Adsterra API request failed: ${response.status} ${await response.text()}`);
  return { status: "ok", report: await response.json() };
}

async function settled(label, operation) {
  try {
    return { status: "ok", [label]: await operation() };
  } catch (error) {
    return { status: "error", message: error instanceof Error ? error.message : String(error) };
  }
}

const days = Number.parseInt(process.env.ANALYTICS_DAYS ?? "28", 10);
const range = dateRange(Number.isFinite(days) && days > 0 ? days : 28);
const cachePath = path.resolve(process.env.ANALYTICS_CACHE_PATH ?? "data/private/analytics-latest.json");

const google = await settled("token", accessToken);
const report = {
  generatedAt: new Date().toISOString(),
  range,
  gsc: google.status === "ok" ? await settled("report", () => fetchGsc(google.token, range)) : google,
  ga4: google.status === "ok" ? await settled("report", () => fetchGa4(google.token, range)) : google,
  ga4AdFunnel: google.status === "ok" ? await settled("report", () => fetchGa4AdFunnel(google.token, range)) : google,
  adsterra: await settled("report", () => fetchAdsterra(range)),
};

await mkdir(path.dirname(cachePath), { recursive: true });
await writeFile(cachePath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

const successfulSources = [report.gsc, report.ga4, report.adsterra]
  .filter((source) => source.status === "ok")
  .length;
console.error(`Analytics cache updated at ${cachePath} (${successfulSources} source${successfulSources === 1 ? "" : "s"} ready).`);
if (successfulSources === 0) process.exitCode = 1;
