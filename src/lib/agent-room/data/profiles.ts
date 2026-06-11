/**
 * Agent Room — verified per-leader content (ported from `js/data/profiles.js`).
 *
 * One approved record per leader. Founders ship real, source-backed content;
 * everyone else stays an honest stub until reviewed. `getProfile()` is the
 * single seam — swap it for a retrieval/RAG call without touching screens or
 * scenes (the deferred AF-90 / INT-06 work). No claim here is improvised: if it
 * isn't in an approved record, the agent doesn't say it.
 *
 * Editorial text is byte-identical to the prototype. The HTML *builders*
 * (`leaderHTML`, `foundersHTML`, …) are NOT ported here — they become JSX in
 * AF-10; this module is data + the `getProfile` seam + the `sayScene` helper.
 */
import type { Scene } from "../acts";
import { LEADER_CORPUS_SLUGS } from "./leaders";

export interface ProfileWork {
  /** Section title (e.g. "Books", "Organizations"). */
  t: string;
  /** The grounded detail line. */
  g: string;
}

export interface ProfileLink {
  label: string;
  href: string;
}

export interface ProfileNotableWork {
  title: string;
  line: string;
}

export interface Profile {
  approved: boolean;
  lede: string;
  bio: string;
  work: ProfileWork[];
  connection: string;
  /** Grounded lines the agent may say about the leader's work. */
  workSay: string[];
  /** Grounded lines about how the leader connects to the network. */
  connectSay: string[];
  /** Representative works, talks, or ideas — credibility substance. */
  notableWorks?: ProfileNotableWork[];
  /** Signature idea or pull quote in ink style. */
  pullQuote?: string;
  links: ProfileLink[];
}

