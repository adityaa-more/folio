/**
 * Demo mode: set FOLIO_DEMO=true on a public deployment to keep /builder and
 * /showcase visible in production (they're dev-only by default). Saving from
 * the builder stays disabled — it writes files to the repo, which a deployed
 * site can't (and shouldn't) do.
 */
export const isDemoDeployment = process.env.FOLIO_DEMO === "true";

/** Dev tools (builder, showcase) render when developing locally or in demo mode. */
export const devToolsEnabled =
  process.env.NODE_ENV !== "production" || isDemoDeployment;
