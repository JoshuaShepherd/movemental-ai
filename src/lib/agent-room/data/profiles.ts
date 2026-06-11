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
    lede: "Missional theologian — thirty years reactivating what’s latent in the Body.",
    bio: "Alan Hirsch is called to reactivate what’s already in the church — the apostolic, prophetic, evangelistic, shepherd, and teacher capacities buried under institution. For more than thirty years he has planted churches, trained leaders, and written the frameworks a generation now uses to think about movement, formation, and the recovery of mission.",
    work: [
      { t: "Books", g: "The Forgotten Ways, 5Q, The Permanent Revolution, ReJesus, On the Verge, and nine-plus titles with IVP and co-authors." },
      { t: "Organizations", g: "100Movements, Forge, Future Travelers, and the 5Q Collective — plus academic work at Fuller, Wheaton, George Fox, and Asbury." },
    ],
    connection:
      "Co-founder of Movemental. The decades of missional work he and Brad built — Forge, 100Movements, the Movement Leaders Collective — are exactly the credibility this path is made to keep legible.",
    workSay: [
      "Alan wrote much of the language the field uses — The Forgotten Ways, 5Q, APEST.",
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
    lede: "Missional strategist — sentness, multiplication, and co-vocational ministry.",
    bio: "Brad Brisco helps the church function as sent missionary people and equips leaders for church planting and co-vocational ministry. As Director of Multiplication Strategies at Send Network, co-founder of Forge Kansas City and Sentralized, and an eighteen-year college instructor, he forms practitioners whose work outlasts any single congregation.",
    work: [
      { t: "Books", g: "Missional Essentials, The Missional Quest, Next Door As It Is In Heaven, ReThink, and Covocational Church Planting." },
      { t: "In the field", g: "Send Network, Forge Kansas City, Sentralized Conference, and missionalchurchnetwork.com." },
    ],
    connection:
      "Co-founder of Movemental. Brad and Alan have written and trained alongside each other for decades; that shared body of work is one of the credibility nodes the network makes visible.",
    workSay: [
      "Brad’s work centers on sentness — and on bivocational ministry.",
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
    lede: "Practitioner-scholar — frameworks that let movement reproduce faithfully.",
    bio: "JR Woodward forms practitioners and names the architecture that lets the church move. Three decades of planting — from Virginia Tech to East Hollywood to the V3 Church Planting Movement nationally — and a Manchester Ph.D. are one vocation: working things out in the room, then writing them down so others can use them.",
    work: [
      { t: "Books", g: "Creating a Missional Culture, The Church as Movement (with Dan White Jr.), and The Scandal of Leadership." },
      { t: "Organizations", g: "V3 Church Planting Movement, Missio Alliance, Praxis Gathering, and the Solis Foundation." },
    ],
    connection:
      "National director of V3 and co-founder of Missio Alliance and the Praxis Gathering — connected to Alan Hirsch, Michael Frost, and the Forge stream Movemental sits inside.",
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
    lede: "Church-multiplication author — disciples who make disciples in the smallest unit.",
    bio: "Neil Cole recovers the church’s smallest reproducible cell and releases it to multiply. The Life Transformation Group — two or three people, Scripture, confession, prayer for the lost — carries the DNA of organic church from The Coffee Tavern through Cultivating a Life for God and Church 3.0.",
    work: [
      { t: "Books", g: "Organic Church, Church 3.0, Search & Rescue, Organic Leadership, Church Transfusion, Primal Fire, and more." },
      { t: "Organizations", g: "Starling Initiatives, 100 Movements (co-founded with Alan Hirsch), and Kairos Pacific University." },
    ],
    connection:
      "Co-founded 100 Movements with Alan Hirsch and sits in the organic-church conversation Movemental was built to serve — an elder voice whose work the path is meant to keep legible.",
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
    lede: "Forge America director — action-reflection discipleship in everyday mission.",
    bio: "Rowland Smith forms everyday missionaries by sending them out and reflecting with them. Action-reflection discipleship runs from his Fuller dissertation Missional Emergence through the Forge America cohort, Denver Seminary teaching, and Life Out Loud — practice first, then codify what you’ve lived.",
    work: [
      { t: "Books", g: "Life Out Loud (with Michael Frost) and Red Skies — fourteen voices on the church’s future." },
      { t: "Organizations", g: "Forge America (National Director), the Pando Collective, and Pulpit Rock Church." },
    ],
    connection:
      "National Director of Forge America and a 100 Movements author — in the same training pipeline as Alan Hirsch, Brian Sanders, and the practitioners Movemental connects.",
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
    lede: "Network co-founder — a missionary on every street, a microchurch in every network.",
    bio: "Rob Wegner mobilizes ordinary people into mission. After two decades at Granger Community Church he founded Kansas City Underground from eighty disciples — betting on 21,000 microchurches from 42,000 missionaries because the horizon is real, not a slogan.",
    work: [
      { t: "Books", g: "The Starfish and the Spirit (with Lance Ford and Alan Hirsch), Find Your Place, Missional Moves, Share the Well, and more." },
      { t: "Organizations", g: "KC Underground, Microchurch NEXT at Exponential, and the NewThing global leadership team." },
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
    lede: "Leader and author — preparing a pulpit the field was not built for.",
    bio: "Liz Rios retrains church planting from the margins so Latina, Black, and bivocational women of color don’t plant inside curricula written around assumptions that were never theirs. Passion2Plant and Púlpito Fellows carry thirty-five years of mujerista and barrio theology into the only national BIPOC-woman-led planting network.",
    work: [
      { t: "Books & writing", g: "Don’t Buy The Lie, Need to Know (100 Movements), Rhythms of Rest, and columns across Sojourners and Christianity Today." },
      { t: "Organizations", g: "Passion2Plant, Púlpito Fellows, The Passion Center, and adjunct faculty at Fuller." },
    ],
    connection:
      "Contributed to 100 Movements’ Need to Know alongside Alan Hirsch and leads Passion2Plant — connected to the movement leaders and publishing orbit Movemental serves.",
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
    lede: "Network leader — the ecclesial minimum and priesthood activated.",
    bio: "Lucas Pulley activates the priesthood of all believers through the smallest durable form of the church. Fifteen years planting in Tampa’s subsidized housing projects and serving as Movements Director on the Underground Network executive team, he cultivates extended spiritual families committed to Jesus’ leadership and a piece of God’s mission.",
    work: [
      { t: "Teaching", g: "The ecclesial minimum, starfish-not-spider decentralization, and covocational microchurch networks." },
      { t: "Organizations", g: "Tampa Underground (Movements Director), Microchurch Conference faculty, and the Calling Lab." },
    ],
    connection:
      "Movements Director on the Tampa Underground executive team — fifteen years in the decentralized microchurch stream Movemental was built with.",
    workSay: [
      "Lucas directs movement for Tampa Underground’s hundred-plus microchurches.",
      "He coined the ecclesial minimum as the irreducible unit of church.",
    ],
    connectSay: [
      "Tampa Underground connects to Brian Sanders and the Forge microchurch stream.",
      "Decentralized planting is core to the network behind this path.",
    ],
    notableWorks: [
      {
        title: "The Parable of the White Pastor",
        line: "Missio Alliance — pastoral identity, race, and privilege from inside subsidized housing.",
      },
      {
        title: "10 Thoughts After 10 Years of Planting & Directing Microchurch Networks",
        line: "Medium manifesto on starfish networks, the ecclesial minimum, and reproducible church forms.",
      },
      {
        title: "The Ecclesial Minimum",
        line: "Teaching frame — worship, community, and mission as the irreducible definition of church.",
      },
      {
        title: "Shifting Culture Ep. 175",
        line: "Podcast — cities transformed when the priesthood of all believers is activated.",
      },
    ],
    pullQuote:
      "Cities transformed by the priesthood of all believers activated in the mission of God.",
    links: [],
  },
  8: {
    approved: true,
    lede: "He founded Movemental, and builds the path itself.",
    bio: "Josh Shepherd came to this work from inside it — years as a Methodist pastor, then founding a neomonastic, communal nonprofit where he and his wife lived alongside young adults in extended residency — and from there began building the digital infrastructure for what comes next.",
    work: [
      { t: "Role", g: "Founder & CTO of Movemental." },
      { t: "Builds", g: "The four-stage path — Safety, Sandbox, Training, Tech — and the technology behind it." },
    ],
    connection:
      "Founder of Movemental. Josh began collaborating with Brad and Alan around a shared concern: that the AI moment would happen to mission-driven organizations rather than be navigated by them. Movemental took shape in 2026.",
    workSay: [
      "Josh founded Movemental and builds the path — Safety, Sandbox, Training, Tech.",
      "He came to it as a pastor first, building the infrastructure from inside the practice.",
    ],
    connectSay: [
      "Founder of Movemental.",
      "He built this with Brad and Alan as Movemental took shape in 2026.",
    ],
    links: [],
  },
  9: {
    approved: true,
    lede: "Movement leaders — missional spirituality as one integrated rhythm.",
    bio: "Jeremy and Monica Chambers hold intimacy with God and engagement with neighbors as one rhythm, not two stages. Kingdom Contours and The Art of Missional Spirituality bridge the Renovaré contemplative tradition and the Hirsch–Frost Forge stream — a seam most voices stay on one side of.",
    work: [
      { t: "Books", g: "Kingdom Contours and The Art of Missional Spirituality (100 Movements), co-authored with forewords from Alan Hirsch and Michael Frost." },
      { t: "Organizations", g: "Forge America (Training Director), The Pando Collective Denver, and Arise RVA." },
    ],
    connection:
      "Training Director for Forge America and 100 Movements authors — co-writing in the missional-spirituality seam Alan Hirsch, Debra Hirsch, and Michael Frost helped open.",
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
    lede: "Movement leader — make heroes, not be one.",
    bio: "Dave Ferguson inverts the hero-pastor model: the mission of Jesus is multiplication, and the church advances by reproducing disciples, leaders, groups, churches, and networks. ICNU — “I see in you” — is the repeatable act at the center of Hero Maker, BLESS, and three decades at Community Christian Church and Exponential.",
    work: [
      { t: "Books", g: "Hero Maker, BLESS, Multiplier, The Big Idea, and nine-plus titles across Zondervan, WaterBrook, and Exponential." },
      { t: "Organizations", g: "Exponential, NewThing (now unified with Exponential), and Community Christian Church." },
    ],
    connection:
      "Leads Exponential and co-founded NewThing and Community Christian Church — in the multiplication conversation alongside the movement leaders who shaped this path.",
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
    lede: "Movement leader — disciple-making in the city, leaders who stay in it.",
    bio: "Dhati Lewis makes disciples who make disciples in the city and keeps the church in the city rather than fleeing it. He founded Blueprint Church in Atlanta, led Send Network, and now develops the next generation of urban leaders through BLVD and MyBLVD — with Advocates naming the narrow path of reconciliation.",
    work: [
      { t: "Books", g: "Among Wolves, Advocates, and In Plain Sight — disciple-making and reconciliation in the urban context." },
      { t: "Frameworks", g: "Advocate versus Aggravator, the eight movements, the seven stops of an urban missionary." },
    ],
    connection:
      "Former Send Network president, Rebuild Network founder, and author of Among Wolves — connected to NAMB, urban planting networks, and the movement leaders behind Movemental.",
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
    lede: "Movement leader — incarnational community and kingdom ecosystems.",
    bio: "Hugh Halter has spent more than thirty years in the missional movement — from Adullam in Denver to Lantern Network and Post Commons in Alton, Illinois. He co-directs Brave Cities, serves as national director of Missio, and has written seven books on incarnational community, kingdom ecosystems, and bi-vocational ministry.",
    work: [
      { t: "Books", g: "The Tangible Kingdom, AND, Sacrilege, Flesh, BIVO, Brave Cities, and the Life as Mission series." },
      { t: "Organizations", g: "Lantern Network, Post Commons, Brave Cities, Missio, and MCAP." },
    ],
    connection:
      "Co-founded Adullam in Denver and leads Missio and MCAP — a practitioner voice in the incarnational stream this network carries.",
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
    lede: "Movement leader — Ephesiology and missiological theology of movement.",
    bio: "Michael Cooper theologizes movement itself — putting mission at the center of theology rather than off in an applied chapter. A decade planting in post-communist Romania and a doctorate on the Ephesian church-planting movement became Ephesiology and a seventeen-book corpus on disciple-making, Pauline leadership, and the archaeology of Asia Minor.",
    work: [
      { t: "Books", g: "Ephesiology, Make Disciples, Letters to Churches, Lead Like Paul, and the Asia Minor archaeology volumes." },
      { t: "Media & teaching", g: "The 227-episode Ephesiology Podcast, TELOS Master Classes, and affiliate teaching at Kairos University." },
    ],
    connection:
      "Author of Ephesiology with endorsements from Alan Hirsch — a scholar-practitioner in the missiological-theology conversation Movemental amplifies.",
    workSay: [
      "Michael coined Ephesiology and hosts a weekly podcast on it.",
      "Making disciples is the mandate; church planting is the result — that’s his recentering.",
    ],
    connectSay: [
      "Alan Hirsch endorsed Ephesiology beside The Forgotten Ways.",
      "Scholar-practitioner missiology is part of this network’s credibility.",
    ],
    links: [],
  },
  14: {
    approved: true,
    lede: "Movement leader — Hybrid Church between Sunday gathering and DMM.",
    bio: "Roy Moran bridges obedience-based, reproducible disciple-making and the classically trained Western senior pastor. Twenty-five years at Shoal Creek Community Church and apprenticeship under David Watson produced Spent Matches and Hybrid Church — a field manual for holding attractional gathering and multiplicative track in one body.",
    work: [
      { t: "Books", g: "Spent Matches and Hybrid Church — DMM practice for senior pastors in the West." },
      { t: "Organizations", g: "Mercy Alliance International, New Generations Platform role, and the Movement Conversations podcast." },
    ],
    connection:
      "Leads Mercy Alliance and serves New Generations — bridging Western senior pastors and Disciple-Making Movement practice in the multiplication network.",
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
    lede: "Movement leader — recover the first-century church for a post-Christian world.",
    bio: "Peyton Jones puts disciple-making before church-planting: if you devote yourself to making disciples, churches will inevitably be planted. Twelve years in Wales, NewBreed Training across North America, and Church Plantology and Discipology retrieve the apostolic pattern of Acts for planters reading their cities the way Paul read his.",
    work: [
      { t: "Books", g: "Church Zero, Reaching the Unreached (with Alan Hirsch), Church Plantology, and Discipology." },
      { t: "Organizations", g: "NewBreed Training (Jump School), Church Planter Podcast, and Calvary University faculty." },
    ],
    connection:
      "Co-authored Reaching the Unreached with Alan Hirsch and leads NewBreed Training — in the apostolic, disciple-making stream this path was built with.",
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
    lede: "Movement leader — read everything through the lens of Jesus.",
    bio: "Meghan Good recovers a better Christian story by teaching people to read Scripture through Jesus. Divine Gravity and The Bible Unwrapped expand “God looks like Jesus, and that changes everything” into a hermeneutic, an ecclesiology, and a theology of power — now as Resource Development Manager at Jesus Collective and chair of its international Theology Circle.",
    work: [
      { t: "Books", g: "The Bible Unwrapped (Outreach Resource of the Year) and Divine Gravity: Sparking a Movement." },
      { t: "Teaching", g: "The Reading Jesus daily video series, Anabaptist World columns, and AMBS Doctor of Ministry faculty." },
    ],
    connection:
      "Resource Development Manager at Jesus Collective and author of Divine Gravity — connected to the Christ-centered theology circle Movemental serves.",
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
