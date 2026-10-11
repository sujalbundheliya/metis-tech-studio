import { SimplePage } from "@/components/simple-page";
import { Btn, Label } from "@/components/ui/kit";
import { DeliveryNote, ThanksTitle } from "@/components/enquiry-receipt";
import { contact } from "@/content/contact";
import { placeholders } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

/**
 * Where the contact form lands after a successful send. A page of its own,
 * not an inline panel, so analytics can count enquiries as visits to this
 * URL. Kept out of search and the sitemap: on its own it means nothing.
 */
export const metadata = pageMetadata({
  title: "Message sent",
  description: "We've got your message and will reply within one business day.",
  path: "/contact/thank-you",
  noindex: true,
});

export default function ThankYouPage() {
  return (
    <SimplePage label="Message sent" title={<ThanksTitle />}>
      <p className="t-lead max-w-2xl text-venice-200/80">
        {contact.form.success}{" "}
        <a
          href={`mailto:${placeholders.email}`}
          className="text-aurora-400 underline underline-offset-4"
        >
          {placeholders.email}
        </a>
        .
      </p>
      <DeliveryNote />

      <div className="mt-14 max-w-2xl">
        <Label className="text-venice-300/75">What happens on the call</Label>
        <ol className="mt-6">
          {contact.callSteps.map((step, i) => (
            <li key={step.title} className="border-t border-white/10 py-5 last:border-b">
              <div className="flex gap-4">
                <span className="t-label shrink-0 pt-1 text-ember-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-[16px] font-medium text-white">{step.title}</p>
                  <p className="t-small mt-1.5 text-venice-200/65">{step.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-12 flex flex-col gap-3 sm:flex-row">
        <Btn href="/" size="lg">Back to the homepage</Btn>
        <Btn href="/services" variant="outline" size="lg">Browse our services</Btn>
      </div>
    </SimplePage>
  );
}
