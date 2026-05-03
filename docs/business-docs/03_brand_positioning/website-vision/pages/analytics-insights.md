# Analytics & Insights (Dashboard Module)

## Purpose
Deliver actionable analytics on revenue, reach, content performance, network impact, and transparency compliance to help leaders optimize their platforms.

## Metrics Covered
- Revenue & payouts (MTD, rolling 90 days, projections)
- Audience reach & amplification vs. baseline (search, referrals, network)
- Content performance (top pieces, CTA conversions, badge engagement)
- Transparency & AI metrics (badge mix, voice/theology QA scores)
- Network insights (audience overlap, collaboration outcomes)

## Component Map
1. **Metric Overview Row**
   - Revenue, Audience Reach, Content Cadence, Badge Compliance.
2. **Revenue & Payouts Card**
   - Graph with Movemental vs. publisher comparison, stripe payout schedule, rev-share breakdown.
3. **Audience & Amplification Graph**
   - Shows 16x → 1,000,000x ladder with current leader’s data point and network contributions.
4. **Content Leaderboard**
   - Top-performing content by views, conversions, network shares.
   - Filters by format/timeframe.
5. **Transparency Compliance Panel**
   - Badge usage chart, outstanding disclosures, voice/theology QA status.
6. **Network Insights Card**
   - Overlap percentages with other leaders, suggested collaborations, cross-link opportunities.
7. **Goals & Benchmarks**
   - Personalized targets (publish cadence, revenue goals) with progress bars.
8. **Export & API**
   - Buttons to download CSV/PDF, connect to analytics warehouse.

## Data Sources
- Supabase analytics tables, network graph, AI QA logs, Stripe payouts.
- Possibly aggregated warehouse data (BigQuery/Lightdash).

## UX Notes
- Provide explanation tooltips for each metric.
- Support segmentation (by content type, geography).
- All charts MUST meet accessibility standards (high contrast, alt text).

## Open Questions
- Determine frequency of data refresh (near real-time vs. daily).
- Assess need for custom dashboards for org’s multi-leader rollups.

