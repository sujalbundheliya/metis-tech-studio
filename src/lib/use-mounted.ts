"use client";

import { useSyncExternalStore } from "react";

/* Never fires: "has this hydrated" changes exactly once, and that transition is
   the render itself rather than an external event worth subscribing to. */
const subscribe = () => () => {};
const onClient = () => true;
const onServer = () => false;

/**
 * `true` only once the component has hydrated on the client.
 *
 * Used to gate `createPortal`, which needs a real `document`. The obvious
 * version — `useState(false)` plus `useEffect(() => setMounted(true), [])` —
 * works but schedules a second render pass for every consumer, which is what
 * `react-hooks/set-state-in-effect` objects to.
 *
 * `useSyncExternalStore` expresses the same thing without the extra pass: the
 * server snapshot is `false`, the client snapshot is `true`, and React
 * reconciles the difference as part of hydration instead of after it.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(subscribe, onClient, onServer);
}
