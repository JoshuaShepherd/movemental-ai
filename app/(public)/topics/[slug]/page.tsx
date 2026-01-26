import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { TopicHubContainer } from '@/components/topic-hub'

// Sample topics data - in production this would come from database
const TOPICS_DATA: Record<string, {
  title: string
  slug: string
  description: string
  icon: string
  color: string
  articleCount: number
  contributorCount: number
}> = {
  formation: {
    title: 'Formation & Discipleship',
    slug: 'formation',
    description: 'Exploring the intersection of faith, psychology, and human formation. Discover practices, frameworks, and wisdom for personal and spiritual transformation.',
    icon: '🌱',
    color: 'green',
    articleCount: 142,
    contributorCount: 28,
  },
  leadership: {
    title: 'Leadership',
    slug: 'leadership',
    description: 'Church leadership, organizational development, and team building for movement leaders seeking to multiply impact.',
    icon: '🎯',
    color: 'blue',
    articleCount: 198,
    contributorCount: 45,
  },
  psychology: {
    title: 'Psychology & Soul Care',
    slug: 'psychology',
    description: 'Integration of psychology, faith, and emotional health. Resources for understanding the human soul and caring for others.',
    icon: '🧠',
    color: 'purple',
    articleCount: 89,
    contributorCount: 18,
  },
  movement: {
    title: 'Movement & Mission',
    slug: 'movement',
    description: 'Missional living, church planting, and movement multiplication. Strategies and stories of Kingdom advancement.',
    icon: '🔥',
    color: 'orange',
    articleCount: 167,
    contributorCount: 34,
  },
  theology: {
    title: 'Theology',
    slug: 'theology',
    description: 'Biblical theology, doctrine, and theological reflection for thoughtful practitioners.',
    icon: '📖',
    color: 'indigo',
    articleCount: 234,
    contributorCount: 52,
  },
  creativity: {
    title: 'Creativity & Culture',
    slug: 'creativity',
    description: 'Art, creativity, and cultural engagement. Exploring the intersection of faith and creative expression.',
    icon: '🎨',
    color: 'purple',
    articleCount: 67,
    contributorCount: 15,
  },
  justice: {
    title: 'Justice & Reconciliation',
    slug: 'justice',
    description: 'Social justice, racial reconciliation, and community transformation. Building a more just world.',
    icon: '⚖️',
    color: 'orange',
    articleCount: 78,
    contributorCount: 21,
  },
  worship: {
    title: 'Worship & Liturgy',
    slug: 'worship',
    description: 'Worship practices, liturgical renewal, and sacred arts. Cultivating transformative worship experiences.',
    icon: '🙏',
    color: 'teal',
    articleCount: 56,
    contributorCount: 12,
  },
}

// Sample featured content
const SAMPLE_CONTENT = [
  {
    type: 'article' as const,
    title: 'The Formation Crisis: Why Spiritual Formation Matters More Than Ever',
    slug: 'formation-crisis',
    image: '/api/placeholder/400/250',
    author: { name: 'Mindy Caliguire' },
    metadata: '8 min read',
  },
  {
    type: 'book' as const,
    title: 'The Forgotten Ways: Reactivating Apostolic Movements',
    slug: 'forgotten-ways',
    image: '/api/placeholder/400/250',
    author: { name: 'Alan Hirsch' },
    metadata: '14 chapters',
  },
  {
    type: 'course' as const,
    title: 'APEST Leadership Assessment & Development',
    slug: 'apest-course',
    image: '/api/placeholder/400/250',
    author: { name: 'Alan Hirsch' },
    metadata: '6 modules',
  },
  {
    type: 'article' as const,
    title: 'Practices for Everyday Formation',
    slug: 'everyday-formation',
    image: '/api/placeholder/400/250',
    author: { name: 'Tim Keel' },
    metadata: '12 min read',
  },
  {
    type: 'video' as const,
    title: 'The Art of Soul Care',
    slug: 'art-of-soul-care',
    image: '/api/placeholder/400/250',
    author: { name: 'Mandy Smith' },
    metadata: '45 min',
  },
  {
    type: 'article' as const,
    title: 'Network Effects in Kingdom Work',
    slug: 'network-effects',
    image: '/api/placeholder/400/250',
    author: { name: 'Scott Shepherd' },
    metadata: '10 min read',
  },
]

