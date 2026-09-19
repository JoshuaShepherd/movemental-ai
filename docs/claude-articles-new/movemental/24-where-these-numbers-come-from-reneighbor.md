---
title: "Where These Numbers Come From: The ReNeighbor Sources"
slug: "24-where-these-numbers-come-from-reneighbor"
author: "Joshua Shepherd"
original_number: 34
destination: "movemental.ai"
description: "Full methodology, data sources, and analytical rigor backing the demographic and spatial findings in ReNeighbor."
---

# Where These Numbers Come From: The ReNeighbor Sources

`where-these-numbers-come-from.md` · 6,294 words

### Where These Numbers Come From

A guide to every source behind your ReNeighbor report.

---

#### Start here

ReNeighbor doesn't know anything about your neighborhood on its own. Everything in your report comes from somewhere — a government survey, a set of old maps, a health model, a search of the open web. This page tells you where each piece came from, what it actually measures, and how much weight to put on it.

You don't have to read all of it. Skim to whatever number you're looking at.

Three habits will keep you honest with any of it:

**Check how big an area the number covers.** Some sources describe your specific neighborhood — a census tract, usually a few thousand people. Others describe your whole county or metro. A county unemployment rate tells you nothing about your street. Every entry below says which one you're getting.

**Most of these are estimates, not headcounts.** The Census figures are a five-year average with a margin of error. The CDC health numbers come from a model. The historical sources are years or decades old. Read them as strong signals, not exact truth.

**Blank almost never means zero.** Several of these feeds come back empty because of a coverage gap or a plumbing problem on our end — not because the thing they measure isn't there. An empty eviction number doesn't mean nobody gets evicted. Where a source is prone to this, we say so.

---

#### Who lives here

##### American Community Survey (Census Bureau)

The Census counts everyone once every ten years. In between, it runs a smaller rolling survey and pools five years of answers together so the numbers hold up for a small area. That's why your report says 2023 but really means "the average picture from 2019 through 2023."

**Covers:** your census tract — a few thousand people.
**Tells you:** how many people live there and their median age; what households earn and how many are below the poverty line; who owns and who rents; home values, rents, and how much of income goes to housing; education, commutes, and how long people have stayed.

This is the ground floor. Before you can love a place you need to know who's actually there. A young renting neighborhood asks different questions of you than an aging one full of paid-off homes.

Two things to hold. It's a survey, so every number carries a margin of error — a small tract's poverty rate might really sit anywhere in a wide band, which is why we show the band instead of a single confident figure. And because it averages five years, it lags. A neighborhood that just gentrified will still look like its older self here. If you want the direction of change, compare an older survey to a newer one; the trend is more honest than any single year.

*Source: U.S. Census Bureau, American Community Survey 5-year estimates, 2023.*

##### CDC PLACES

The CDC can't survey the health of every small neighborhood — too expensive. So PLACES takes big national health surveys and models what health probably looks like down at the neighborhood level.

**Covers:** your census tract.
**Tells you:** about forty measures. Health outcomes like diabetes, high blood pressure, depression, and obesity. Behaviors like smoking and inactivity. And life conditions — no insurance, no regular doctor, food insecurity, housing trouble, trouble paying utilities, and **loneliness** and lack of emotional support.

This is where a neighborhood's hidden aches show up. A place can look fine on income and home values and still carry high loneliness or depression — and those are exactly the wounds a rooted community is built to meet. "Loneliness 30%" means the model estimates roughly three in ten adults there usually feel lonely. That's not a headcount. It's a door.

These are modeled estimates, not counts of diagnosed people. And a bare percentage means nothing on its own — is 30% loneliness high or normal? We always show each figure against a national and state benchmark so "compared to what?" has an answer.

*Source: U.S. Centers for Disease Control and Prevention, PLACES, 2023.*

##### CDC Social Vulnerability Index

