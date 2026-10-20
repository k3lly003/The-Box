import { ConvexReactClient } from "convex/react";

/**
 * Convex client bootstrap.
 *
 * TanStack Start uses Vite under the hood, so we default to `VITE_CONVEX_URL`.
 * If you’re running server-only or other tooling, `CONVEX_URL` is also supported.
 */
export const convexUrl =
  (import.meta as any).env?.VITE_CONVEX_URL ??
  (import.meta as any).env?.CONVEX_URL ??
  "";

/**
 * Optional client.
 *
 * We don’t hard-crash the UI when Convex isn’t configured yet, because the
 * “developer-first” experience should still let you boot the UI immediately.
 */
export const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;


