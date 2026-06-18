import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import { ReadbackPathSpine } from "../../src/components/agent-room/screen/readback-path-spine";
import { computeMapRead, MAP_Q } from "../../src/lib/agent-room/data/map-q";

describe("ReadbackPathSpine (AU-15)", () => {
  it("highlights Sandbox when hereStageIndex is 1", () => {
    const answers = MAP_Q.map((q) => q.opts[0]);
    const mapRead = computeMapRead(answers);
    const html = renderToStaticMarkup(
      <ReadbackPathSpine hereStageIndex={1} mapRead={mapRead} />,
    );

    expect(html).toContain('id="hereStage"');
    expect(html).toContain("Sandbox");
    expect(html).toContain("you are here");
    expect(html).toContain(">02<");
  });

  it("stream mode omits gap lines but keeps active stage marker", () => {
    const html = renderToStaticMarkup(<ReadbackPathSpine hereStageIndex={0} />);

    expect(html).toContain("Safety");
    expect(html).toContain('id="hereStage"');
    expect(html).toContain("your Safety footing is real");
  });
});
