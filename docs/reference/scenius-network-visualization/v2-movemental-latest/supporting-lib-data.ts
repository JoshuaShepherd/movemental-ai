export type Leader = {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  topics: string[];
  themes: string[];
  connections: string[]; // IDs of other leaders
  books: { slug: string; title: string; year: string; coverUrl: string }[];
  organization?: string;
};

export type Topic = {
  slug: string;
  name: string;
  description: string;
  leaderCount: number;
  contentCount: number;
};

export type Theme = {
  slug: string;
  name: string;
  description: string;
  fullDescription: string;
  leaderCount: number;
};

export type BookChapter = {
  id: string;
  part: string;
  number: number;
  title: string;
  description: string;
  content?: string;
};

export const aiBookChapters: BookChapter[] = [
  { id: '1', part: 'Part 1: The Landscape', number: 1, title: 'The Attention Economy vs. The Kingdom', description: 'Why the current digital landscape is hostile to deep formation.' },
  { id: '2', part: 'Part 1: The Landscape', number: 2, title: 'The Promise and Peril of AI', description: 'Understanding what AI actually is, beyond the hype and fear.' },
  { id: '3', part: 'Part 2: The Philosophy', number: 3, title: 'AI Assists, Humans Retain', description: 'The core philosophy of Movemental: mechanics vs. meaning.' },
  { id: '4', part: 'Part 2: The Philosophy', number: 4, title: 'The Voice is Sacred', description: 'Why we never use your content to train models.' },
  { id: '5', part: 'Part 3: The Architecture', number: 5, title: 'Structuring the Unstructured', description: 'How we turn sermons and essays into a compounding library.' },
  { id: '6', part: 'Part 3: The Architecture', number: 6, title: 'The Credibility Graph', description: 'Mapping the connections between movement leaders.' },
  { id: '7', part: 'Part 4: The Practice', number: 7, title: 'Workflows for the Overwhelmed', description: 'Practical examples of AI serving pastoral workflows.' },
  { id: '8', part: 'Part 5: The Future', number: 8, title: 'Beyond the Algorithm', description: 'Building platforms that outlast the current tech cycle.' },
];

export const topics: Topic[] = [
  { slug: 'formation', name: 'Formation', description: 'Spiritual and character development.', leaderCount: 12, contentCount: 45 },
  { slug: 'leadership', name: 'Leadership', description: 'Guiding organizations and movements.', leaderCount: 18, contentCount: 62 },
  { slug: 'psychology', name: 'Psychology', description: 'Understanding the human mind and behavior.', leaderCount: 8, contentCount: 24 },
  { slug: 'movement', name: 'Movement', description: 'Catalyzing and sustaining decentralized growth.', leaderCount: 15, contentCount: 51 },
  { slug: 'theology', name: 'Theology', description: 'The study of the nature of God and religious belief.', leaderCount: 22, contentCount: 89 },
  { slug: 'creativity', name: 'Creativity', description: 'Innovation, art, and expression.', leaderCount: 10, contentCount: 33 },
  { slug: 'justice', name: 'Justice', description: 'Advocating for equity and systemic change.', leaderCount: 14, contentCount: 48 },
  { slug: 'worship', name: 'Worship', description: 'Liturgical and contemporary expressions of faith.', leaderCount: 9, contentCount: 27 },
];

