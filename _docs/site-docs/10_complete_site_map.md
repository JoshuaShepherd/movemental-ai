# Complete Site Map

> **Clean, ordered sitemap reflecting the structural documentation**

**Version**: 1.0.0  
**Last Updated**: January 2026

---

## Overview

This document provides a complete sitemap of Movemental.ai's public, non-dashboard pages. The sitemap reflects the logical order of discovery and identifies which pages are primary (foundational) versus supporting.

**Note**: This sitemap includes only public pages. Dashboard routes and authenticated-only areas are excluded.

---

## Primary Pages (Foundational)

Primary pages are foundational to understanding Movemental. They should be encountered in this order:

### 1. Fit Check
**Route**: `/fit-check`  
**Type**: Primary (Foundational)  
**Order**: 1  
**Purpose**: Determine if visitor is the right person for Movemental  
**Status**: Required

**See**: [02_fit_check.md](./02_fit_check.md)

---

### 2. Why Movemental (Longform)
**Route**: `/why-movemental`  
**Type**: Primary (Foundational)  
**Order**: 2  
**Purpose**: Explain why Movemental exists and what problem it solves (revenue extraction, platform dependency)  
**Status**: Required

**See**: [03_why_movemental_longform.md](./03_why_movemental_longform.md)

---

### 3. Onboarding Path Overview
**Route**: `/onboarding`  
**Type**: Primary (Foundational)  
**Order**: 3  
**Purpose**: Show what happens from "fit confirmed" to "live on platform"  
**Status**: Required

**See**: [04_onboarding_path_overview.md](./04_onboarding_path_overview.md)

---

## Supporting Pages

Supporting pages provide additional context and resources. They can be encountered in various orders, but typically after primary pages:

### 4. Team / People
**Route**: `/team` or `/people`  
**Type**: Supporting  
**Order**: 4 (typically)  
**Purpose**: Show who is behind Movemental and why they should be trusted  
**Status**: Required

**See**: [05_team_and_credibility.md](./05_team_and_credibility.md)

---

### 5. AI Book (Knowledge Spine)
**Route**: `/book`  
**Type**: Supporting (Foundational Resource)  
**Order**: 5 (typically, but can be accessed anytime)  
**Purpose**: Provide language, discernment, and posture needed to use Movemental  
**Status**: Required

**See**: [06_ai_book_as_knowledge_spine.md](./06_ai_book_as_knowledge_spine.md)

---

### 6. Learning / Enablement Hub
**Route**: `/learn` or `/resources`  
**Type**: Supporting  
**Order**: 6 (typically, but can be accessed anytime)  
**Purpose**: Teach visitors how to use Movemental effectively  
**Status**: Required

**See**: [07_learning_and_enablement_hub.md](./07_learning_and_enablement_hub.md)

---

### 7. Pricing / Access
**Route**: `/pricing` or `/access`  
**Type**: Supporting  
**Order**: 7 (typically, after understanding)  
**Purpose**: Show pricing model ($1,000 + 10% revenue share) and revenue retention (90%)  
**Status**: Required

**See**: [08_pricing_and_access.md](./08_pricing_and_access.md)

---

### 8. Homepage
**Route**: `/`  
**Type**: Supporting (Router)  
**Order**: 8 (built last, but encountered first)  
**Purpose**: Route visitors to the right pages  
**Status**: Required

**See**: [09_homepage_role.md](./09_homepage_role.md)

---

## Additional Public Pages

These pages may exist but are not part of the core structural sequence:

### Legal Pages
- **Privacy Policy**: `/privacy` (Required)
- **Terms of Service**: `/terms` (Required)
- **Accessibility**: `/accessibility` (Optional, recommended)

### Contact / Support
- **Contact**: `/contact` (Optional, but recommended)
- **Support**: `/support` (Optional)

### Authentication
- **Login**: `/login` (Required if user accounts exist)
- **Sign Up**: `/signup` (Required if user accounts exist)
- **Password Reset**: `/reset-password` (Required if user accounts exist)

---

## Logical Order of Discovery

### For New Visitors

