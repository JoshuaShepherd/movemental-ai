import type { Metadata } from "next";
import { HomeV4Content } from "@/v2/components/home/home-v4-content";

export const metadata: Metadata = {
  title: "Movemental | Navigate AI with human trust",
  description:
    "Navigate AI without eroding the trust you spent decades building. Built with a network of twenty-five trusted movement leaders.",
  alternates: {
    canonical: "/",
  },
};

export default function V2HomePage() {
  return <HomeV4Content />;
}