// Sample contributors
const SAMPLE_CONTRIBUTORS = [
  { name: 'Alan Hirsch', slug: 'alan-hirsch', avatar: '/api/placeholder/64/64', pieceCount: 23 },
  { name: 'Mindy Caliguire', slug: 'mindy-caliguire', avatar: '/api/placeholder/64/64', pieceCount: 15 },
  { name: 'Tim Keel', slug: 'tim-keel', avatar: '/api/placeholder/64/64', pieceCount: 12 },
  { name: 'Mandy Smith', slug: 'mandy-smith', avatar: '/api/placeholder/64/64', pieceCount: 8 },
  { name: 'Michael Frost', slug: 'michael-frost', avatar: '/api/placeholder/64/64', pieceCount: 19 },
  { name: 'Hugh Halter', slug: 'hugh-halter', avatar: '/api/placeholder/64/64', pieceCount: 11 },
]

// Related topics mapping
const RELATED_TOPICS: Record<string, { title: string; slug: string; icon: string }[]> = {
  formation: [
    { title: 'Psychology & Soul Care', slug: 'psychology', icon: '🧠' },
    { title: 'Theology', slug: 'theology', icon: '📖' },
    { title: 'Worship & Liturgy', slug: 'worship', icon: '🙏' },
  ],
  leadership: [
    { title: 'Movement & Mission', slug: 'movement', icon: '🔥' },
    { title: 'Formation & Discipleship', slug: 'formation', icon: '🌱' },
    { title: 'Theology', slug: 'theology', icon: '📖' },
  ],
  psychology: [
    { title: 'Formation & Discipleship', slug: 'formation', icon: '🌱' },
    { title: 'Theology', slug: 'theology', icon: '📖' },
    { title: 'Justice & Reconciliation', slug: 'justice', icon: '⚖️' },
  ],
  movement: [
    { title: 'Leadership', slug: 'leadership', icon: '🎯' },
    { title: 'Theology', slug: 'theology', icon: '📖' },
    { title: 'Justice & Reconciliation', slug: 'justice', icon: '⚖️' },
  ],
  theology: [
    { title: 'Formation & Discipleship', slug: 'formation', icon: '🌱' },
    { title: 'Worship & Liturgy', slug: 'worship', icon: '🙏' },
    { title: 'Movement & Mission', slug: 'movement', icon: '🔥' },
  ],
  creativity: [
    { title: 'Worship & Liturgy', slug: 'worship', icon: '🙏' },
    { title: 'Theology', slug: 'theology', icon: '📖' },
    { title: 'Formation & Discipleship', slug: 'formation', icon: '🌱' },
  ],
  justice: [
    { title: 'Movement & Mission', slug: 'movement', icon: '🔥' },
    { title: 'Theology', slug: 'theology', icon: '📖' },
    { title: 'Leadership', slug: 'leadership', icon: '🎯' },
  ],
  worship: [
    { title: 'Creativity & Culture', slug: 'creativity', icon: '🎨' },
    { title: 'Theology', slug: 'theology', icon: '📖' },
    { title: 'Formation & Discipleship', slug: 'formation', icon: '🌱' },
  ],
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const topic = TOPICS_DATA[slug]
  
  if (!topic) {
    return {
      title: 'Topic Not Found | Movemental',
    }
  }

  return {
    title: `${topic.title} | Movemental`,
    description: topic.description,
  }
}

export default async function TopicHubPage({ params }: PageProps) {
  const { slug } = await params
  const topic = TOPICS_DATA[slug]

  if (!topic) {
    notFound()
  }

  const relatedTopics = RELATED_TOPICS[slug] || []
  const stats = {
    totalPieces: topic.articleCount,
    contributors: topic.contributorCount,
    thisMonth: Math.floor(topic.articleCount * 0.1),
    trending: topic.articleCount > 100,
  }

  return (
    <TopicHubContainer
      topic={topic}
      featuredContent={SAMPLE_CONTENT}
      contributors={SAMPLE_CONTRIBUTORS}
      relatedTopics={relatedTopics}
      stats={stats}
    />
  )
}
