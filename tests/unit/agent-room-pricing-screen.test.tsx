import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import { PricingScreen } from "../../src/components/agent-room/screen/stub/pricing-screen";
import {
  PRICING_SAFETY_PAID,
  PRICING_STAGE_HEADERS,
} from "../../src/lib/agent-room/data/pricing";

describe("PricingScreen (AU-14)", () => {
  it("renders four stage groups with SSOT price lines", () => {
    const html = renderToStaticMarkup(<PricingScreen onHome={() => {}} />);

    for (const header of PRICING_STAGE_HEADERS) {
      expect(html).toContain(header.title);
      expect(html).toContain(header.priceLine);
    }

    expect(html).toContain(PRICING_SAFETY_PAID.price);
    expect(html).toContain(PRICING_SAFETY_PAID.ctaLabel);
    expect(html.match(/Pricing by stage/g)?.length).toBeGreaterThan(0);
  });
});
