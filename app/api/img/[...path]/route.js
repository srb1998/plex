// Optional image proxy.
//
// Posters currently load straight from image.tmdb.org, which was reachable from
// India during testing, so this route is OFF by default and costs nothing.
//
// If an ISP ever starts blocking image.tmdb.org, set in .env:
//     NEXT_PUBLIC_IMAGE_BASE=/api/img
// and rebuild. imgUrl() will then point every poster/backdrop at this route.
//
// Usage:  /api/img/w500/abc123.jpg
// Upstream: https://image.tmdb.org/t/p/w500/abc123.jpg

export const runtime = "nodejs";

const IMAGE_BASE = process.env.TMDB_IMAGE_ORIGIN || "https://image.tmdb.org/t/p";

// Only allow the TMDB size prefixes we actually use.
const ALLOWED_SIZES = new Set([
  "w45", "w92", "w154", "w185", "w300", "w342", "w500", "w780", "w1280", "h632", "original",
]);

export async function GET(request, context) {
  const params = await context?.params;
  const raw = params?.path;
  const segments = (Array.isArray(raw) ? raw : [raw]).filter(Boolean);

  if (segments.length < 2 || segments.some((s) => s === ".." || s.includes("\\"))) {
    return new Response("Invalid image path", { status: 400 });
  }

  const [size, ...rest] = segments;
  if (!ALLOWED_SIZES.has(size)) {
    return new Response("Unsupported image size", { status: 400 });
  }

  const upstream = `${IMAGE_BASE}/${size}/${rest.join("/")}`;

  try {
    const res = await fetch(upstream, { next: { revalidate: 86400 } });
    if (!res.ok) {
      return new Response("Upstream image unavailable", { status: res.status });
    }

    return new Response(await res.arrayBuffer(), {
      status: 200,
      headers: {
        "content-type": res.headers.get("content-type") || "image/jpeg",
        // Posters are immutable per path; cache hard.
        "cache-control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    return new Response(`Image proxy failed: ${error.message}`, { status: 502 });
  }
}