Built for disaster planners to answer one question: if a flood or a pandemic hit this neighborhood, how hard would it be for people here to cope and recover? The CDC bundles a stack of Census facts into one score.

**Covers:** your census tract, ranked against every other tract in the country.
**Tells you:** a score from 0 to 1. A tract in the 90th percentile is more strained than 90% of the country. It's built from four things: money and work (poverty, unemployment, income, education); household makeup (the very old and very young, disability, single parents, language); race and ethnicity; and housing and transportation (crowding, mobile homes, no car, group living).

Think of it as one "how much strain, how little cushion" number. A high score means people have less to fall back on when something goes wrong — and it's where practical care lands hardest: rides, meals, showing up in a crisis.

The catch is that it ranks rather than explains. "0.14" tells you where the place stands next to others; it doesn't tell you why. We translate the source's raw column names into the four plain themes above and phrase the score as a percentile so you can read it as "less strained than most of the country" instead of a bare decimal.

*Source: CDC / ATSDR Social Vulnerability Index, 2022.*

##### BLS Local Unemployment

The Bureau of Labor Statistics publishes an unemployment rate for counties and metros, updated every month.

**Covers:** your whole county.
**Tells you:** the share of people who want work, are looking, and don't have it.

Because it updates monthly it catches turns the Census is too slow to see — a plant closing, a local boom. But it's county-wide, so treat it as weather over the whole region, not a report on your streets. A struggling county can hold a comfortable neighborhood, and the reverse.

Honest note: this feed often fails mid-run and comes back empty. That's our plumbing, not a statement that everyone's employed. When it's blank, use the Census employment numbers instead.

*Source: U.S. Bureau of Labor Statistics, Local Area Unemployment Statistics.*

---

#### What's on the ground

##### Google Places

The same database behind the pins on Google Maps. We ask it what's actually near your address.

**Covers:** a radius around your address.
**Tells you:** real places, sorted — everyday businesses and third places (coffee shops, restaurants, shops); grocery stores and supermarkets; churches and places of worship; schools and civic anchors. For each one, a name, a rating, and how many people reviewed it.

This is the built world you'd see if you drove the streets. Where do people here get food — a real grocery store, or gas stations and dollar stores? Is there a coffee shop where the neighborhood gathers? How many churches already sit on these blocks?

Two things we handle for you. Google's categories are messy — searching "grocery" drags in liquor stores and pharmacies — so we filter that out and keep the actual food stores. And it's a living database, so a place that closed last month may still show a pin. Read the list as a strong current sketch, not a certified registry. The neighborhood name Google returns is Google's label, and it sometimes isn't what locals call the place.

*Source: Google Places API.*

##### Urban Institute Education Data (schools)

Every public school reports basic facts to the Department of Education each year. The Urban Institute cleans that up and makes it easy to pull.

**Covers:** public schools near your address.
**Tells you:** name, district, and distance; enrollment; grade range and type (regular, charter, magnet); and a read on economic need.

Schools are anchors. They tell you where the families are, which blocks feed which building, and where a neighborhood's kids spend their days. The district name matters more than a map suggests — one neighborhood can straddle several.

One thing worth understanding, because it trips up almost everyone. The old shorthand for school poverty was the free-and-reduced-lunch rate. But many districts now feed *every* child free regardless of income, so a school shows 99% even in a mixed-income neighborhood. That's a lunch policy, not a poverty measure. We drop that number and show **direct certification** instead — the share of kids automatically enrolled because their family already qualifies for food or cash assistance. That's a truer read of real household need, and it's often wildly different: one school in our worked example shows about 13% direct certification against a misleading 99% lunch rate.

*Source: Urban Institute Education Data Portal, drawing on the federal Common Core of Data, 2022.*

##### IRS Nonprofits

Every tax-exempt organization in the country — every charity, church, food bank, and civic group — has an IRS record. The IRS publishes the master list.

