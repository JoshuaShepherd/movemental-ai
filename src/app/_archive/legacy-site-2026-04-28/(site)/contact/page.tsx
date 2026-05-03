import type { Metadata } from "next";

import { ContactPageContent } from "@/components/sections/contact/contact-page-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with Movemental — churches, nonprofits, institutions, and partners. Expectation-led, relationship-first contact.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
