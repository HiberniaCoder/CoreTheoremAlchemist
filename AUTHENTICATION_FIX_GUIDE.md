# Guide: Fixing Next.js + Supabase Authentication Issues

This document summarizes the definitive fix for a common authentication issue in Next.js App Router applications using Supabase for server-side rendering (SSR).

## The Problem: "State Mismatch" on Navigation

The core issue is a "state mismatch" where, after a client-side navigation (e.g., clicking a `<Link>`), the server-side render for the new page doesn't have the correct, up-to-date user session. The server mistakenly thinks the user is logged out, often resulting in the login page being rendered inside the authenticated app layout.

This happens because Next.js may serve a cached version of the page, which does not re-evaluate the user's session cookie.

## The 3-Part Solution

The successful solution involves three coordinated changes to enforce a consistent authentication check on every navigation. When adding new authenticated pages, ensure they follow this pattern.

### 1. Middleware for Session Refreshing Only

The middleware (`src/middleware.ts`) should **only** be used to refresh the Supabase session cookie on every request. It should **not** perform any redirects. This ensures the session is always fresh and valid for any server-side code that runs afterward.

### 2. Force Dynamic Rendering on Protected Pages

Add `export const dynamic = 'force-dynamic';` to the top of every page file that requires a user to be logged in (e.g., `src/app/projects/page.tsx`). This directive is crucial as it tells Next.js to **never** use a cached version of the page. Instead, it is always re-rendered on the server for every visit, forcing it to re-check the user's authentication status using the fresh session cookie.

### 3. Centralized Layout Logic

The main layout (`src/app/layout.tsx`) should be the single gatekeeper for the UI structure.
- It checks for a user session.
- If a user is logged in, it wraps the page in the `AuthenticatedLayout` (with the sidebar and header).
- If not, it renders the page in a simple, public layout.

This removes conflicting logic from other parts of the app and provides a single source of truth for the UI structure. By combining these three techniques, we create a robust system where the session is always fresh, protected pages are always re-validated, and the layout is always consistent with the user's actual authentication state.