**Covers:** your ZIP code, widening to city or state when needed.
**Tells you:** names and addresses of registered nonprofits, and what kind each one is (the IRS classification code "X" means religion; others cover human services, health, education, arts).

This is the map of a neighborhood's existing ability to care. You are rarely the first person to love this place, and this shows you who your partners and elders might be. The religion-coded rows pull out the congregations and faith ministries specifically.

Two cleanups we do. A single ZIP can hold a thousand registered organizations, many of them duplicate chapters of the same group, so we collapse duplicates and put religion and human-service organizations first. And "registered with the IRS" is a legal fact, not proof anyone's still working — some entries are dormant. Treat this as a good lead list, then go find out who's really operating.

*Source: IRS Exempt Organizations Business Master File, 2025.*

##### U.S. Religion Census

Roughly every ten years, a coalition of religious bodies tries to count religious membership across the country, denomination by denomination.

**Covers:** your county.
**Tells you:** which religious groups are present and roughly how many adherents each claims; the share of the population that adheres to some religion, and by implication the share that doesn't; and the mix — heavily Catholic, heavily evangelical, mainline, unaffiliated.

This is the religious weather. Are you entering a churched region where most people already have a tradition, or a secular one where faith is thin? That shapes how a new expression of church lands — who your neighbors already are spiritually, what language will resonate, where the gaps are.

Two cautions. It counts adherents *as denominations report them*, which is self-reported and uneven — some groups count generously, some barely count at all, and unaffiliated people are inferred rather than asked. And it's county-level. Pair it with the actual congregations found nearby to get from region to neighborhood.

*Source: U.S. Religion Census 2020 (ASARB), via the Association of Religion Data Archives (ARDA).*

##### Census County Business Patterns

Once a year the Census tallies the businesses operating in each county.

**Covers:** your county.
**Tells you:** how many business locations there are, how they break down by industry, and how many people they employ.

Where Google Places shows you the shops on the corner, this shows you the shape of the whole local economy. Is this a place built on health care, on warehouses and logistics, on retail? That tells you what kind of work the people around you do, which shapes their schedules, their stresses, and when they can be reached.

County-level, so it describes the region your address sits inside, not your specific streets. Use it for the big picture and lean on Google Places and the Census commute numbers for what's happening outside your door.

*Source: U.S. Census Bureau, County Business Patterns, 2022.*

##### Walk Score

A private company (owned by Redfin) that scores how easy it is to get around without a car.

**Covers:** your address.
**Tells you:** three numbers from 0 to 100. **Walk Score** — could you run daily errands on foot, given how close groceries, restaurants, schools, parks, and shops are and how the streets are laid out? Over 90 and you barely need a car; under 50 and most trips mean driving. **Transit Score** — how good the bus and train service is. **Bike Score** — how safe and connected riding is.

This is a quick read on the rhythm of a place — whether life happens on sidewalks or through windshields. That shapes how a neighborhood gathers. A high walk score often means people bump into each other at the corner store, and a church can meet them in those third places. A low score usually means a private, car-dependent neighborhood where connection has to be planned rather than stumbled into.

Read it next to the Census commute numbers. If almost everyone drives to work but the walk score is high, you're looking at a place with the bones to be walkable that nobody uses that way — worth noticing. And take it as texture, not gospel: it's one company's model, tuned for real-estate listings.

*Source: Walk Score.*

---

#### How the place got this way

##### HOLC Redlining Maps

In the 1930s a federal agency drew color-coded maps of American cities to tell banks where it was safe to lend. Green and blue meant best. Yellow meant declining. **Red meant hazardous** — and those red areas, almost always Black and immigrant neighborhoods, were cut off from mortgage money for generations. That's where the word *redlining* comes from. Historians at the University of Richmond scanned and digitized every one of those maps, including the surveyors' handwritten notes.

**Covers:** your address, if it falls inside a mapped city.
**Tells you:** the grade — A (green), B (blue), C (yellow), or D (red) — and the original surveyor's written description of the area and its residents.

