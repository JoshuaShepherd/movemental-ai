import { describe, expect, it } from "vitest";

import { onboardingShellEditorialLabel } from "@/lib/onboarding/shell-progress-labels";

describe("onboardingShellEditorialLabel", () => {
  it("returns org copy bands", () => {
    expect(onboardingShellEditorialLabel("org", 0)).toBe("Your path is being prepared");
    expect(onboardingShellEditorialLabel("org", 25)).toBe("Your path is being prepared");
    expect(onboardingShellEditorialLabel("org", 26)).toBe("You're partway through");
    expect(onboardingShellEditorialLabel("org", 74)).toBe("You're partway through");
    expect(onboardingShellEditorialLabel("org", 75)).toBe("You're nearly ready to begin");
    expect(onboardingShellEditorialLabel("org", 99)).toBe("You're nearly ready to begin");
  });

  it("returns leader copy bands", () => {
    expect(onboardingShellEditorialLabel("leader", 0)).toBe("Your reflection is being shaped");
    expect(onboardingShellEditorialLabel("leader", 25)).toBe("Your reflection is being shaped");
    expect(onboardingShellEditorialLabel("leader", 26)).toBe("You're partway through your onboarding");
    expect(onboardingShellEditorialLabel("leader", 74)).toBe("You're partway through your onboarding");
    expect(onboardingShellEditorialLabel("leader", 75)).toBe("You're nearly ready to publish.");
  });
});
