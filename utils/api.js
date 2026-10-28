// ---------------------------------------------------------------------------
// Single API surface for TMDB.
//
// Two call paths:
//   Server (generateMetadata, SSR)  -> TMDB directly, with the bearer token.
//   Browser                         -> our own /api/tmdb proxy.
//
// The browser never contacts TMDB, so Indian ISP blocks cannot break the app,
// and the token is never shipped to the client.
//
// Deliberately uses fetch, not axios: this module is imported by client
// components, and bundling axios for the browser pulled its Node HTTP adapter
// (follow-redirects) into the client build, which produced a flood of
// "Module not found: Can't resolve 'debug'" warnings on every compile.
// ---------------------------------------------------------------------------

const isServer = typeof window === "undefined";

const TMDB_ORIGIN = process.env.TMDB_API_BASE || "https://api.tmdb.org/3";
const PROXY_PATH = "/api/tmdb";

const TOKEN = process.env.TMDB_ACCESS_TOKEN;
const AUTH_HEADERS = isServer && TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {};

/**
 * Fetch from TMDB. Resolves to parsed JSON, or `null` on failure.
 *
 * Returning `null` (rather than an error object, as the old axios version did)
 * keeps every caller's optional chaining valid, so a failure renders an empty /
 * skeleton state instead of a crash or a misleading "Results not found!".
 */
export const fetchDataFromApi = async (url, params) => {
  let target;

  try {
    target = new URL(
      `${isServer ? TMDB_ORIGIN : PROXY_PATH}${url}`,
      isServer ? "http://localhost" : window.location.origin
    );
  } catch (error) {
    console.error("[tmdb] bad url", url, error.message);
    return null;
  }

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === null || value === "") continue;
      target.searchParams.set(key, String(value));
    }
  }

  try {
    const res = await fetch(target.toString(), {
      headers: { Accept: "application/json", ...AUTH_HEADERS },
      // Server: reuse Next's data cache. Browser: always hit our proxy.
      ...(isServer ? { next: { revalidate: 3600 } } : { cache: "no-store" }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(`[tmdb] ${res.status} ${url}`, body.slice(0, 300));
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error(`[tmdb] network error ${url}`, error.message);
    return null;
  }
};

// ---------------------------------------------------------------------------
// Shared helpers so image sizes and field fallbacks stay consistent.
// ---------------------------------------------------------------------------

export const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

// Optional safety valve: set NEXT_PUBLIC_IMAGE_BASE=/api/img to serve artwork
// through our own /api/img route instead of TMDB's CDN. Unset by default,
// because image.tmdb.org is reachable from India in testing.
const IMAGE_BASE = process.env.NEXT_PUBLIC_IMAGE_BASE || TMDB_IMAGE_BASE;

/**
 * Build an image URL at a sane size.
 *   poster card   -> w342 / w500
 *   backdrop/hero -> w1280 / original
 *   profile       -> w185
 * Never use "original" for cards; it ships multi-megabyte JPEGs into a 320px box.
 */
export const imgUrl = (path, size = "w500") =>
  path ? `${IMAGE_BASE}/${size}${path}` : null;

/** Movies use `title`/`release_date`; TV uses `name`/`first_air_date`. */
export const titleOf = (item) => item?.title || item?.name || "";
export const dateOf = (item) => item?.release_date || item?.first_air_date || null;

/** TMDB can return null vote_average for unreleased titles. */
export const ratingOf = (item) => Number(item?.vote_average ?? 0).toFixed(1);
