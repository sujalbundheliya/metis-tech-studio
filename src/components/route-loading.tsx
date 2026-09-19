import { LogoLoader } from "@/components/ui/logo-loader";

/**
 * The shared body of every route's `loading.tsx`.
 *
 * Each segment still needs its own `loading.tsx` file — that file is what
 * creates the Suspense boundary, and a boundary at `/services/[slug]` keeps the
 * surrounding chrome on screen where the root one would swap the whole page.
 * Only the markup was identical four times over, so only that lives here.
 */
export function RouteLoading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <LogoLoader />
    </div>
  );
}