This is a neighborhood's inherited wound. Redlining didn't stay in the 1930s. The red areas were starved of investment for decades, and the resulting gaps in wealth, home values, tree cover, and health are still measurable. Knowing an address sits in a formerly redlined zone lets you read its present honestly: what looks like "just how this neighborhood is" often traces back to a line someone drew ninety years ago.

Read it next to the mortgage lending data to see whether the old pattern still runs. The surveyors' notes are often bluntly prejudiced. They're preserved as a primary document, to inform lament and understanding — not to be repeated as description.

*Source: Mapping Inequality: Redlining in New Deal America (University of Richmond Digital Scholarship Lab).*

##### Renewing Inequality (urban renewal)

After World War II the federal government funded "urban renewal" — clearing neighborhoods it labeled blighted to build highways, civic centers, and public housing. In practice it bulldozed hundreds of thousands of homes, and the displaced families were overwhelmingly Black and poor. The same Richmond team that mapped redlining reconstructed where these projects happened and how many people they uprooted.

**Covers:** your address, if it falls inside a documented project area.
**Tells you:** what the project was and when it ran, how many families were displaced, and their racial makeup where it was recorded.

This is the second half of an inherited history. Where redlining *starved* neighborhoods, urban renewal often *erased* them — tearing out the homes, churches, and businesses that held a community together. If your address sits in one of these zones, the people there now may be living on ground where an earlier community was displaced, and that memory can run deep.

Knowing it helps you enter with humility instead of assuming the neighborhood's current state is natural or neutral. It's what turns a table of demographics into a story with grief and resilience in it.

*Source: Renewing Inequality, University of Richmond Digital Scholarship Lab (American Panorama), covering roughly the 1950s–1970s.*

##### The Negro Motorist Green Book

Under Jim Crow, a Black postal worker named Victor Hugo Green published an annual guide to the hotels, restaurants, gas stations, and shops where Black travelers would be safe and welcome — because most of the country was neither. It was a survival tool. The New York Public Library digitized the guides and pinned the listings to real locations.

**Covers:** about a kilometer around your address.
**Tells you:** the name and type of each historical listing — hotel, restaurant, service station, tavern, salon — its address at the time, and how far it sits from you.

This is Black history made tangible on ground you can stand on. A cluster of Green Book listings marks a place that was once a haven, often the heart of a thriving Black community that white travelers drove past without a thought. Knowing what a corner held changes how you see it.

For a leader entering a neighborhood, this is an invitation to honor a history that's easy to overlook — the elders who remember it, the institutions that survived, the losses that came with integration and urban renewal. It turns "just an address" into somewhere with a story worth learning before you presume to add to it.

Thousands of listings are loaded. Whether any show up for you depends on whether Black travel life once concentrated near your address.

*Source: The Negro Motorist Green Book listings, mapped by The New York Public Library. 1930s–1960s.*

##### Chronicling America (historic newspapers)

The Library of Congress has scanned millions of pages of old American newspapers and made them searchable.

**Covers:** your state and area, over a date range you can set.
**Tells you:** no number. Actual articles that mention the place, in the language of the time — how a neighborhood, an event, or a community was described while it was happening.

This is a neighborhood's memory in its own voice. Numbers tell you what a place *is*; old newspapers tell you what it *lived through* — the founding, the boom, the fire, the closure, the fight, the celebration. That texture helps you arrive as someone willing to learn a place's story instead of a stranger acting like history started the day you showed up.

We search the real archive rather than asking an AI to recall history from memory, so anything quoted is anchored to a genuine document.

Two honest notes. The archive is uneven — some towns and eras are covered richly, others barely — so an empty result means thin coverage, not that nothing happened. And these papers carry the prejudices of their day. The language can be ugly. It's kept as a primary source to be read with discernment and lament, not repeated.

