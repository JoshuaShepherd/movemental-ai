import { describe, expect, it } from "vitest";

import { AGREEMENT_TYPE_ENGAGEMENT_MSA, AGREEMENT_TYPE_IMPLEMENTATION_MOU } from "@/lib/legal/agreement-catalog";
import { parseDocuSignConnectJson } from "@/lib/webhooks/docusign-connect-parse";

describe("parseDocuSignConnectJson", () => {
  it("reads envelope id, slug, and custom fields from Connect-style JSON", () => {
    const body = {
      event: "envelope-completed",
      data: {
        envelopeId: "env-123",
        envelopeSummary: {
          status: "completed",
          envelopeId: "env-123",
          customFields: {
            textCustomFields: [
              { name: "organization_slug", value: "acme-corp" },
              { name: "agreement_type", value: "implementation_mou" },
              { name: "agreement_version", value: "2026-02-01" },
            ],
          },
        },
      },
    };

    const parsed = parseDocuSignConnectJson(body);
    expect(parsed).not.toBeNull();
    expect(parsed?.envelopeId).toBe("env-123");
    expect(parsed?.organizationSlug).toBe("acme-corp");
    expect(parsed?.agreementType).toBe(AGREEMENT_TYPE_IMPLEMENTATION_MOU);
    expect(parsed?.agreementVersion).toBe("2026-02-01");
    expect(parsed?.status).toBe("completed");
  });

  it("defaults agreement type to engagement MSA when absent", () => {
    const body = {
      data: {
        envelopeId: "e2",
        envelopeSummary: {
          status: "completed",
          customFields: {
            textCustomFields: [{ name: "organization_slug", value: "solo-org" }],
          },
        },
      },
    };
    const parsed = parseDocuSignConnectJson(body);
    expect(parsed?.agreementType).toBe(AGREEMENT_TYPE_ENGAGEMENT_MSA);
  });

  it("returns null without organization slug", () => {
    const body = {
      data: {
        envelopeId: "e3",
        envelopeSummary: {
          status: "completed",
          customFields: { textCustomFields: [] },
        },
      },
    };
    expect(parseDocuSignConnectJson(body)).toBeNull();
  });
});
