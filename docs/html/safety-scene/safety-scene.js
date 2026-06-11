/**
 * Safety readback scene — hero path, charter fold, lightbox drafts.
 * Loaded after shell.js on docs/html/safety-scene/index.html
 */
(function () {
  const REALITY_STATE = {
    hereStage: "safety",
    copy: {
      reframe:
        "The threats of AI to organizational credibility exist whether you adopt AI or not, and are guaranteed if we do nothing. The first move is to name reality and a grounded, written response.",
      nextMove:
        "Now that AI is already within our organizations, the only choice is to respond wisely and clearly. Our free guide will walk you through it, or we can sprint together. Because this step is actually urgent.",
      plansPreview:
        "Two viable paths to the same ratified Handbook.",
      doorsHonest:
        "Same outcome either way. Free means you hold the pen with a thorough guide; paid means we run the full process with you in the dashboard.",
    },
    stages: [
      { id: "safety", num: "01", name: "Safety", gap: { line: "Leadership hasn't ratified Safety in writing yet.", sev: 3 } },
      { id: "sandbox", num: "02", name: "Sandbox", gap: { line: "No bounded experiment you could point to yet.", sev: 1 } },
      { id: "training", num: "03", name: "Training", gap: null },
      { id: "tech", num: "04", name: "Tech", gap: null },
    ],
    documents: [
      {
        id: "statement", layer: "01", title: "Statement", ratified: false,
        threat: "No agreed position. Every hard call becomes an argument with nothing to settle it.",
        rot: "-5deg",
        draft: `<section class="lbSection"><h3 class="lbH3">AI Use Statement</h3><p class="lbMeta">Draft · Layer 01 · Board ratification pending</p><p>We believe artificial intelligence is a tool that can extend our mission when it is governed by human judgment, theological integrity, and the trust people place in our organization. AI does not replace pastoral care, spiritual formation, or the embodied presence our work requires.</p><p>We adopt AI to steward time for deeper human work — not to produce more content for its own sake. Every external-facing use of AI must preserve authenticity: our voice remains ours, our accountability remains visible, and our people remain able to trust what they receive from us.</p></section><section class="lbSection"><h3 class="lbH3">What we affirm</h3><ul class="lbList"><li>Human authorship and review for all pastoral, donor-facing, and public communications.</li><li>Transparency when AI materially assisted a published work.</li><li>Protection of sensitive data — pastoral notes, donor records, member information — as non-negotiable.</li><li>Board-level ownership of AI posture, reviewed annually or when material tools change.</li></ul></section><section class="lbSection"><h3 class="lbH3">Lines we will not cross</h3><ul class="lbList"><li>Cloned voices or likenesses of leaders without explicit, documented consent.</li><li>Undisclosed machine authorship in sermons, letters, or counsel attributed to a named leader.</li><li>Uploading identifiable beneficiary or donor data to consumer AI tools without contractual safeguards.</li></ul></section><section class="lbSection lbSig"><p>Ratified by the Board of Directors: _________________ · Date: _________________</p></section>`,
      },
      {
        id: "policy", layer: "02", title: "Policy", ratified: false,
        threat: "No policy — chaos where people improvise, paralysis where teams won't move. Nobody knows what's in bounds.",
        rot: "-2deg",
        draft: `<section class="lbSection"><h3 class="lbH3">Acceptable Use Policy &amp; Named Refusals</h3><p class="lbMeta">Draft · Layer 02 · Executive review pending</p><p>This policy operationalizes our Statement. It names what staff may do with approved AI tools, what requires escalation, and what we refuse on principle — before a vendor or crisis forces the conversation.</p></section><section class="lbSection"><h3 class="lbH3">Permitted uses (with human review)</h3><ul class="lbList"><li>Internal brainstorming and outline generation for sermons, talks, and curriculum — final delivery remains human-authored.</li><li>Grammar and clarity editing on drafts already written by staff.</li><li>Research summarization from public sources, with citation verification by the author.</li><li>Administrative automation in tools on the approved vendor register (Layer 03).</li></ul></section><section class="lbSection"><h3 class="lbH3">Named refusals</h3><ul class="lbList"><li><strong>Refusal 1 — Cloned leadership voice:</strong> No synthetic audio or video of executives, pastors, or board members for fundraising, teaching, or pastoral communication.</li><li><strong>Refusal 2 — Shadow pastoral AI:</strong> No consumer chatbots trained on or fed confidential pastoral or counseling notes.</li><li><strong>Refusal 3 — Undisclosed authorship:</strong> No publishing AI-generated text under a leader's byline without disclosure.</li><li><strong>Refusal 4 — Unvetted donor data:</strong> No export of CRM or giving data to tools not on the approved register.</li></ul></section><section class="lbSection"><h3 class="lbH3">Escalation</h3><p>Any proposed exception to a Named Refusal requires written approval from Executive Leadership and notification to the board chair within five business days.</p></section>`,
      },
      {
        id: "context", layer: "03", title: "Context", ratified: true,
        threat: "You can't name every AI tool your staff already use, or what data each one touches. You're exposed and can't see where.",
        rot: "1deg",
        draft: `<section class="lbSection"><h3 class="lbH3">Environment Context Register</h3><p class="lbMeta">Ratified · Layer 03 · Last updated Q2 2026</p><p>An honest inventory of AI tools in use today, who uses them, and what categories of data each may touch. Updated quarterly by department heads.</p></section><section class="lbSection"><h3 class="lbH3">Approved tools</h3><table class="lbTable"><thead><tr><th>Tool</th><th>Owner</th><th>Data tier</th><th>Notes</th></tr></thead><tbody><tr><td>Microsoft Copilot (Enterprise)</td><td>Operations</td><td>Internal only</td><td>Contractual DPA on file</td></tr><tr><td>Descript (communications)</td><td>Comms</td><td>Public content</td><td>No raw pastoral uploads</td></tr><tr><td>Notion AI (staff wiki)</td><td>All staff</td><td>Internal only</td><td>Training required</td></tr></tbody></table></section><section class="lbSection"><h3 class="lbH3">Shadow tools discovered</h3><ul class="lbList"><li>ChatGPT consumer accounts — 14 staff reported use; migration to enterprise tier scheduled.</li><li>Canva Magic Write — design volunteers; restricted to marketing templates only.</li></ul></section><section class="lbSection"><h3 class="lbH3">Data classification</h3><p><strong>Tier A (never in AI):</strong> pastoral notes, counseling records, donor PII, HR files.</p><p><strong>Tier B (approved tools only):</strong> internal drafts, meeting notes, operational planning.</p><p><strong>Tier C (public):</strong> published articles, sermon manuscripts post-delivery, marketing copy.</p></section>`,
      },
      {
        id: "rules", layer: "04", title: "Rules", ratified: false,
        threat: "Staff guess. Donor, pastoral, and member data goes into tools no one vetted.",
        rot: "4deg",
        draft: `<section class="lbSection"><h3 class="lbH3">Operational Rules by Domain</h3><p class="lbMeta">Draft · Layer 04 · Staff handbook insert pending</p><p>Plain rules for daily decisions — what a staff member may do before they have to ask.</p></section><section class="lbSection"><h3 class="lbH3">Communications &amp; fundraising</h3><ul class="lbList"><li>AI may draft email variants; a named human approves every send.</li><li>Disclosure footer required when AI materially drafted donor-facing copy.</li><li>No personalization using donor giving history fed into consumer models.</li></ul></section><section class="lbSection"><h3 class="lbH3">Pastoral &amp; teaching</h3><ul class="lbList"><li>Sermon prep: AI for research summaries only; manuscript and delivery are the preacher's work.</li><li>Pastoral care: no AI transcription of counseling sessions without written consent.</li><li>Small group curriculum: AI outlines permitted; theological review required.</li></ul></section><section class="lbSection"><h3 class="lbH3">Volunteers &amp; contractors</h3><p>Volunteers follow the same Tier A–C data rules. Contractors must sign AI addendum before accessing internal systems.</p></section>`,
      },
      {
        id: "responsePlans", layer: "05", title: "Response Plans", ratified: true,
        threat: "Something goes wrong and there's no plan. The scramble is public, and trust pays for it.",
        rot: "7deg",
        draft: `<section class="lbSection"><h3 class="lbH3">AI Incident Response Plan</h3><p class="lbMeta">Ratified · Layer 05 · Reviewed annually</p><p>When something goes wrong — a deepfake, a data leak, undisclosed AI authorship, or a vendor breach — this plan protects trust in the first hour.</p></section><section class="lbSection"><h3 class="lbH3">Severity levels</h3><ul class="lbList"><li><strong>Level 1:</strong> Internal policy violation — department head + HR within 24 hours.</li><li><strong>Level 2:</strong> External exposure or donor inquiry — executive team within 4 hours.</li><li><strong>Level 3:</strong> Cloned voice fraud, data breach, or media inquiry — CEO, board chair, legal immediately.</li></ul></section><section class="lbSection"><h3 class="lbH3">First-hour roles</h3><ul class="lbList"><li><strong>Incident lead (COO):</strong> convene response team, document timeline.</li><li><strong>Communications:</strong> draft holding statement; no speculation on social channels.</li><li><strong>Board chair:</strong> notified for Level 2+ before any public statement.</li></ul></section><section class="lbSection"><h3 class="lbH3">Holding statement (template)</h3><blockquote class="lbQuote">We are aware of [brief description]. We take the trust of our community seriously. We are investigating and will share what we can confirm as soon as we are able. We will not speculate beyond verified facts.</blockquote></section><section class="lbSection"><h3 class="lbH3">Post-incident</h3><p>Within 10 business days: root-cause review, Handbook update if needed, staff briefing, board report.</p></section>`,
      },
    ],
    doors: [
      {
        id: "free",
        featured: true,
        badge: "Free",
        priceAmount: "$0",
        pricePeriod: "self-paced · 1–2 months",
        tagline: "A thorough, in-depth field guide — your team walks every layer.",
        body: "It Starts With Safety is not a checklist. It is a full methodology: how to draft, stress-test, and ratify all five Handbook layers with your board and staff.",
        features: [
          "Complete Field Guide — step-by-step through Statement, Policy, Context, Rules, and Response Plans",
          "Draft templates, ratification checklists, and escalation scripts you can hand to leadership",
          "Worked examples for churches, nonprofits, and institutions — not generic AI policy boilerplate",
          "Guidance when you are stuck; you hold the pen and set the pace",
        ],
        cta: "Get the free Field Guide",
        action: "handbook",
      },
      {
        id: "paid",
        paid: true,
        badge: "Managed",
        priceAmount: "$1,000",
        pricePeriod: "two weeks",
        tagline: "The full managed process — in a dashboard, with every resource beside you.",
        body: "We draft all five layers customized to your organization, run working sessions with your team, and deliver a board-ready ratification package — not async email ping-pong.",
        features: [
          "Private dashboard to review, comment on, and ratify each Handbook document",
          "Custom drafts across all five layers, fitted to your theology, governance, and data posture",
          "Live working sessions with Movemental through the sprint",
          "Full resource library: exemplars, incident templates, vendor registers, and staff briefings",
          "Board ratification package delivered at the end of two weeks",
        ],
        cta: "Have us do it · $1,000",
        action: "dashboard",
      },
    ],
  };

  const $ = (s) => document.querySelector(s);


  function focusHandbookEmail() {
    const dock = document.getElementById("agent-dock");
    const card = document.getElementById("agent-card");
    const block = document.getElementById("handbook-email-block");
    const input = document.getElementById("handbookEmail");
    if (dock && card) {
      dock.classList.add("is-expanded");
      card.classList.add("is-expanded");
      const backdrop = document.getElementById("dock-backdrop");
      if (backdrop) backdrop.hidden = false;
    }
    if (block) {
      block.classList.add("handbookEmailHighlight");
      window.setTimeout(() => block.classList.remove("handbookEmailHighlight"), 4200);
    }
    const voice = document.getElementById("voice-line");
    if (voice) voice.textContent = "Get your free AI Safety Handbook — leave your email right here.";
    if (input instanceof HTMLInputElement) {
      input.scrollIntoView({ behavior: "smooth", block: "nearest" });
      input.focus();
    }
  }

  function wireHandbookEmail() {
    const submit = document.getElementById("handbook-email-submit");
    const input = document.getElementById("handbookEmail");
    const row = document.querySelector(".handbookEmailRow");
    const done = document.getElementById("handbook-email-done");
    if (!submit || !input) return;
    submit.addEventListener("click", () => {
      const v = input.value.trim();
      if (!v || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return;
      if (row) row.hidden = true;
      if (done) done.hidden = false;
      const voice = document.getElementById("voice-line");
      if (voice) voice.textContent = "Sent — check your inbox for the Handbook.";
    });
  }

  function renderCopy() {
    $("#reframe-copy").textContent = REALITY_STATE.copy.reframe;
    $("#next-move").innerHTML = "<b>" + REALITY_STATE.copy.nextMove + "</b>";
    $("#plans-preview").textContent = REALITY_STATE.copy.plansPreview;
    $("#doors-honest").textContent = REALITY_STATE.copy.doorsHonest;
  }

  function checkSvg() {
    return '<svg class="wayCheckIcon" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="2.5 7.25 5.5 10.25 11.5 3.75"/></svg>';
  }

  function renderRail() {
    const rail = $("#readback-rail");
    rail.innerHTML = "";
    REALITY_STATE.stages.forEach((stage, idx) => {
      const here = stage.id === REALITY_STATE.hereStage;
      const clear = !stage.gap;
      const row = document.createElement("div");
      row.className = "rbStage" + (here ? " rbHere" : "") + (clear ? " rbClear" : "");
      row.style.setProperty("--i", String(idx));
      let head = '<span class="rbNum">' + stage.num + '</span><span class="rbName">' + stage.name + "</span>";
      if (here) head += '<span class="rbHereTag">you are here</span>';
      const line = stage.gap ? stage.gap.line : "Clear for now — keep the sequence honest.";
      row.innerHTML = (here ? '<span class="rbGhostNum" aria-hidden="true">' + stage.num + "</span>" : "") + '<span class="rbNode" aria-hidden="true"></span><div class="rbHead">' + head + '</div><span class="rbLine">' + line + "</span>";
      rail.appendChild(row);
    });
  }

  function renderDocuments() {
    const spread = $("#doc-spread");
    spread.innerHTML = "";
    REALITY_STATE.documents.forEach((doc, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "docCard docCard--fold";
      btn.dataset.docId = doc.id;
      btn.dataset.ratified = doc.ratified ? "true" : "false";
      btn.style.setProperty("--rot", doc.rot);
      btn.style.setProperty("--i", String(idx));
      btn.setAttribute("aria-label", doc.title + (doc.ratified ? ", ratified" : ", not yet ratified"));
      btn.innerHTML = '<div class="docInner"><span class="docLayer">Layer ' + doc.layer + '</span><h3 class="docTitle">' + doc.title + '</h3><div class="docLines"><span class="docLine"></span><span class="docLine short"></span><span class="docLine"></span><span class="docLine shorter"></span><span class="docLine short"></span></div><span class="docStatus docStatus--' + (doc.ratified ? "ratified" : "open") + '">' + (doc.ratified ? "Ratified" : "Not yet") + '</span></div><span class="sticky">' + doc.threat + "</span>";
      btn.addEventListener("click", () => openLightbox(doc));
      spread.appendChild(btn);
    });
  }

  function renderDoors() {
    const grid = $("#door-grid");
    grid.innerHTML = "";
    REALITY_STATE.doors.forEach((door) => {
      const features = (door.features || [])
        .map((item) => '<li class="wayFeature"><span class="wayCheck">' + checkSvg() + "</span>" + item + "</li>")
        .join("");
      const card = document.createElement("article");
      card.className = "way wayPlan" + (door.featured ? " wayLead" : "") + (door.paid ? " paid" : "");
      const cta = document.createElement("button");
      cta.type = "button";
      cta.className = "wayCtaBtn" + (door.paid ? " wayCtaBtn--paid" : "");
      cta.textContent = door.cta;
      cta.addEventListener("click", () => {
        if (door.action === "handbook") focusHandbookEmail();
        else if (door.action === "dashboard") window.location.href = "03-dashboard-conversion.html";
      });
      card.innerHTML =
        '<span class="wayBadge">' + door.badge + '</span>' +
        '<p class="wayPriceRow"><span class="wayPriceAmt">' + door.priceAmount + '</span><span class="wayPricePeriod">' + door.pricePeriod + "</span></p>" +
        '<p class="wayTagline">' + door.tagline + "</p>" +
        "<p class=\"wayBody\">" + door.body + "</p>" +
        '<p class="wayIncludes">What&rsquo;s included</p>' +
        '<ul class="wayFeatures">' + features + "</ul>";
      const bodySlot = card.querySelector(".wayBody");
      if (bodySlot && bodySlot.parentNode) bodySlot.parentNode.insertBefore(cta, bodySlot.nextSibling);
      grid.appendChild(card);
    });
  }

  const lightbox = $("#lightbox");

  function openLightbox(doc) {
    $("#lb-eyebrow").textContent = "AI Guidebook · Layer " + doc.layer;
    $("#lb-title").textContent = doc.title;
    $("#lb-body").innerHTML = doc.draft;
    lightbox.hidden = false;
    lightbox.classList.add("is-open");
    $("#lightbox-close").focus();
    document.body.classList.add("lightbox-open");
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");
  }

  $("#lightbox-close").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox(); });

  window.__safetySceneReplay = () => {
    const voice = $("#voice-line");
    if (voice) voice.textContent = "Safety is your step. Walk it free with the full guide, or have us run the sprint with you in the dashboard.";
  };

  renderCopy();
  renderRail();
  renderDocuments();
  renderDoors();
  wireHandbookEmail();
})();