*Source: Chronicling America: Historic American Newspapers — Library of Congress (loc.gov). Credit the individual newspaper and the Library of Congress.*

##### Longitudinal Tract Database

There's a hidden problem in comparing a neighborhood to its own past: the Census redraws its tract boundaries every ten years, so the "same" tract in 1990 and 2020 may not cover the same ground. Researchers at Brown University rebuilt old Census data onto today's boundaries so you can line up decades of history for the same patch of land.

**Covers:** your census tract, back through past Census decades.
**Tells you:** population, race and ethnicity, income, education, and housing from earlier decades, all placed on today's map.

This is the long memory of a neighborhood's numbers, where the American Community Survey only reaches back a few years. Has this place been getting whiter or more diverse over decades? Was it always this affluent, or did that arrive recently? Is today's makeup a long pattern or a sharp break? That trend line keeps you from mistaking a recent change for the way things have always been.

One technical caution we handle behind the scenes: matching old boundaries to new ones takes a translation table, and where the redraw was messy we deliberately hide a shaky match rather than report a misleading number. A gap here can mean "the boundaries didn't line up well enough to trust," not "no history exists."

*Source: Longitudinal Tract Database — Brown University (Logan, Xu, Stults).*

##### Opportunity Atlas

Economists at Harvard followed millions of anonymized tax records to see what actually happened to the children who grew up in each neighborhood — not the adults living there now, but the kids raised there decades ago who are grown today. It answers a haunting question: **does this neighborhood tend to launch its children upward, or hold them where they started?**

**Covers:** your census tract.
**Tells you:** the average adult outcomes of people who grew up there — what they earn as adults, often split by what their parents earned; rates of incarceration, teen birth, and staying in the area; and results broken out by race and gender. We focus on the most telling figure: the adult income rank of children whose parents were in the bottom quarter of earners.

This is the closest thing there is to a measure of a place's effect on a life. Two neighborhoods can look identical on income today while one quietly hands its children a ladder and the other a ceiling. That difference sits at the heart of loving a place: are the kids growing up here going to be okay?

Two cautions, one of them serious. The data is historical — it describes a track record, not a promise about today's kids. And when a group's number is missing (say, no figure for Black children in a small tract), that means **"not reported," not "zero."** Small counts get suppressed to protect privacy. Reading a blank as "none of them made it" would be a bad mistake, so we label these as not reported on purpose.

*Source: Opportunity Insights / Opportunity Atlas (Chetty et al.), Harvard Dataverse, 2018 release.*

---

#### What's pressing on people

##### Eviction Lab

Until recently nobody had gathered the country's eviction records in one place. Sociologists at Princeton, led by Matthew Desmond, collected millions of court records to build the first national map of eviction.

**Covers:** your census tract, for the years 2000 through 2018.
**Tells you:** eviction filings (how often landlords took tenants to court), actual evictions (how often people were put out), and rates measured against the number of renter households so you can compare places of different sizes.

Eviction is one of the sharpest, most personal forms of instability a family can face. It uproots kids from schools, breaks apart support networks, and is often a cause of poverty rather than just a symptom. A high rate marks a neighborhood where housing is precarious and people are quietly being churned out of their homes — a place where presence, stability, and practical help matter enormously, and where the community you're joining may be more transient than it first looks.

The big caveat is age. This runs through 2018, so it can be years behind. We flag it as stale. Read it as history and pattern — *was* this a high-eviction place? — and check it against the newer Census rent and cost-burden trend for where things stand now.

*Source: The Eviction Lab at Princeton University.*

##### HUD Location Affordability Index

The usual way to judge affordability is rent or a mortgage. HUD argues that misses half the story: a cheap house in a far suburb costs a fortune once you add the two or three cars a family needs to live there. So this index adds **housing plus transportation** together.

**Covers:** your census tract, modeled for several household types.
**Tells you:** the share of income that goes to housing, the share that goes to transportation given how car-dependent the place is, and the two combined — the true cost of living *here*.

