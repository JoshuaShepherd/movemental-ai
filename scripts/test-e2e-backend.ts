import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { NextRequest } from "next/server";
import { POST as saveResolutionHandler } from "../src/app/api/resolve/save/route";
import { GET as peopleSummaryHandler } from "../src/app/api/resolve/people/route";
import { POST as inviteHandler } from "../src/app/api/resolve/invite/route";
import { POST as startAssessmentHandler } from "../src/app/api/assessment/start/route";
import { POST as predictHandler } from "../src/app/api/assessment/predict/route";
import { POST as answerHandler } from "../src/app/api/assessment/answer/route";
import { GET as resultsHandler } from "../src/app/api/assessment/results/route";
import { db } from "../src/lib/db";
import {
  resolutions,
  resolutionVersions,
  resolutionInvitations,
  realityAssessmentSessions,
  realityAssessmentPredictions,
  realityAssessmentResponses,
} from "../src/lib/db/schema";
import { eq, like } from "drizzle-orm";

const TEST_PREFIX = `e2e_test_${Date.now()}`;

function createRequest(url: string, method: string, body?: any): NextRequest {
  const init: RequestInit = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (body) init.body = JSON.stringify(body);
  return new NextRequest(new URL(url, "http://localhost:3000"), init);
}

async function runE2ETests() {
  console.log("=== STARTING FULL E2E BACKEND & DATABASE INTEGRATION TEST ===");
  console.log(`Test session identifier: ${TEST_PREFIX}\n`);

  let testOrgName = `${TEST_PREFIX} Org`;
  let testLeaderEmail = `${TEST_PREFIX}@leader.test`;
  let createdSessionId: string | null = null;
  let createdResolutionId: string | null = null;

  try {
    // ----------------------------------------------------
    // TEST 1: Resolution Save & Versioning
    // ----------------------------------------------------
    console.log("▶ [1/6] Testing Resolution Save via /api/resolve/save...");
    const saveReq1 = createRequest("http://localhost:3000/api/resolve/save", "POST", {
      email: testLeaderEmail,
      orgType: "Nonprofit",
      orgLabel: testOrgName,
      visibility: "link",
      displayName: "Jane Leader",
      roleText: "Director",
      selections: {
        ticks: { "0-0": true, "1-1": true },
        stars: { "0": 0, "1": 1 },
      },
      hardestTheme: 1,
      acts: [0, 2],
      twoMinutes: "We must proceed with caution and compassion.",
      lines: ["Presence: Keep it human", "Agency: Discern carefully"],
    });

    const saveRes1 = await saveResolutionHandler(saveReq1);
    const saveJson1 = await saveRes1.json();

    if (!saveRes1.ok || !saveJson1.ok) {
      throw new Error(`Save resolution failed: ${JSON.stringify(saveJson1)}`);
    }

    const { resolutionId, shareToken } = saveJson1.data;
    createdResolutionId = resolutionId;
    console.log(`  ✓ Resolution saved successfully! ID: ${resolutionId}, Token: ${shareToken}`);

    // Update the same resolution (creates version 2)
    console.log("▶ [2/6] Testing Resolution Update & Version Snapshot...");
    const saveReq2 = createRequest("http://localhost:3000/api/resolve/save", "POST", {
      email: testLeaderEmail,
      orgType: "Nonprofit",
      orgLabel: testOrgName,
      visibility: "public",
      displayName: "Jane Leader Updated",
      roleText: "Executive Director",
      selections: {
        ticks: { "0-0": true, "1-1": true, "2-0": true },
        stars: { "0": 0, "1": 1, "2": 0 },
      },
      hardestTheme: 2,
      acts: [0, 2, 4],
      twoMinutes: "Updated reflection statement.",
      lines: ["Presence: Keep it human", "Agency: Discern carefully", "Community: Walk together"],
    });

    const saveRes2 = await saveResolutionHandler(saveReq2);
    const saveJson2 = await saveRes2.json();

    if (!saveRes2.ok || !saveJson2.ok) {
      throw new Error(`Update resolution failed: ${JSON.stringify(saveJson2)}`);
    }

    console.log(`  ✓ Version 2 saved! Token preserved: ${saveJson2.data.shareToken === shareToken}`);

    // ----------------------------------------------------
    // TEST 2: People Summary & 5-Contributor Threshold Rule
    // ----------------------------------------------------
    console.log("▶ [3/6] Testing People Summary Privacy Threshold (/api/resolve/people)...");
    const peopleReq = createRequest(
      `http://localhost:3000/api/resolve/people?org=${encodeURIComponent(testOrgName)}`,
      "GET"
    );
    const peopleRes = await peopleSummaryHandler(peopleReq);
    const peopleJson = await peopleRes.json();

    if (!peopleRes.ok || !peopleJson.ok) {
      throw new Error(`People summary failed: ${JSON.stringify(peopleJson)}`);
    }

    console.log(
      `  ✓ Contributor count: ${peopleJson.data.contributorCount}, Unlocked: ${peopleJson.data.unlocked}`
    );
    if (peopleJson.data.unlocked !== false) {
      throw new Error("Threshold violation: 1 contributor must NOT unlock group view!");
    }
    console.log("  ✓ Correctly sealed: requires 5 contributors before unsealing.");

    // ----------------------------------------------------
    // TEST 3: Colleague Invitation
    // ----------------------------------------------------
    console.log("▶ [4/6] Testing Invitation Minting (/api/resolve/invite)...");
    const inviteReq = createRequest("http://localhost:3000/api/resolve/invite", "POST", {
      inviterEmail: testLeaderEmail,
      inviteeEmail: `${TEST_PREFIX}@colleague.test`,
      organizationLabel: testOrgName,
      note: "Join our resolution process.",
    });

    const inviteRes = await inviteHandler(inviteReq);
    const inviteJson = await inviteRes.json();

    if (!inviteRes.ok || !inviteJson.ok) {
      throw new Error(`Invite failed: ${JSON.stringify(inviteJson)}`);
    }

    console.log(`  ✓ Invitation created: ${inviteJson.data.inviteUrl}`);

    // ----------------------------------------------------
    // TEST 4: Reality Assessment Lifecycle & 5-Answer Threshold
    // ----------------------------------------------------
    console.log("\n▶ [5/6] Testing Reality Assessment Start & Sealing (/api/assessment/*)...");
    const startReq = createRequest("http://localhost:3000/api/assessment/start", "POST", {
      organizationName: testOrgName,
      organizationType: "Nonprofit",
      leaderEmail: testLeaderEmail,
    });

    const startRes = await startAssessmentHandler(startReq);
    const startJson = await startRes.json();

    if (!startRes.ok || !startJson.ok) {
      throw new Error(`Start assessment failed: ${JSON.stringify(startJson)}`);
    }

    const { sessionId, leaderToken, contributorToken } = startJson.data;
    createdSessionId = sessionId;
    console.log(`  ✓ Session started: ${sessionId}`);
    console.log(`    Leader Token: ${leaderToken}`);
    console.log(`    Contributor Token: ${contributorToken}`);

    // Seal leader predictions
    const predictReq = createRequest("http://localhost:3000/api/assessment/predict", "POST", {
      leaderToken,
      predictions: {
        "0": 3,
        "1": 2,
        "2": 3,
        "3": 1,
        "4": 2,
        "5": 3,
        "6": 1,
        "7": 2,
      },
    });

    const predictRes = await predictHandler(predictReq);
    const predictJson = await predictRes.json();

    if (!predictRes.ok || !predictJson.ok) {
      throw new Error(`Predict failed: ${JSON.stringify(predictJson)}`);
    }
    console.log("  ✓ Leader predictions sealed.");

    // Check results before 5 contributors answer
    const check1Req = createRequest(
      `http://localhost:3000/api/assessment/results?token=${leaderToken}`,
      "GET"
    );
    const check1Res = await resultsHandler(check1Req);
    const check1Json = await check1Res.json();

    if (check1Json.data.unlocked !== false || check1Json.data.contributorCount !== 0) {
      throw new Error("Threshold violation: 0 contributors must be sealed!");
    }
    console.log("  ✓ Results status before answers: Sealed (0 of 5 answered).");

    // Submit 4 contributor answers
    console.log("▶ [6/6] Submitting contributor responses and verifying 5-response unseal...");
    for (let i = 1; i <= 4; i++) {
      const ansReq = createRequest("http://localhost:3000/api/assessment/answer", "POST", {
        contributorToken,
        answers: {
          "0": 1,
          "1": 1,
          "2": 2,
          "3": 0,
          "4": 1,
          "5": 1,
          "6": 0,
          "7": 1,
        },
        respondentRole: "staff",
      });
      const ansRes = await answerHandler(ansReq);
      if (!ansRes.ok) throw new Error(`Contributor answer ${i} failed`);
    }

    // Check with 4 answers -> MUST STILL BE SEALED
    const check4Req = createRequest(
      `http://localhost:3000/api/assessment/results?token=${leaderToken}`,
      "GET"
    );
    const check4Res = await resultsHandler(check4Req);
    const check4Json = await check4Res.json();
    console.log(
      `  ✓ After 4 answers: Unlocked = ${check4Json.data.unlocked} (Count: ${check4Json.data.contributorCount}/5)`
    );
    if (check4Json.data.unlocked !== false) {
      throw new Error("Threshold violation: 4 contributors must STILL be sealed!");
    }

    // Submit 5th contributor answer -> MUST UNLOCK!
    const ans5Req = createRequest("http://localhost:3000/api/assessment/answer", "POST", {
      contributorToken,
      answers: {
        "0": 2,
        "1": 1,
        "2": 2,
        "3": 1,
        "4": 1,
        "5": 2,
        "6": 0,
        "7": 2,
      },
      respondentRole: "volunteer",
    });
    const ans5Res = await answerHandler(ans5Req);
    if (!ans5Res.ok) throw new Error("5th contributor answer failed");

    // Check with 5 answers -> MUST BE UNLOCKED WITH REAL GAPS!
    const check5Req = createRequest(
      `http://localhost:3000/api/assessment/results?token=${leaderToken}`,
      "GET"
    );
    const check5Res = await resultsHandler(check5Req);
    const check5Json = await check5Res.json();

    if (!check5Res.ok || !check5Json.ok) {
      throw new Error(`Results query failed: ${JSON.stringify(check5Json)}`);
    }

    const resultsData = check5Json.data;
    console.log(
      `  ✓ After 5th answer: Unlocked = ${resultsData.unlocked} (Count: ${resultsData.contributorCount}/5)`
    );
    if (resultsData.unlocked !== true) {
      throw new Error("Threshold error: 5 contributors MUST unlock results!");
    }

    console.log("  ✓ Live computed gaps between leader predictions and anonymous answers:");
    for (let q = 0; q < 8; q++) {
      console.log(
        `    Q${q + 1}: Leader = ${resultsData.leaderPredictions[q]}, Contributor Avg = ${resultsData.contributorAverages[q]}, Reality Gap = ${resultsData.gaps[q]}`
      );
    }

    console.log("\n✅ ALL E2E ENDPOINTS AND LIVE DATABASE ROUND-TRIPS PASSED PERFECTLY!");
  } finally {
    // ----------------------------------------------------
    // CLEANUP TEST DATA FROM LIVE DATABASE
    // ----------------------------------------------------
    console.log("\n🧹 Cleaning up test data from live database...");
    if (createdResolutionId) {
      await db
        .delete(resolutionVersions)
        .where(eq(resolutionVersions.resolution_id, createdResolutionId));
      await db.delete(resolutions).where(eq(resolutions.id, createdResolutionId));
    }
    await db
      .delete(resolutionInvitations)
      .where(like(resolutionInvitations.inviter_email, `${TEST_PREFIX}%`));

    if (createdSessionId) {
      await db
        .delete(realityAssessmentResponses)
        .where(eq(realityAssessmentResponses.session_id, createdSessionId));
      await db
        .delete(realityAssessmentPredictions)
        .where(eq(realityAssessmentPredictions.session_id, createdSessionId));
      await db
        .delete(realityAssessmentSessions)
        .where(eq(realityAssessmentSessions.id, createdSessionId));
    }
    console.log("✓ Cleanup completed cleanly.");
  }
}

runE2ETests()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error("\n❌ E2E TEST FAILED:", err);
    process.exit(1);
  });

