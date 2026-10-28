// Same-origin TMDB proxy.
//
// Why this exists: Indian ISPs (notably Jio) block api.themoviedb.org for their
// subscribers, so a browser in India cannot reach TMDB directly. This route runs
// on the Next.js server instead, which is not on an Indian ISP line, so every
// user gets data regardless of ISP.
//
// It also keeps the API token server-side. The token used to be exposed to the
// browser via NEXT_PUBLIC_ACCESS_TOKEN.
//
// Usage from the client:  /api/tmdb/movie/278?language=en-US
// Upstream:               https://api.tmdb.org/3/movie/278?language=en-US

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TMDB_BASE = process.env.TMDB_API_BASE || "https://api.tmdb.org/3";
const TOKEN = process.env.TMDB_ACCESS_TOKEN;

export async function GET(request, context) {
  // Next 13/14 exposes params as a plain object; Next 15 makes it a Promise.
  const params = await context?.params;
  const raw = params?.path;
  const segments = (Array.isArray(raw) ? raw : [raw]).filter(Boolean);

  if (segments.length === 0 || segments.some((s) => s === ".." || s.includes("\\"))) {
    return Response.json(
      { success: false, status_message: "Invalid TMDB path" },
      { status: 400 }
    );
  }

  if (!TOKEN) {
    // Fail loudly instead of returning an empty list that looks like "no results".
    return Response.json(
      {
        success: false,
        status_message:
          "TMDB_ACCESS_TOKEN is not set. Add it to .env.local and restart the dev server.",
      },
      { status: 500 }
    );
  }

  const search = new URL(request.url).search;
  const upstream = `${TMDB_BASE}/${segments.join("/")}${search}`;

  try {
    const res = await fetch(upstream, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: "application/json",
      },
      // Cache on Next's data cache; TMDB catalog data does not change by the second.
      next: { revalidate: 3600 },
    });

    const body = await res.text();

    return new Response(body, {
      status: res.status,
      headers: {
        "content-type": res.headers.get("content-type") || "application/json",
        "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    return Response.json(
      { success: false, status_message: `TMDB upstream unreachable: ${error.message}` },
      { status: 502 }
    );
  }
}
