"use client";

import { useMemo, useSyncExternalStore } from "react";

/**
 * Hand-off from the contact form to /contact/thank-you.
 *
 * The form stores the sender's first name here before navigating, rather than
 * in the URL: a name in a query string would be recorded by analytics and kept
 * in the browser history. sessionStorage dies with the tab.
 */
export const ENQUIRY_KEY = "metis:enquiry";

type Enquiry = { firstName: string; delivered: boolean };

const subscribe = () => () => {};
const read = () => {
  try {
    return sessionStorage.getItem(ENQUIRY_KEY);
  } catch {
    return null; // storage blocked — fall back to the generic page
  }
};

/** `null` on the server, and when the page is opened directly. */
function useEnquiry(): Enquiry | null {
  const raw = useSyncExternalStore(subscribe, read, () => null);
  return useMemo(() => {
    try {
      return raw ? (JSON.parse(raw) as Enquiry) : null;
    } catch {
      return null;
    }
  }, [raw]);
}

export function ThanksTitle() {
  const enquiry = useEnquiry();
  return <>Thanks{enquiry?.firstName ? `, ${enquiry.firstName}` : ""}.</>;
}

/** Only ever seen by whoever is testing a deployment without email set up. */
export function DeliveryNote() {
  const enquiry = useEnquiry();
  if (!enquiry || enquiry.delivered) return null;
  return (
    <p className="t-small mt-8 max-w-2xl border-t border-white/10 pt-4 text-ember-400">
      Note for the developer: email delivery isn&apos;t configured yet, so this
      submission was logged to the server console rather than sent. Set
      <code className="mx-1 font-mono text-[13px]">RESEND_API_KEY</code>
      to enable it.
    </p>
  );
}
