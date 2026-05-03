---
title: "Sandbox Discovery: Where Learning Actually Happens"
slug: sandbox-discovery
shape: methodology
author: Josh Shepherd
audience: [any]
topics: [sandbox]
---
# Sandbox Discovery: Where Learning Actually Happens

## The evolution from Discovery Lab

The first version of this stage — the Discovery Lab — framed itself as a nonprofit's AI entry point. Four weeks, four outputs: prioritized use cases, experiment briefs, measurement and risk notes, an internal playbook draft. The argument then was that learning-first beats tool-first and strategy-first, which remains correct.

What the original framing got wrong is its position in the sequence. The Lab cannot be the entry point, because organizations that begin with experimentation before establishing a governance baseline end up learning the wrong lessons — or worse, learning the right lessons from incidents they caused.

In the Safety → Sandbox → Skills → Solutions sequence, Sandbox Discovery is the second stage, not the first. Its discipline is the same. Its dependencies have changed. Its exit criterion is sharper. What follows is the evolved version.

## What the sandbox actually is

A controlled environment for exploration without premature risk. Not chaotic experimentation. Not *everyone go try ChatGPT.* Not a directive to "be curious about AI." Designed discovery within boundaries that have already been defined by the Safety stage.

The distinction matters because the word *sandbox* tends to do two opposing kinds of work in the same sentence. Vendors use it to mean permissionless play. Compliance teams use it to mean an isolated test environment. The version that matters for organizational learning is closer to the second: a space where the consequences of getting something wrong are bounded, so that the cost of learning is paid in attention rather than in damage.

A real sandbox has four properties. It runs on tooling that Safety has already configured — not a personal account, not a side-by-side trial, not a shadow instance. It operates on synthetic or public-domain inputs, not real sensitive data. It produces outputs that are reviewed before they touch anything external. And it captures its learning in shared artifacts rather than individual inboxes.

If any of those four is missing, the organization has experimentation. It does not have a sandbox.

## The fragmented state this replaces

Before the stage, the organization's experimentation is happening and scattered.

Individual staff are running prompts that work for them. Those prompts never leave their accounts. A program manager has tested a tool and formed an opinion that never gets captured. Two departments hold contradictory views about AI in donor-facing work, and neither view is grounded in shared evidence. Measurement is absent. Risk is framed differently by every staff member, which means the organization cannot prioritize its actual risks.

Underneath all of it, vendor conversations keep happening. Each demo is compelling in isolation. None of the demos gives the organization any frame for deciding whether the tool fits its work. Tool-shopping becomes the default, because no other frame has been offered.

Sandbox Discovery ends this pattern, not by banning individual experimentation, but by giving the organization a place where experimentation produces compounding learning instead of dispersed anecdote.

## The four outputs, re-rooted in Safety

The outputs of the stage remain what the Discovery Lab named, but each one is now anchored in the governance baseline produced by Safety rather than assumed into existence.

**Prioritized use cases** maps the organization's actual work against AI's actual capabilities, and ranks the intersection by value and feasibility. What changes in the evolved version is that every candidate use case is screened against the data-sensitivity tiers from Safety before it reaches the priority list. A use case that would require touching a prohibited or restricted data category is either redesigned to fit the tier, routed to a separately-scoped environment, or deferred — but it is never treated as prioritizable just because it sounds valuable. The filter is upstream of the ranking.

**Experiment briefs** convert *someone should try this* into an experiment with a decidable outcome. Each brief names the hypothesis, the success criteria, the data touched, the guardrails, the timeline, and the owner. The evolved version adds two fields the original Lab treated as optional: the failure modes the team has already considered, and the explicit sign-off path if the experiment graduates. Both fields force the brief to anticipate the stage's exit rather than be surprised by it.

**Measurement and risk notes** capture what was actually measured, what was learned about quality and time, and what risks surfaced that the original framing missed. This is the honesty move. The evolved version threads these notes directly into the incident register produced by Safety, so that near-misses surfaced during sandbox work feed the same learning loop that governs the rest of the organization. A risk note and an incident note are different documents only until the incident happens; the architecture should anticipate that.