This reframes affordability honestly. A neighborhood can look cheap on rent and still crush a family's budget because everything requires a car and a long drive. The combined burden tells you how much breathing room people actually have, which shapes their stress, their time, and whether they can afford to put down roots.

One distinction we're careful to keep: HUD uses its *own* income assumptions for those model households, which won't match the actual median income the Census reports for your real neighborhood. In our worked example HUD models about $59k while the Census tract shows about $76k. Those are two different lenses and they must not be collapsed into one, so we label the HUD figure as coming from a model, not a count of the people who live there.

*Source: U.S. Department of Housing and Urban Development, Location Affordability Index.*

##### USDA Food Access Research Atlas

The USDA studies where Americans can and can't easily buy healthy, affordable food, and flags the neighborhoods commonly called food deserts.

**Covers:** your census tract.
**Tells you:** yes/no flags. Is it low-income? Is it low-access — meaning a meaningful share of people live more than a set distance from the nearest supermarket (often a mile in cities, ten miles in rural areas)? Plus combinations of the two at different distances, and flags for households without a vehicle.

Food access is a quiet daily hardship that shapes health, budgets, and dignity. In a flagged neighborhood the nearest real groceries might be a bus transfer away, so people make do with convenience stores and fast food — which shows up years later in the health data as diabetes and obesity. Knowing a place is a food desert points to something concrete and doable: rides, gardens, a co-op, a pantry, a market. It's often exactly the kind of need a rooted community can meet.

The raw data speaks in codes like `lila_1and10` — "LILA" means low-income and low-access. We translate those into plain yes/no English. Cross-check the flag against the grocery stores Google Places found nearby; sometimes a new store has opened since the atlas was last updated.

*Source: U.S. Department of Agriculture, Economic Research Service, Food Access Research Atlas.*

##### HMDA (home mortgage lending)

Federal law requires most mortgage lenders to report every home loan they make and every one they turn down. That public record is HMDA (say it "HUM-duh"). It exists so watchdogs can check whether banks lend fairly across neighborhoods and races.

**Covers:** your county reliably; your tract when the lookup works.
**Tells you:** how many home loans were applied for and how many were approved or denied; loan amounts and applicant incomes; who's borrowing, including race and ethnicity, which is the whole point of the law; and whether loans came from ordinary banks or higher-cost lenders.

Money flowing in — or being withheld — is one of the clearest signs of where a neighborhood is headed and how it's been treated. If loans are approved and homes are changing hands, capital is moving in, often the leading edge of gentrification. If applications from a neighborhood or a group are denied at unusual rates, that's the fingerprint of the redlining that shaped so many American cities. Read it next to the HOLC maps to see whether the old pattern is still running.

Honest limitation: the tract-level lookup frequently comes back empty right now — the county call works, the neighborhood call often doesn't. That's a gap we're working on, not a finding that no lending happened. When it's blank, read nothing into it.

*Source: FFIEC / CFPB, Home Mortgage Disclosure Act data, 2022.*

##### FEMA National Risk Index

FEMA rates how exposed each community is to natural hazards — floods, wildfires, tornadoes, hurricanes, earthquakes, heat — and how well it could bounce back.

**Covers:** county or tract.
**Tells you:** a risk score built from three things: how likely and severe the natural threats are, how much the local population would be harmed, and how well the place could recover.

This is the "what could go wrong from nature" question. It matters for the long view of caring for a place: a neighborhood in a flood zone or a fire-prone area carries a recurring threat that will, sooner or later, test whoever is present to help. Churches are often the ones who show up when disaster hits, so knowing the standing risk is part of loving a place wisely.

Be honest about it, though: **this dataset currently has nothing loaded in ReNeighbor.** It returns empty everywhere, so for now it adds nothing to your report. A blank here means we haven't loaded it yet — not that your neighborhood is hazard-free.