export const PROFILES: Record<number, Profile> = {
  0: {
    approved: true,
    lede: "Missiologist · Forgotten Ways & APEST",
    bio: "Alan Hirsch is the missiologist who coined the term \"movemental\", the namesake of this platform, and built the intellectual architecture much of the contemporary missional church now runs on. Born in Johannesburg in 1959, raised in apartheid-era South Africa, he emigrated to Australia in 1983 and pastored the South Melbourne Restoration Community for fifteen years among addicts, sex workers, and the chronically housed before turning that ministry's lessons into theory.\n\nHis magnum opus, The Forgotten Ways (Brazos, 2006), introduced the mDNA framework and the concept of Apostolic Genius; 5Q (2017) and The Permanent Revolution (Jossey-Bass, 2012, with Tim Catchim) have made APEST one of the most widely adopted readings of Ephesians 4 in the Western church, with more than 150,000 assessments taken through his platforms. Across twenty books published with seven publishers, including The Shaping of Things to Come with Michael Frost, ReJesus, Untamed with Debra Hirsch, and Metanoia with Rob Kelly, he has built a coherent line from Christology through missiology to ecclesiology.\n\nHe founded 100Movements, co-founded the Forge Mission Training Network and 5Q Collective, and co-founded the M.A. in Missional Church Movements at Wheaton College. He teaches as adjunct faculty at Fuller, George Fox, and Asbury, and works as embedded consultant for Redeemer City to City and movement mentor for NewThing International.",
    work: [
      { t: "Books", g: "The Forgotten Ways (Brazos, 2006), 5Q (100 Movements, 2017), The Permanent Revolution (with Tim Catchim), The Shaping of Things to Come (with Michael Frost), Metanoia (with Rob Kelly)." },
      { t: "Organizations", g: "100Movements, Forge Mission Training Network, 5Q Collective, Wheaton M.A. in Missional Church Movements, adjunct at Fuller, George Fox, and Asbury." },
    ],
    connection:
      "Co-founder of Movemental. The decades of missional work he and Brad built, Forge, 100Movements, and the Movement Leaders Collective, are exactly the credibility this path is made to keep legible.",
    workSay: [
      "Alan wrote much of the language the field uses, from The Forgotten Ways and 5Q to APEST.",
      "Thirty years of planting churches and training leaders sits under it.",
    ],
    connectSay: [
      "Co-founder of Movemental.",
      "His and Brad’s decades of missional work are the credibility the path protects.",
    ],
    links: [],
  },
  1: {
    approved: true,
    lede: "Send Network strategist · Covocational planting",
    bio: "Brad Brisco works the seam most missional writers avoid: the seam between post-Christendom theology and a Southern Baptist denominational system. As Director of Multiplication Strategies for Send Network at the North American Mission Board, he translates Newbigin, Bosch, Frost, and Hirsch into the planting language of a tradition that has not always reached for them. He earned a D.Min. in Missional Ecclesiology with a dissertation on helping existing congregations transition toward mission, and he has carried that question into eighteen-plus years of college teaching across History of Christianity, Theology of Place, and Launching Apostolic Movements.\n\nHis written corpus moves in stages alongside Lance Ford, from the small-group curriculum Missional Essentials, through The Missional Quest (InterVarsity Press) and Next Door As It Is In Heaven (NavPress, 2016), to ReThink and his solo synthesis Covocational Church Planting (Missional Press, 2021), released as a free bilingual ebook in English and Spanish. He co-founded Forge Kansas City and the Sentralized Conference, sits on the Forge America national leadership team, and writes regularly across New Churches, ChurchLeaders.com, and his own missionalchurchnetwork.com, a deliberately distributed footprint that mirrors the institutional and grassroots circles he has always tried to hold together.",
    work: [
      { t: "Books", g: "Covocational Church Planting (Missional Press, 2021), Next Door As It Is In Heaven (with Lance Ford, NavPress, 2016), The Missional Quest, Missional Essentials." },
      { t: "In the field", g: "Send Network (NAMB), Forge Kansas City, Sentralized Conference, Forge America national leadership, missionalchurchnetwork.com." },
    ],
    connection:
      "Co-founder of Movemental. Brad and Alan have written and trained alongside each other for decades; that shared body of work is one of the credibility nodes the network makes visible.",
    workSay: [
      "Brad’s work centers on sentness, and on bivocational ministry.",
      "Years of denominational and network-level missional work sit behind it.",
    ],
    connectSay: [
      "Co-founder of Movemental, alongside Alan and Josh.",
      "He and Alan have taught and written together for decades.",
    ],
    links: [],
  },
  2: {
    approved: true,
    lede: "National Director, V3 · The Scandal of Leadership",
    bio: "JR Woodward has spent more than three decades planting churches that try to hold tight-knit community, life-forming discipleship, locally rooted presence, and boundary-crossing mission together rather than choosing among them. He founded New Life Christian Fellowship at Virginia Tech in 1989, co-planted Kairos Los Angeles out of East Hollywood, and now leads the V3 Church Planting Movement nationally from the Washington, DC area, training planters across North America alongside Dan White Jr. and Jesse Eubanks.\n\nHis written corpus is unusually integrated for a working practitioner. Creating a Missional Culture (IVP, 2012) introduced the Five Culture Creators reframing of Ephesians 4; The Church as Movement (IVP, 2016, with Dan White Jr., foreword by Alan Hirsch) named the eight competencies V3 still trains around; and The Scandal of Leadership (100 Movements Publishing, 2023) translated his Manchester Ph.D. on mimetic desire and the powers of domination into a trade book for pastors.\n\nHe co-founded Missio Alliance and the Praxis Gathering, teaches as adjunct faculty at Fuller, Central, and Missio Seminary, and serves on the boards of Reliant Mission, the Movement Leaders Collective, and Fuller's Global Mission Advisory Council. Colleagues describe him as the architect to Alan Hirsch's prophet, a builder of careful, named frameworks who has stayed inside the neighborhood the whole time.",
    work: [
      { t: "Books", g: "Creating a Missional Culture (IVP, 2012), The Church as Movement (with Dan White Jr., IVP, 2016), The Scandal of Leadership (100 Movements, 2023)." },
      { t: "Organizations", g: "V3 Church Planting Movement, Missio Alliance, Praxis Gathering, adjunct at Fuller, Central, and Missio Seminary." },
    ],
    connection:
      "National director of V3 and co-founder of Missio Alliance and the Praxis Gathering, connected to Alan Hirsch, Michael Frost, and the Forge stream Movemental sits inside.",
    workSay: [
      "JR directs V3 nationally and writes on missional culture and the theology of the powers.",
      "His Manchester dissertation became The Scandal of Leadership.",
    ],
    connectSay: [
      "He co-founded Missio Alliance and the Praxis Gathering.",
      "V3 and Forge are part of the same practitioner network behind this path.",
    ],
    links: [],
  },
  3: {
    approved: true,
    lede: "Church-multiplication author · disciples in the smallest unit.",
    bio: "Neil Cole recovers the church’s smallest reproducible cell and releases it to multiply. The Life Transformation Group, two or three people, Scripture, confession, prayer for the lost, carries the DNA of organic church from The Coffee Tavern through Cultivating a Life for God and Church 3.0.",
    work: [
      { t: "Books", g: "Organic Church, Church 3.0, Search & Rescue, Organic Leadership, Church Transfusion, Primal Fire, and more." },
      { t: "Organizations", g: "Starling Initiatives, 100 Movements (co-founded with Alan Hirsch), and Kairos Pacific University." },
    ],
    connection:
      "Co-founded 100 Movements with Alan Hirsch and sits in the organic-church conversation Movemental was built to serve, an elder voice whose work the path is meant to keep legible.",
    workSay: [
      "Neil coined the Life Transformation Group and the organic-church vocabulary the field still uses.",
      "His LTG was adapted by the International Mission Board.",
    ],
    connectSay: [
      "He co-founded 100 Movements with Alan Hirsch.",
      "Organic church and disciple-making are core to the network behind Movemental.",
    ],
    links: [],
  },
  4: {
    approved: true,
    lede: "Forge America director · Red Skies curator",
    bio: "Rowland Smith carries the National Director role at Forge America Mission Training Network while founding and directing The Pando Collective, a Front-Range micro-church network seeded inside Pulpit Rock Church in Colorado Springs, where he also serves as Pastor of Missional Culture.\n\nHe authored Life Out Loud: Joining Jesus Outside the Walls of the Church (100 Movements Publishing, 2019) with a foreword contribution from Michael Frost, then curated and edited Red Skies: 10 Essential Conversations Exploring Our Future as the Church (100 Movements Publishing, 2022), a multi-author chorus including Alan Hirsch, Debra Hirsch, Brian Sanders, Leonard Sweet, Mark DeYmaz, Oneya Okuwobi, Lisa Rodriguez-Watson, and Anna Robinson writing across leadership, race, sexuality, contextual intelligence, and church economics.\n\nHe teaches as adjunct faculty at Fuller Theological Seminary's DGL program, Denver Seminary's Doctor of Ministry in New Missional Movements, and Grand Canyon University, holding an MA in Global Leadership and a Fuller DMiss whose dissertation, Missional Emergence, codifies the action-reflection pedagogy now powering his Forge cohort design. He also co-founded Third Space Coffee with his wife, business-as-mission lived in the same neighborhood as the rest of his work.",
    work: [
      { t: "Books", g: "Life Out Loud (100 Movements, 2019), Red Skies, curator and editor (100 Movements, 2022), Missional Emergence (Fuller DMiss)." },
      { t: "Organizations", g: "Forge America (National Director), The Pando Collective, The Church at Pulpit Rock, adjunct at Fuller, Denver Seminary, Grand Canyon." },
    ],
    connection:
      "National Director of Forge America and a 100 Movements author, in the same training pipeline as Alan Hirsch, Brian Sanders, and the practitioners Movemental connects.",
    workSay: [
      "Rowland directs Forge America and coined action-reflection discipleship.",
      "Red Skies convened Alan Hirsch, Brian Sanders, and fourteen movement voices.",
    ],
    connectSay: [
      "He leads Forge America nationally.",
      "Forge and 100 Movements are credibility nodes this path was built to protect.",
    ],
    links: [],
  },
  5: {
    approved: true,
    lede: "KC Underground founder · Starfish and the Spirit",
    bio: "Rob Wegner spent roughly a quarter-century at Granger Community Church in northern Indiana as Teaching Pastor under Mark Beeson, where he co-led EnterMission, co-founded Future Travelers with Alan Hirsch, and co-authored Missional Moves (Zondervan, 2012) with Jack Magruder. Repeated trips to document a Granger-seeded movement in southern India, 120,000 disciples across 950 churches, became the hinge that turned a megachurch insider into a microchurch evangelist.\n\nIn 2019, with about eighty disciples and partners Brian Johnson and Michelle Wegner, he founded Kansas City Underground: a mission agency and decentralized network of microchurches committed to filling Kansas City with the beauty, justice, and Good News of Jesus. The organization's forty-year horizon names 21,000 microchurches arising from 42,000 missionaries. He co-authored The Starfish and the Spirit (Zondervan, 2021) with Lance Ford and Alan Hirsch, with a foreword by Ori Brafman, and co-directs Microchurch NEXT at Exponential alongside Brian Johnson from Shawnee, Kansas.\n\nEight books span his bibliography, from Find Your Place (Exponential, 2018) through Extraordinary Prayer and Deeply Rooted (2024–25), while The Starfish and the Church podcast with Lance Ford and his Starfish Initiatives work with Alan Hirsch and Rich Robinson keep the decentralization conversation in the Exponential, NewThing, and Underground network orbit.",
    work: [
      { t: "Books", g: "The Starfish and the Spirit (with Lance Ford and Alan Hirsch, Zondervan, 2021), Missional Moves, Find Your Place, Extraordinary Prayer, Deeply Rooted." },
      { t: "Organizations", g: "Kansas City Underground, Microchurch NEXT (Exponential), NewThing Global Leadership Team, Starfish Initiatives." },
    ],
    connection:
      "Co-authored The Starfish and the Spirit with Alan Hirsch and Lance Ford, and bridges the Forge missional stream with Exponential and NewThing.",
    workSay: [
      "Rob founded KC Underground and co-wrote The Starfish and the Spirit with Alan Hirsch.",
      "He co-directs Microchurch NEXT at Exponential.",
    ],
    connectSay: [
      "He bridges Forge missional work and Exponential multiplication.",
      "Starfish decentralization is part of the network behind this path.",
    ],
    links: [],
  },
  6: {
    approved: true,
    lede: "Passion2Plant founder · Púlpito Fellows director",
    bio: "Liz Rios has carried thirty-five years of ministry across pastoring, planting, teaching, and consulting, and into networks that last. She founded Passion2Plant in 2020, the only national BIPOC-woman-led church planting network in the United States, and directs Púlpito Fellows, a three-year bilingual preaching fellowship funded by the Lilly Endowment and run in partnership with Urban Strategies.\n\nHer work runs simultaneously across denominational, academic, and movement spaces: ordained in the Christian Church (Disciples of Christ); adjunct faculty at Fuller Theological Seminary; board member at Sojourners; senior consultant with Lisa Sharon Harper's Freedom Road; consulting editor at Outreach Magazine since 2008; executive team member of the Latino Leadership Circle. She holds a BA, MA, EdD from Nova Southeastern, DMin from Southeastern, and a 2025 MA in Social Justice from Union Theological Seminary.\n\nShe writes from a mujerista frame, distinct in tone and theological voice from anyone else inside Movemental's circle, and contributes to 100 Movements Publishing's Need to Know alongside Alan Hirsch, Scot McKnight, and Jo Saxton. In October 2025 she became the only woman inducted into Palm Beach Atlantic University's inaugural Florida College of Preachers, and brings a live cohort operator's discipline to what a leader's platform actually has to carry.",
    work: [
      { t: "Books & writing", g: "Don't Buy The Lie (2012), Need to Know, contributor (100 Movements), Mujerista in Motion: Substack." },
      { t: "Organizations", g: "Passion2Plant, Púlpito Fellows, The Passion Center, adjunct at Fuller; board at Sojourners." },
    ],
    connection:
      "Contributed to 100 Movements’ Need to Know alongside Alan Hirsch and leads Passion2Plant, connected to the movement leaders and publishing orbit Movemental serves.",
    workSay: [
      "Liz leads Passion2Plant and directs the Púlpito Fellows preaching fellowship.",
      "Her mujerista theology rewrites church planting from the margins.",
    ],
    connectSay: [
      "She wrote for 100 Movements’ Need to Know alongside Alan Hirsch.",
      "Justice-focused planting is part of the network this path serves.",
    ],
    links: [],
  },
  7: {
    approved: true,
    lede: "Movements Director, Underground Network",
    bio: "Lucas Pulley has spent fourteen-plus years planting and multiplying decentralized church across two cities, first founding the Carbondale Movement while on InterVarsity staff at Southern Illinois University, then moving to Tampa to inherit Brian Sanders' seat at the Underground Network. Inside the 2024–25 restructuring he now carries the Movements Director lane on Underground's Executive Team alongside Joel Repic, supporting the 100+ Tampa microchurches and dozens of sister movements worldwide while still pastoring a neighborhood house church inside Tampa's subsidized housing projects with his wife Jami and their three kids.\n\nHis path runs unusually. A BA in Pure Mathematics from SIU Carbondale, a research stint at TU Braunschweig in Germany, then a Master of Global Leadership in Missions and Missiology from Fuller Theological Seminary, the mathematician is still visible in the pastor. His written corpus is lean and deliberately so: ten Medium essays, the prescient The Parable of the White Pastor on Missio Alliance, and a fifty-three-minute Underground Essentials session on Creedal Community. Across the Theology in the Raw, Shifting Culture, and Starfish and the Church podcasts he keeps returning to one line: cities transformed by the priesthood of all believers activated in the mission of God. The Hubology vocabulary he is building with Rob Wegner and Lance Ford runs through everything he teaches.",
    work: [
      {
        t: "Teaching",
        g: "The ecclesial minimum (worship, community, mission), Hubology / servant-equipper hubs, starfish-not-spider decentralization, and covocational microchurch networks.",
      },
      {
        t: "Organizations",
        g: "Tampa Underground (Movements Director), Underground Network executive team, Microchurch Conference faculty, and the Calling Lab.",
      },
    ],
    connection:
      "Movements Director for Tampa Underground's hundred-plus microchurches, in the same decentralized stream as Brian Sanders, Rob Wegner, and Lance Ford. When those voices cite each other, trust transfers the way it always has offline; Movemental makes that vouching visible.",
    workSay: [
      "Lucas directs movement for Tampa Underground's hundred-plus microchurches.",
      "He coined the ecclesial minimum, worship, community, mission as the irreducible church.",
      "Hubology names the servant-equipper hub that equips networks without consolidating power.",
    ],
    connectSay: [
      "Tampa Underground connects to Brian Sanders and the Forge microchurch stream.",
      "He's part of the Movement Voices network, linked to Rob Wegner, Lance Ford, and the starfish decentralization conversation.",
      "Decentralized planting is core to the scenius this path was built to host.",
    ],
    notableWorks: [
      {
        title: "The Parable of the White Pastor",
        line: "Missio Alliance, pastoral identity, race, and second-order power from inside subsidized housing.",
      },
      {
        title: "10 Thoughts After 10 Years of Planting & Directing Microchurch Networks",
        line: "Medium manifesto on starfish networks, the ecclesial minimum, and reproducible church forms.",
      },
      {
        title: "Hubology: Rise of the Servant Equippers",
        line: "The Starfish and the Church, with Rob Wegner and Lance Ford on hubs that equip rather than consolidate.",
      },
      {
        title: "Theology in the Raw #1022",
        line: "Preston Sprinkle, rethinking church through micro-churches as missional communities.",
      },
    ],
    pullQuote:
      "Your conversion is your commission, and the church is an extended spiritual family, not a service to attend.",
    links: [],
  },
  8: {
    approved: true,
    lede: "He founded Movemental, and builds the path itself.",
    bio: "Josh Shepherd came to this work from inside it, years as a Methodist pastor, then founding a neomonastic, communal nonprofit where he and his wife lived alongside young adults in extended residency, and from there began building the digital home for what comes next.",
    work: [
      { t: "Role", g: "Founder & CTO of Movemental." },
      { t: "Builds", g: "The four-stage path: Safety, Sandbox, Training, Technology, and the technology behind it." },
    ],
    connection:
      "Founder of Movemental. Josh began collaborating with Brad and Alan around a shared concern: that the AI moment would happen to mission-driven organizations rather than be navigated by them. Movemental took shape in 2026.",
    workSay: [
      "Josh founded Movemental and builds the path: Safety, Sandbox, Training, Technology.",
      "He came to it as a pastor first, building the tools from inside the practice.",
    ],
    connectSay: [
      "Founder of Movemental.",
      "He built this with Brad and Alan as Movemental took shape in 2026.",
    ],
    links: [],
  },
  9: {
    approved: true,
    lede: "Movement leaders · missional spirituality as one rhythm.",
    bio: "Jeremy and Monica Chambers hold intimacy with God and engagement with neighbors as one rhythm, not two stages. Kingdom Contours and The Art of Missional Spirituality bridge the Renovaré contemplative tradition and the Hirsch–Frost Forge stream, a seam most voices stay on one side of.",
    work: [
      { t: "Books", g: "Kingdom Contours and The Art of Missional Spirituality (100 Movements), co-authored with forewords from Alan Hirsch and Michael Frost." },
      { t: "Organizations", g: "Forge America (Training Director), The Pando Collective Denver, and Arise RVA." },
    ],
    connection:
      "Training Director for Forge America and 100 Movements authors, co-writing in the missional-spirituality seam Alan Hirsch, Debra Hirsch, and Michael Frost helped open.",
    workSay: [
      "Jeremy and Monica wrote Kingdom Contours and The Art of Missional Spirituality together.",
      "Jeremy directs training for Forge America nationally.",
    ],
    connectSay: [
      "Forge America connects them to Rowland Smith and the Forge pipeline.",
      "100 Movements publishing ties them to Alan Hirsch’s orbit.",
    ],
    links: [],
  },
  10: {
    approved: true,
    lede: "Movement leader · make heroes, not be one.",
    bio: "Dave Ferguson inverts the hero-pastor model: the mission of Jesus is multiplication, and the church advances by reproducing disciples, leaders, groups, churches, and networks. ICNU, “I see in you”, is the repeatable act at the center of Hero Maker, BLESS, and three decades at Community Christian Church and Exponential.",
    work: [
      { t: "Books", g: "Hero Maker, BLESS, Multiplier, The Big Idea, and nine-plus titles across Zondervan, WaterBrook, and Exponential." },
      { t: "Organizations", g: "Exponential, NewThing (now unified with Exponential), and Community Christian Church." },
    ],
    connection:
      "Leads Exponential and co-founded NewThing and Community Christian Church, in the multiplication conversation alongside the movement leaders who shaped this path.",
    workSay: [
      "Dave leads Exponential and wrote Hero Maker and BLESS.",
      "His 2025 succession at Community Christian lived the apprenticeship model he teaches.",
    ],
    connectSay: [
      "Exponential is the world’s largest church-planting conference.",
      "Multiplication frameworks connect him to the wider network behind Movemental.",
    ],
    links: [],
  },
  11: {
    approved: true,
    lede: "Movement leader · disciple-making in the city.",
    bio: "Dhati Lewis makes disciples who make disciples in the city and keeps the church in the city rather than fleeing it. He founded Blueprint Church in Atlanta, led Send Network, and now develops the next generation of urban leaders through BLVD and MyBLVD, with Advocates naming the narrow path of reconciliation.",
    work: [
      { t: "Books", g: "Among Wolves, Advocates, and In Plain Sight, disciple-making and reconciliation in the urban context." },
      { t: "Frameworks", g: "Advocate versus Aggravator, the eight movements, the seven stops of an urban missionary." },
    ],
    connection:
      "Former Send Network president, Rebuild Network founder, and author of Among Wolves, connected to NAMB, urban planting networks, and the movement leaders behind Movemental.",
    workSay: [
      "Dhati wrote Among Wolves and Advocates on urban disciple-making and reconciliation.",
      "He led Send Network before stepping back to mentor through BLVD.",
    ],
    connectSay: [
      "Rebuild Network and Send Network connect him to NAMB’s planting world.",
      "Urban missionary formation is part of the network this path serves.",
    ],
    links: [],
  },
  12: {
    approved: true,
    lede: "Movement leader · incarnational community and kingdom ecosystems.",
    bio: "Hugh Halter has spent more than thirty years in the missional movement, from Adullam in Denver to Lantern Network and Post Commons in Alton, Illinois. He co-directs Brave Cities, serves as national director of Missio, and has written seven books on incarnational community, kingdom ecosystems, and bi-vocational ministry.",
    work: [
      { t: "Books", g: "The Tangible Kingdom, AND, Sacrilege, Flesh, BIVO, Brave Cities, and the Life as Mission series." },
      { t: "Organizations", g: "Lantern Network, Post Commons, Brave Cities, Missio, and MCAP." },
    ],
    connection:
      "Co-founded Adullam in Denver and leads Missio and MCAP, a practitioner voice in the incarnational stream this network carries.",
    workSay: [
      "Hugh wrote The Tangible Kingdom and BIVO on incarnational and bi-vocational ministry.",
      "Post Commons and Lantern Network are kingdom-ecosystem experiments in Alton, Illinois.",
    ],
    connectSay: [
      "Missio and MCAP connect him to incarnational training nationally.",
      "Adullam and Forge sit in the same missional practitioner stream.",
    ],
    links: [],
  },
  13: {
    approved: true,
    lede: "Movement leader · Ephesiology and missiological theology of movement.",
    bio: "Michael Cooper theologizes movement itself, putting mission at the center of theology rather than off in an applied chapter. A decade planting in post-communist Romania and a doctorate on the Ephesian church-planting movement became Ephesiology and a seventeen-book corpus on disciple-making, Pauline leadership, and the archaeology of Asia Minor.",
    work: [
      { t: "Books", g: "Ephesiology, Make Disciples, Letters to Churches, Lead Like Paul, and the Asia Minor archaeology volumes." },
      { t: "Media & teaching", g: "The 227-episode Ephesiology Podcast, TELOS Master Classes, and affiliate teaching at Kairos University." },
    ],
    connection:
      "Author of Ephesiology with endorsements from Alan Hirsch, a scholar-practitioner in the missiological-theology conversation Movemental amplifies.",
    workSay: [
      "Michael coined Ephesiology and hosts a weekly podcast on it.",
      "Making disciples is the mandate; church planting is the result, that’s his recentering.",
    ],
    connectSay: [
      "Alan Hirsch endorsed Ephesiology beside The Forgotten Ways.",
      "Scholar-practitioner missiology is part of this network’s credibility.",
    ],
    links: [],
  },
  14: {
    approved: true,
    lede: "Movement leader · Hybrid Church between Sunday gathering and DMM.",
    bio: "Roy Moran bridges obedience-based, reproducible disciple-making and the classically trained Western senior pastor. Twenty-five years at Shoal Creek Community Church and apprenticeship under David Watson produced Spent Matches and Hybrid Church, a field manual for holding attractional gathering and multiplicative track in one body.",
    work: [
      { t: "Books", g: "Spent Matches and Hybrid Church: DMM practice for senior pastors in the West." },
      { t: "Organizations", g: "Mercy Alliance International, New Generations Platform role, and the Movement Conversations podcast." },
    ],
    connection:
      "Leads Mercy Alliance and serves New Generations, bridging Western senior pastors and Disciple-Making Movement practice in the multiplication network.",
    workSay: [
      "Roy wrote Hybrid Church after twenty-five years pastoring Shoal Creek.",
      "He hosts Movement Conversations, a sustained DMM podcast in English.",
    ],
    connectSay: [
      "Mercy Alliance and New Generations connect him to global DMM data.",
      "Hybrid Church bridges worlds the network behind Movemental spans.",
    ],
    links: [],
  },
  15: {
    approved: true,
    lede: "Movement leader · recover the first-century church for a post-Christian world.",
    bio: "Peyton Jones puts disciple-making before church-planting: if you devote yourself to making disciples, churches will inevitably be planted. Twelve years in Wales, NewBreed Training across North America, and Church Plantology and Discipology retrieve the apostolic pattern of Acts for planters reading their cities the way Paul read his.",
    work: [
      { t: "Books", g: "Church Zero, Reaching the Unreached (with Alan Hirsch), Church Plantology, and Discipology." },
      { t: "Organizations", g: "NewBreed Training (Jump School), Church Planter Podcast, and Calvary University faculty." },
    ],
    connection:
      "Co-authored Reaching the Unreached with Alan Hirsch and leads NewBreed Training, in the apostolic, disciple-making stream this path was built with.",
    workSay: [
      "Peyton co-wrote Reaching the Unreached with Alan Hirsch.",
      "Church Plantology is a best-selling planting textbook in the Exponential series.",
    ],
    connectSay: [
      "NewBreed Training forms planters across North America.",
      "Apostolic disciple-making connects him to Alan Hirsch’s orbit.",
    ],
    links: [],
  },
  16: {
    approved: true,
    lede: "Movement leader · read everything through the lens of Jesus.",
    bio: "Meghan Good recovers a better Christian story by teaching people to read Scripture through Jesus. Divine Gravity and The Bible Unwrapped expand “God looks like Jesus, and that changes everything” into a hermeneutic, an ecclesiology, and a theology of power, now as Resource Development Manager at Jesus Collective and chair of its international Theology Circle.",
    work: [
      { t: "Books", g: "The Bible Unwrapped (Outreach Resource of the Year) and Divine Gravity: Sparking a Movement." },
      { t: "Teaching", g: "The Reading Jesus daily video series, Anabaptist World columns, and AMBS Doctor of Ministry faculty." },
    ],
    connection:
      "Resource Development Manager at Jesus Collective and author of Divine Gravity, connected to the Christ-centered theology circle Movemental serves.",
    workSay: [
      "Meghan won the Frederick Buechner Award and wrote Divine Gravity.",
      "She chairs the Jesus Collective international Theology Circle.",
    ],
    connectSay: [
      "Jesus Collective connects her to a centered-set ecclesiology movement.",
      "Narrative theology and preaching depth are part of this network’s range.",
    ],
    links: [],
  },
};