**The draft playbook** is the consolidation move — a first-draft statement of what use cases the organization believes are worth doing, what it has learned about them, what guardrails it runs inside, and what it is explicitly not going to pursue yet. The playbook is explicitly a draft; an organization that treats the playbook as finished stops updating it, and a playbook that stops updating stops being useful within a single quarter.

## The graduation gate

The sharpest addition to the evolved stage is an explicit exit criterion. The original Lab ended with a playbook. The evolved stage ends with two things: a playbook, and a set of use cases that have passed the graduation gate out of the sandbox and into the Skills or Solutions stages.

A use case graduates when it has a completed use-case card, peer review from at least one other team member, supervisor sign-off, a clean audit-log check for the pilot window, and — for any use case touching restricted data categories — a program-director-level review. Until all of those have happened, the use case stays in the sandbox, regardless of how well the pilot appears to have gone.

This gate is what keeps the sandbox from becoming a shadow production environment. Without an explicit graduation criterion, organizations tend to let successful pilots quietly become real workflows, which erases the distinction the sandbox was built to create. With the gate in place, the sandbox remains a learning environment, and Skills and Solutions inherit use cases that have already been stress-tested against the governance baseline.

A use case that fails to graduate is not a failure. It is the sandbox working. The organization that graduates every pilot does not have a sandbox; it has a pipeline with a euphemism.

## The formation-focused finish

The stage's real output is not a tool short-list. It is a formational shift in how the organization relates to AI.

Staff form shared AI literacy. They stop being individual users with individual opinions and start being a team with a common evidence base. Conversations move from the usual split between enthusiasts and skeptics into grounded disagreement about what the evidence actually shows — which is the only kind of disagreement that produces better decisions.

The organization forms the capacity to evaluate rather than the habit of purchasing. When a vendor shows up, staff can run the demo against the prioritized use cases, the experiment briefs, the risk notes, and the data tiers. They can tell, within an hour, whether the tool fits a real problem they have already identified and whether it respects constraints they have already named.

Leadership forms a defensible posture. The board asks what the organization is doing with AI, and leadership can point to prioritized use cases, experiments with measured results, a risk register, a living playbook, and a gate that determines what graduates and what does not. The answer is no longer *a few people are trying things*. It is *here is what we learned, here is what graduated, here is what we chose not to pursue yet, and here is how we can tell the difference.*

And, critically, the stage's output feeds Skills and Solutions. Skills training is organized around the workflows that actually graduated, not generic tool fluency. Solutions — workflow integrations, agent deployment, scaled tooling — attach to use cases that have already demonstrated value inside the guardrails. The stage is where learning gets captured so the rest of the system can act on it without improvising.

## Why this sequence is the one that holds

Two common alternatives fail in predictable ways.

The first is tool-first: pick a platform, deploy it, and see what happens. The organization ends up shaped by the tool's assumptions rather than its own, and its governance is a retrofit.

The second is strategy-first: commission a strategic framework, produce a deck, debate it for a year. The strategy is correct in the abstract and never meets a real experiment, which means it never gets updated against reality.

Sandbox Discovery is learning-first, in the stage of the sequence where learning-first actually works. Before Safety, learning-first is indistinguishable from tool-first, because the boundaries that would make the learning safe haven't been drawn yet. After Safety, learning-first becomes the stage that produces an evidence base, a practice, and a draft the organization revises as it goes. It is the only placement, in our experience, that produces an actual AI capability rather than an AI narrative.

## The move

A sandbox without a graduation gate is a staging environment with better branding. A sandbox without a governance baseline underneath it is a pilot waiting to become an incident.

A real sandbox is neither. It is the stage where an organization learns what it believes about AI by testing what it can actually do inside the constraints it has already committed to.

AI did not raise the bar on experimentation. It raised the cost of experimentation without discipline.

---

*Part of the AI Stewardship Sequence series:*
*[Safety](./the-work-of-safety.md) · [Sandbox Discovery](./sandbox-discovery.md) · Skills · Solutions*

*Supersedes: [Stop Tool-Shopping, Start Learning: The Discovery Lab](./nonprofit-discovery-lab.md) — the earlier framing of this stage, before the AI Stewardship Sequence was made explicit.*

*Related: [The Work of Safety](./the-work-of-safety.md) · [Governance You Can Run](./nonprofit-governance-ethics-build.md) · [Case Study: Youthfront](./case-study-youthfront.md)*
