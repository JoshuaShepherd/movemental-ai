---
title: "The Work of Safety: What Has to Be True Before Anything Else"
slug: the-work-of-safety
shape: story
author: Josh Shepherd
audience: [any]
topics: [ssss]
---
# The Work of Safety: What Has to Be True Before Anything Else

## Why the order matters

Most organizations meet AI in the wrong order. Someone pilots a tool. The staff reacts. A policy is drafted after the fact, usually in response to the first thing that scared leadership. Training shows up months later, aimed at whatever the current problem is. Governance is a document appended to an existing deployment.

That sequence feels practical. It isn't. It is the order in which damage accumulates: fragmentation first, risk exposure second, shallow capability third, and policy arriving last — written to rationalize what the organization has already done, rather than to shape what it will do.

The Safety → Sandbox → Skills → Solutions sequence reverses this. Safety is not the chapter at the back of the playbook. It is the stage that has to be substantially complete before any of the others can be run with integrity.

## What Safety is not

Safety is not bureaucracy. It is not a set of slides on an intranet. It is not a compliance retrofit. It is not, most importantly, a values statement that lives on the wall.

It is the work of defining — in specific language, signed off by real people, and enforced inside the product — what is acceptable, meaningful, and aligned for this organization before action begins.

"Done" does not mean "finished." Safety is iterative by design; it absorbs learning from every downstream stage and revises itself. But it has a baseline state, and until that baseline is in place, nothing else should be running.

What follows is the full arc of the work, in order.

## The fourteen moves

### 1. Name the sponsor and the governing body

An executive sponsor owns the stage. A standing decision forum — exec team plus a board committee or equivalent — owns escalations. Without a named owner, Safety diffuses into *everyone's job* and becomes no one's. The sponsor's first act is to commit the calendar time; governance that isn't on the calendar is not governance.

### 2. Convene moral and ethical reflection — before policy

Surface the beliefs that sit underneath the policy language. (Faith-shaped organizations should name theological lines here in the same breath; secular orgs stay with moral anthropology—what you owe persons in speech and care.) What does the organization actually hold about personhood, authorship, truth, and formation? What would make it stop? This is not a chapter at the back of the handbook. It shapes every downstream decision. The artifact is a one-page reflection authored by leadership in its own voice, not a consultant's draft. Organizations that skip this step end up with policies that are internally incoherent, because their constraints were never rooted in their beliefs.

### 3. Draft the statement of principles

Short. First-person. Specific to this organization. Not generic AI ethics. Not a restatement of the vendor's usage policy. *What we believe about this capability in our context, signed by the people who run the organization.* The statement becomes the opening of every training and the lens for every use-case review. It is the test a staff member applies when no one else is in the room.

### 4. Inventory sensitive data

Map every category the organization touches: constituent PII, financial and donor data, protected health data, legal or court-adjacent records, HR, volunteer screening, counseling, proprietary strategy, third-party confidential information. For each: source systems, legal basis, current retention, consent basis. Without this map, every policy clause downstream is abstract, and every staff member will apply a different private definition of *sensitive*.

### 5. Tier the data and name the no-go zones

Translate the inventory into concrete sensitivity tiers — public, internal, restricted, prohibited — and name the categories that never enter AI tooling, even de-identified, without a specifically-approved workflow. Naming these zones explicitly is what turns the tier system from a chart into a constraint. The organization that cannot say *we will not do X, even if it would save time* does not yet have a governance posture.

### 6. Write the Acceptable Use Policy

One document. Plain language. Staff-friendly. What is allowed, what is not, and why. Quoting the vendor's usage policy verbatim where relevant, so staff can cite one source when pressured by a donor, partner, or parent. Written to be readable by a new hire in ten minutes. An AUP that requires a legal orientation to decode is an AUP that will be ignored.

### 7. Configure the platform to enforce the policy