/**
 * The single per-leader content seam (prototype `getProfile`). Returns the
 * approved record or `null` (the leader screen then shows an honest stub). This
 * is the one function AF-90 swaps for a retrieval/RAG call.
 */
export function getProfile(i: number): Profile | null {
  const p = PROFILES[i];
  return p && p.approved ? p : null;
}

/** Per-session corpus-enriched profiles, keyed by band index (INT-06). A
 *  module-level cache → opening the same leader twice never refetches; a full
 *  page reload starts a fresh session. */
const corpusCache = new Map<number, Profile | null>();

/**
 * INT-06 — the corpus-backed read behind the `getProfile` seam (stream mode).
 *
 * Resolves the band index → `corpus_slug` ({@link LEADER_CORPUS_SLUGS}), reads
 * the approved Supabase row via the {@link getCorpusProfile} server action, and
 * merges it over the local curated record under the **"enrich, curated wins"**
 * policy: the corpus supplies `bio` + `work[]` (source-backed), while the
 * editorial one-liners (`lede`, `connection`, `workSay`, `connectSay`) keep
 * their local curated values — never synthesized. No corpus slug, no row, or a
 * DB error all fall back to the local {@link getProfile} record (honest stub on
 * `null`). The sync `getProfile` stays the offline path, so **stub mode never
 * calls this** and stays zero-network.
 */