export const themes: Theme[] = [
  { 
    slug: 'missional-church', 
    name: 'Missional Church', 
    description: 'Reorienting the church around its sent nature.',
    fullDescription: 'The missional church framework represents a paradigm shift from viewing the church as a destination where people come to receive religious goods and services, to understanding the church as a sent community. It emphasizes that mission is not just a program of the church, but the very nature of God (missio Dei). Leaders in this theme explore how to incarnate the gospel in local contexts, dismantle consumerist religion, and equip everyday believers to be agents of renewal in their neighborhoods and workplaces.',
    leaderCount: 15 
  },
  { 
    slug: 'apest', 
    name: 'APEST', 
    description: 'The fivefold ministry framework from Ephesians 4.',
    fullDescription: 'APEST is an acronym for Apostles, Prophets, Evangelists, Shepherds, and Teachers. This theme explores the recovery of this fivefold ministry framework as essential for the maturity and expansion of the church. Rather than relying solely on the pastor-teacher model, APEST advocates for a polycentric leadership structure that activates all five callings. Leaders here write about how to identify, develop, and deploy these diverse gifts to create dynamic, movemental organizations.',
    leaderCount: 12 
  },
  { 
    slug: 'kingdom-mission', 
    name: 'Kingdom Mission', 
    description: 'Integrating evangelism and justice in the world.',
    fullDescription: 'Kingdom Mission moves beyond the false dichotomy of saving souls versus transforming society. It embraces a holistic understanding of the gospel where the reign of God impacts every sphere of life—spiritual, social, economic, and cultural. Leaders associated with this theme often work at the intersection of church planting, community development, and systemic justice, demonstrating what it looks like when the kingdom comes "on earth as it is in heaven."',
    leaderCount: 18 
  },
  { 
    slug: 'spiritual-formation', 
    name: 'Spiritual Formation', 
    description: 'The intentional process of being conformed to the image of Christ.',
    fullDescription: 'Spiritual Formation focuses on the deep, often slow work of character transformation. It pushes back against quick-fix spirituality and emphasizes practices, rhythms, and disciplines that shape the inner life. Leaders in this theme draw from ancient traditions, modern psychology, and neuroscience to help individuals and communities navigate suffering, cultivate emotional health, and develop a resilient faith that sustains long-term leadership.',
    leaderCount: 20 
  },
];

export const leaders: Leader[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    role: 'Theologian & Author',
    bio: 'Dr. Sarah Chen is a leading voice at the intersection of systematic theology and cultural anthropology. Her work focuses on how ancient texts speak to modern crises of meaning.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800&h=800',
    topics: ['theology', 'culture'],
    themes: ['kingdom-mission'],
    connections: ['2', '4'],
    organization: 'Center for Public Theology',
    books: [
      { slug: 'the-meaning-crisis', title: 'The Meaning Crisis', year: '2023', coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400&h=600' }
    ]
  },
  {
    id: '2',
    name: 'Marcus Weaver',
    role: 'Movement Practitioner',
    bio: 'Marcus Weaver has spent two decades catalyzing decentralized movements in urban contexts. He writes about polycentric leadership and network dynamics.',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800&h=800',
    topics: ['movement', 'leadership'],
    themes: ['apest', 'missional-church'],
    connections: ['1', '3', '5'],
    organization: 'Urban Catalyst Network',
    books: [
      { slug: 'decentralized', title: 'Decentralized', year: '2021', coverUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400&h=600' },
      { slug: 'the-polycentric-church', title: 'The Polycentric Church', year: '2024', coverUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400&h=600' }
    ]
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    role: 'Author & Psychologist',
    bio: 'Elena integrates clinical psychology with spiritual formation, helping leaders navigate burnout, trauma, and the emotional weight of movement leadership.',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800&h=800',
    topics: ['psychology', 'formation'],
    themes: ['spiritual-formation'],
    connections: ['2', '4'],
    books: [
      { slug: 'leading-from-the-deep', title: 'Leading from the Deep', year: '2022', coverUrl: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&q=80&w=400&h=600' }
    ]
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Academic & Practitioner',
    bio: 'David bridges the gap between the academy and the streets, focusing on systemic justice and the theology of the city.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800&h=800',
    topics: ['justice', 'theology'],
    themes: ['kingdom-mission', 'missional-church'],
    connections: ['1', '3'],
    organization: 'Institute for Urban Justice',
    books: [
      { slug: 'city-of-god-city-of-man', title: 'City of God, City of Man', year: '2020', coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400&h=600' }
    ]
  },
  {
    id: '5',
    name: 'Aisha Johnson',
    role: 'Creative Director',
    bio: 'Aisha explores the intersection of liturgy, art, and embodied worship. She designs experiences that form communities through beauty.',
    imageUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?auto=format&fit=crop&q=80&w=800&h=800',
    topics: ['creativity', 'worship'],
    themes: ['spiritual-formation'],
    connections: ['2'],
    books: []
  },
  {
    id: '6',
    name: 'Dr. James Harrison',
    role: 'Theologian',
    bio: 'Focusing on historical theology and its implications for modern ecclesiology.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800&h=800',
    topics: ['theology'],
    themes: ['missional-church'],
    connections: ['1'],
    books: []
  }
];