Policy in a PDF is decoration. Policy in the product is governance. At minimum: domain capture, single sign-on, identity lifecycle through SCIM, audit logs on, custom data retention matched to the records-retention schedule, shadow-organization restriction so staff cannot spin up personal instances on work emails, and a connector inventory with a named owner per team. For regulated data, a separate environment with the appropriate legal instrument in place — a business associate agreement, a data processing addendum, whatever the category demands. This is the step that converts Safety from compliance theater into a real constraint on real behavior.

### 8. Write the incident-response playbook

Tiered escalation — from near-misses ("I almost pasted X") through sensitive content entering the system through decisions made on unreviewed output through external exposure. Specific time-bound actions at each tier. A no-retaliation policy for self-reports. A standing register for near-misses, because pattern data matters more than any single incident. The worst incident is the one that stayed quiet; the playbook exists to make transparency faster than the alternative.

### 9. Publish the governance baseline in one accessible place

Principles, AUP, data-boundary map, incident playbook, and a short glossary — all one click from the staff intranet. If a staff member cannot find it in thirty seconds, it does not exist. This is the first visible gate: the baseline is either published and discoverable, or the stage has not yet produced its artifact.

### 10. Run a tabletop incident exercise before a real one

Simulate a plausible incident end-to-end with the actual people who would be involved. The exercise reveals missing roles, unclear escalation paths, and naive assumptions in the playbook. It also calibrates the team on what *escalation without panic* looks like. Update the playbook from the exercise, not from the first real incident.

### 11. Obtain 100% Acceptable Use Policy sign-off

This is the gate between Safety and Sandbox. No applied or pilot work begins until every person with access has signed. Tracked against identity records and HR, not memory. The gate is unambiguous for a reason: once applied work starts without universal sign-off, the organization cannot later claim the policy governed the work.

### 12. Publish the external posture statement

A one-page statement ready for the organization's external audiences — board, regulator, funder, donor, denomination, accreditor, state body, major partner. Written before the first external question, not after it. External legitimacy is part of the work; the posture statement protects the organization's reputation before anyone asks, and it gives staff a shared answer when asked in the hallway.

### 13. Establish the audit cadence

Quarterly audit-log review. Quarterly connector-permission review. Quarterly retention review. Monthly adoption metrics to the exec team. Scheduled on the governance body's calendar with a named reviewer. The calendar is the governance. Without recurring reviews, Safety decays within two quarters — not because anyone abandons it, but because the organization's attention moves on and the system has no heartbeat.

### 14. Define the upstream feedback loop

Every incident, near-miss, and sandbox failure closes with one question: *what changes in training, policy, or tooling so this is less likely next time?* The governance baseline is versioned — v1.0, v1.1, v1.2 — and the changelog is visible. This is what makes Safety iterative rather than ceremonial: it absorbs learning from Sandbox, Skills, and Solutions and revises itself. An organization whose governance has no version history has a governance that has not yet met reality.

## The threshold test

A single-line test for whether Safety is actually done: *a new staff member, on day one, can locate the governance baseline, name who owns it, identify the data categories they may not touch, explain how to self-report a near-miss, and point to an audit review on the calendar in the next ninety days.*

If any of those fails, Safety is not complete, regardless of how many documents have been written.

## What Safety produces

Clarity. Shared language. Real boundaries. Alignment across leadership. A baseline that downstream stages can build on without constantly relitigating first principles.

What it does not produce is speed — not at first. The stage costs time the organization will be tempted to skip. The cost is the point. The organizations that skip this stage buy their speed on credit; the bill comes later, in the form of an incident, a policy crisis, or a slow erosion of trust that no one can locate the origin of.

## The move

Safety is not the cost of being careful. It is the condition under which careful work becomes possible.

AI did not create the need for organizational governance. It exposed which organizations had built it and which had been performing it.

---

*Part of the AI Stewardship Sequence series:*
*[Safety](./the-work-of-safety.md) · [Sandbox Discovery](./sandbox-discovery.md) · Skills · Solutions*

*Related: [Governance You Can Run](./nonprofit-governance-ethics-build.md) · [Case Study: Youthfront](./case-study-youthfront.md)*