1. **Homepage** (`/`) → Entry point, routes to Fit Check
2. **Fit Check** (`/fit-check`) → Determine fit
3. **Why Movemental** (`/why-movemental`) → Understand purpose
4. **Onboarding Path** (`/onboarding`) → See the journey
5. **Team** (`/team`) → Build trust
6. **AI Book** (`/book`) → Learn foundation
7. **Learning Hub** (`/learn`) → Learn how to use
8. **Pricing** (`/pricing`) → Understand cost and limits

### For Returning Visitors

1. **Homepage** (`/`) → Re-entry point
2. **Direct navigation** → To specific pages as needed
3. **Learning Hub** (`/learn`) → Continue learning
4. **AI Book** (`/book`) → Reference knowledge

### For Ready-to-Sign-Up Visitors

1. **Pricing** (`/pricing`) → Confirm cost and limits
2. **Sign Up** (`/signup`) → Create account
3. **Onboarding Path** (`/onboarding`) → See what's next

---

## Page Relationships

### Primary Flow (New Visitors)

```
Homepage
  ↓
Fit Check
  ↓ (if fit)
Why Movemental
  ↓
Onboarding Path
  ↓
[Supporting Pages: Team, AI Book, Learning Hub, Pricing]
```

### Supporting Flow (Returning Visitors)

```
Homepage
  ↓
[Direct navigation to any page]
```

### Decision Flow (Ready to Sign Up)

```
Pricing
  ↓
Sign Up
  ↓
Onboarding Path
```

---

## Page Status Summary

### Required Pages

✅ **Primary (Foundational)**:
- Fit Check
- Why Movemental
- Onboarding Path Overview

✅ **Supporting (Required)**:
- Team / People
- AI Book
- Learning Hub
- Pricing / Access
- Homepage

✅ **Legal (Required)**:
- Privacy Policy
- Terms of Service

✅ **Authentication (Required if user accounts exist)**:
- Login
- Sign Up
- Password Reset

### Optional Pages

🔲 **Supporting (Optional)**:
- Contact
- Support
- Accessibility

---

## Notes on Implementation

### Route Structure

All public pages should live under the Next.js App Router structure:
- `src/app/(public)/` for public pages
- Route names should match the sitemap above

### Navigation Structure

Primary navigation should prioritize:
1. Fit Check
2. Why Movemental
3. Onboarding Path
4. Team
5. AI Book
6. Learning Hub
7. Pricing

Secondary navigation can include:
- Legal pages (footer)
- Contact / Support (footer or header)
- Authentication (header, if applicable)

### Page Dependencies

Pages should be built in this order:
1. Fit Check
2. Why Movemental
3. Onboarding Path
4. Team
5. AI Book
6. Learning Hub
7. Pricing
8. Homepage (last)

---

## Summary

### Primary Pages (Foundational)
1. Fit Check
2. Why Movemental
3. Onboarding Path Overview

### Supporting Pages (Required)
4. Team / People
5. AI Book
6. Learning Hub
7. Pricing / Access
8. Homepage

### Additional Pages
- Legal (Privacy, Terms)
- Authentication (Login, Sign Up)
- Contact / Support (optional)

**The sitemap reflects the logical order of discovery: Fit → Why → Path → Supporting Pages → Homepage. The Homepage is built last but encountered first, serving as a router to the foundational pages.**

---

**Related Documentation**:
- [01_site_purpose_and_order.md](./01_site_purpose_and_order.md) - Why this order matters
- [02_fit_check.md](./02_fit_check.md) - Fit Check details
- [03_why_movemental_longform.md](./03_why_movemental_longform.md) - Why Movemental details
- [04_onboarding_path_overview.md](./04_onboarding_path_overview.md) - Onboarding Path details
- [05_team_and_credibility.md](./05_team_and_credibility.md) - Team page details
- [06_ai_book_as_knowledge_spine.md](./06_ai_book_as_knowledge_spine.md) - AI Book details
- [07_learning_and_enablement_hub.md](./07_learning_and_enablement_hub.md) - Learning Hub details
- [08_pricing_and_access.md](./08_pricing_and_access.md) - Pricing details
- [09_homepage_role.md](./09_homepage_role.md) - Homepage details