*Source: Federal Emergency Management Agency, National Risk Index.*

---

#### What's changing

##### Census Building Permits Survey

Before anyone builds a house or an apartment building, a local government issues a permit. The Census collects those counts from thousands of local permit offices.

**Covers:** whole jurisdictions — a city or county.
**Tells you:** how many new housing units got the green light over a period, split by type, like single-family homes versus larger apartment buildings.

Permits run ahead of everything else. People pull them before construction, which happens before new residents arrive. So a rise is an early signal that a neighborhood is about to grow or shift — new families, new density, new pressure on schools and streets. Flat or zero permits suggests a settled, built-out place that will look much the same in five years.

Two limits. It's reported for a whole jurisdiction, so read it as regional momentum, not block by block. And this endpoint frequently fails or returns nothing right now — a gap on our end, not evidence that nobody's building. When it's blank, set it aside.

*Source: U.S. Census Bureau, Building Permits Survey, 2023.*

##### GDELT (news coverage)

GDELT is a giant, always-running monitor of the world's news. It reads articles in near real time and turns them into searchable data — who, what, where, and the tone of the coverage.

**Covers:** your location, over a rolling 90 days.
**Tells you:** recent stories that name the place or the area around it, roughly what they're about, and whether the coverage skews positive or negative.

This is the current-events question — the living conversation around a neighborhood that no census catches. A run of stories about a new development, a closure, a crime wave, or a community win tells you what's on people's minds right now, and what a neighbor might bring up if you asked how things are going.

Two limits. GDELT keys off published news, so it's strong on places that make headlines and nearly silent on ordinary neighborhoods that don't. An empty result usually means "nothing newsworthy lately," not "nothing happening." And this feed often returns nothing at all in our runs. Treat a blank as no signal rather than a finding.

*Source: The GDELT Project.*

##### Census LODES (commute and jobs)

By linking employer records to where workers live, the Census can trace the daily tide of commuting — where the people who *live* in a neighborhood go to work, and where the people who *work* there come from.

**Covers:** your census tract — **but only in a handful of states so far.**
**Tells you:** how many workers live there and where their jobs are (near or far, which direction, what industry); how many jobs are located there and where the people filling them commute from; and the overall pull between home and work.

This shows a neighborhood's relationship to the wider city. Is it a place people leave every morning — a bedroom community that empties out by day? Or a place others pour into for work? That rhythm tells you when neighbors are actually home and reachable, whether the place has its own economic life or borrows it from downtown, and how far people's daily worlds stretch past their front doors.

Coverage limit worth knowing: we've only loaded LODES for Colorado, Utah, New Mexico, Wyoming, and Arizona. Everywhere else — including our Missouri worked example — we label commute data as *not loaded* rather than guess. A blank means it isn't in the warehouse for your state yet, not that nobody commutes.

*Source: U.S. Census Bureau, LEHD Origin-Destination Employment Statistics.*

---

#### What people say

##### Luna — web research

Everything above comes from an official dataset. Luna is different. It's a set of AI researchers that go read the open web about your specific neighborhood — local news, forums, reviews, blog posts, church websites — and summarize what people are saying. It's how we catch the human feel of a place that no government spreadsheet records.

There are three of them:

- **Community sentiment** — how do people who live here talk about the place? What do they love, complain about, worry about?
- **Cultural texture** — what's the identity and personality of the neighborhood? Where do people gather? What's the vibe, the local pride, the reputation?
- **Congregation enrichment** — takes the bare list of churches found nearby and fills each one out from its website: denomination, programs, ministries, who they serve.

**Covers:** your neighborhood when the web says enough about it; the wider metro when it doesn't.
**Tells you:** nothing numeric. Impressions — themes, top concerns, cultural identity, gathering spots, and fuller profiles of local churches.

This is what makes a neighborhood feel like a place instead of a table. The Census tells you the median income; only this can tell you that locals are proud of the old diner, anxious about a new development, and gather at a particular park on Sundays. For someone learning to love a neighborhood, that's gold.

