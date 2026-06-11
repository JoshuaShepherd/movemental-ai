import { describe, expect, it, vi } from "vitest";

import {
  HANDBOOK_EMAIL_CHIP_TARGET,
  handleSuggestChipTarget,
} from "../../src/lib/agent-room/suggest-chip-targets";

describe("handbook lead-magnet capture", () => {
  it("focusHandbook chip is handled locally without routing to a scene", () => {
    const run = vi.fn();
    const enterDiscuss = vi.fn();

    const handled = handleSuggestChipTarget(
      HANDBOOK_EMAIL_CHIP_TARGET,
      enterDiscuss,
      run,
    );

    expect(handled).toBe(true);
    expect(run).not.toHaveBeenCalled();
    expect(enterDiscuss).not.toHaveBeenCalled();
  });
});