export async function getProfileAsync(i: number): Promise<Profile | null> {
  if (corpusCache.has(i)) return corpusCache.get(i) ?? null;

  const local = getProfile(i);
  const slug = LEADER_CORPUS_SLUGS[i] ?? null;
  if (!slug) {
    corpusCache.set(i, local);
    return local;
  }

  let result = local;
  try {
    const { getCorpusProfile } = await import("./get-corpus-profile");
    const patch = await getCorpusProfile(slug);
    if (patch) {
      result = local
        ? {
            ...local,
            ...(patch.bio ? { bio: patch.bio } : {}),
            ...(patch.work?.length ? { work: patch.work } : {}),
          }
        : {
            approved: true,
            lede: "",
            bio: patch.bio ?? "",
            work: patch.work ?? [],
            connection: "",
            workSay: [],
            connectSay: [],
            links: [],
          };
    }
  } catch {
    // Network/action failure → keep the local record (honest fallback).
  }

  corpusCache.set(i, result);
  return result;
}

/**
 * Build a small say-scene from grounded lines (prototype `sayScene`): clear the
 * ink, then say each non-empty line with a beat between. Used by the leader
 * scenes (AF-10).
 */
export function sayScene(lines: string[]): Scene {
  const acts: Scene = [{ clear: true }];
  (lines || []).forEach((t, idx) => {
    if (!t) return;
    acts.push({ say: t });
    if (idx < lines.length - 1) acts.push({ wait: 160 });
  });
  return acts;
}