But hold it loosely, and this is the part that matters most: it is **unverified web texture**, and we label it that way everywhere it shows up. The web is opinionated, uneven, and sometimes wrong — a few loud reviews aren't the neighborhood. When your neighborhood is thinly covered online, Luna sometimes broadens out to the wider metro, so we tag whether a finding is really about your neighborhood or is a metro fallback.

Treat Luna as informed rumor to check in person. It's a list of things to go ask real neighbors about. Never read it as established fact on the level of the Census or the CDC.

---

#### One more name you'll see

**Terra** isn't a source. Terra is the AI that writes your report. It takes everything above — the Census, the CDC, the old maps, Luna's web texture — and composes it into plain language. It measures nothing and adds no facts of its own. It only puts the sources together, following a strict rule about which ones are authoritative and which, like Luna, are only suggestive.

---

#### Quick reference

| Source | Area it covers | Vintage | Trust it? |
|---|---|---|---|
| American Community Survey | Census tract | 2019–2023 pooled | High — but it's a survey with error bands, and it lags |
| CDC PLACES | Census tract | 2023 | High — modeled estimates, not headcounts |
| CDC Social Vulnerability Index | Census tract | 2022 | High — ranks, doesn't explain |
| BLS Local Unemployment | County | Monthly | Solid when it returns; often comes back empty |
| Google Places | Radius around address | Live | Strong sketch; closed places linger |
| Urban Institute Schools | Nearby schools | 2022 | High — use direct certification, not lunch rate |
| IRS Nonprofits | ZIP code | 2025 | Good lead list; registration ≠ active |
| U.S. Religion Census | County | 2020 | Self-reported and uneven; county-wide |
| County Business Patterns | County | 2022 | High — but county-wide |
| Walk Score | Address | Current | Texture, not science |
| HOLC Redlining Maps | Address | 1930s | High — real historical documents |
| Renewing Inequality | Address | 1950s–70s | High — only if you're inside a project area |
| Green Book | ~1km radius | 1930s–60s | High — only where Black travel life concentrated |
| Chronicling America | State / area | 18th–20th c. | Real primary sources; uneven coverage |
| Longitudinal Tract Database | Census tract | Past decades | High — shaky boundary matches are hidden |
| Opportunity Atlas | Census tract | 2018 release | High — blank means "not reported," never zero |
| Eviction Lab | Census tract | 2000–2018 | Stale — read as pattern, not present |
| HUD Location Affordability | Census tract | Reference | High — its income model ≠ your tract's real income |
| USDA Food Access | Census tract | Reference | High — cross-check against real stores nearby |
| HMDA | County (tract often fails) | 2022 | County works; tract often comes back empty |
| FEMA National Risk Index | County / tract | — | **Not loaded.** Returns nothing |
| Building Permits | City / county | 2023 | Often fails; regional signal only |
| GDELT | Location | Rolling 90 days | Often empty; silence isn't a finding |
| Census LODES | Census tract | Reference | **CO, UT, NM, WY, AZ only** |
| Luna (web research) | Neighborhood or metro | Live | **Unverified.** Go check it in person |

---

#### Attributions

Some of these sources ask to be credited by name, and we're glad to:

- *Mapping Inequality: Redlining in New Deal America* (University of Richmond Digital Scholarship Lab)
- *Opportunity Insights / Opportunity Atlas* (Chetty et al.), Harvard Dataverse
- *The Eviction Lab at Princeton University*
- *US Religion Census 2020* (ASARB), via the Association of Religion Data Archives (ARDA)
- *Chronicling America: Historic American Newspapers* — Library of Congress (loc.gov); credit the individual newspaper as well
- *The Negro Motorist Green Book* listings, mapped by The New York Public Library
- *Longitudinal Tract Database* — Brown University (Logan, Xu, Stults)

---
