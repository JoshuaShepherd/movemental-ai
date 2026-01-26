import { Metadata } from 'next'
import { NetworkDiscoveryContainer } from '@/components/network-discovery'

export const metadata: Metadata = {
  title: 'Network | Movemental',
  description: 'Discover and connect with movement leaders in the Movemental network.',
}

const CATEGORIES = [
  { id: 'authors', name: 'Authors & Writers', color: '#10b981', count: 24 },
  { id: 'speakers', name: 'Speakers', color: '#f59e0b', count: 18 },
  { id: 'practitioners', name: 'Practitioners', color: '#3b82f6', count: 32 },
  { id: 'trainers', name: 'Trainers & Coaches', color: '#8b5cf6', count: 15 },
  { id: 'researchers', name: 'Researchers', color: '#ec4899', count: 9 },
  { id: 'community', name: 'Community Leaders', color: '#14b8a6', count: 27 },
]

const TAGS = [
  { id: 'yoga', name: 'Yoga' },
  { id: 'meditation', name: 'Meditation' },
  { id: 'breathwork', name: 'Breathwork' },
  { id: 'fitness', name: 'Fitness' },
  { id: 'nutrition', name: 'Nutrition' },
  { id: 'mindfulness', name: 'Mindfulness' },
  { id: 'wellness', name: 'Wellness' },
  { id: 'coaching', name: 'Coaching' },
]

const PROFILES = [
  { 
    id: '1', 
    name: 'Alan Hirsch', 
    role: 'Movement Catalyst', 
    organization: 'Forge International', 
    bio: 'Author, thought leader, and catalyst for missional movements worldwide.',
    followerCount: 12500,
    categoryIds: ['authors', 'speakers'],
    tagIds: ['mindfulness', 'coaching'],
    badge: { id: 'b1', name: 'Book Author', type: 'author' as const },
    profileUrl: '/profile/alan-hirsch',
  },
  { 
    id: '2', 
    name: 'Michael Frost', 
    role: 'Theologian', 
    organization: 'Morling College', 
    bio: 'Missiologist and author exploring incarnational mission and the future of wellness.',
    followerCount: 8700,
    categoryIds: ['researchers', 'authors'],
    tagIds: ['meditation', 'wellness'],
    badge: { id: 'b2', name: 'Verified', type: 'verified' as const },
    profileUrl: '/profile/michael-frost',
  },
  { 
    id: '3', 
    name: 'Deb Hirsch', 
    role: 'Author', 
    organization: 'Forge International', 
    bio: 'Speaker and writer on spiritual formation and community wellness practices.',
    followerCount: 6200,
    categoryIds: ['authors', 'speakers'],
    tagIds: ['yoga', 'mindfulness'],
    badge: { id: 'b3', name: 'Book Author', type: 'author' as const },
    profileUrl: '/profile/deb-hirsch',
  },
  { 
    id: '4', 
    name: 'Sarah Chen', 
    role: 'Yoga Instructor', 
    organization: 'Flow Studios', 
    bio: 'Certified yoga instructor specializing in vinyasa and restorative practices.',
    followerCount: 4500,
    categoryIds: ['practitioners', 'trainers'],
    tagIds: ['yoga', 'breathwork'],
    profileUrl: '/profile/sarah-chen',
  },
  { 
    id: '5', 
    name: 'Marcus Williams', 
    role: 'Breathwork Coach', 
    organization: 'Breath Academy', 
    bio: 'Helping individuals unlock their potential through conscious breathing techniques.',
    followerCount: 3200,
    categoryIds: ['trainers', 'practitioners'],
    tagIds: ['breathwork', 'meditation'],
    profileUrl: '/profile/marcus-williams',
  },
  { 
    id: '6', 
    name: 'Elena Rodriguez', 
    role: 'Nutrition Coach', 
    organization: 'Whole Life Wellness', 
    bio: 'Integrative nutrition specialist focused on sustainable lifestyle changes.',
    followerCount: 5100,
    categoryIds: ['trainers', 'practitioners'],
    tagIds: ['nutrition', 'wellness'],
    badge: { id: 'b4', name: 'Expert', type: 'expert' as const },
    profileUrl: '/profile/elena-rodriguez',
  },
  { 
    id: '7', 
    name: 'James Park', 
    role: 'Fitness Coach', 
    organization: 'Movement Lab', 
    bio: 'Functional movement specialist helping people move better and feel stronger.',
    followerCount: 7800,
    categoryIds: ['trainers', 'practitioners'],
    tagIds: ['fitness', 'coaching'],
    profileUrl: '/profile/james-park',
  },
  { 
    id: '8', 
    name: 'Dr. Lisa Thompson', 
    role: 'Wellness Researcher', 
    organization: 'Stanford University', 
    bio: 'Researching the intersection of mindfulness practices and cognitive performance.',
    followerCount: 9200,
    categoryIds: ['researchers'],
    tagIds: ['mindfulness', 'meditation', 'wellness'],
    badge: { id: 'b5', name: 'Verified', type: 'verified' as const },
    profileUrl: '/profile/lisa-thompson',
  },
  { 
    id: '9', 
    name: 'David Kim', 
    role: 'Community Builder', 
    organization: 'Wellness Collective', 
    bio: 'Building thriving wellness communities through connection and shared practice.',
    followerCount: 2800,
    categoryIds: ['community'],
    tagIds: ['wellness', 'coaching'],
    profileUrl: '/profile/david-kim',
  },
]

export default function NetworkPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <NetworkDiscoveryContainer
          categories={CATEGORIES}
          tags={TAGS}
          profiles={PROFILES}
          showVisualization={true}
        />
      </div>
      
      {/* Join CTA */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Join the Network
          </h2>
          <p className="text-muted-foreground mb-8">
            Connect with movement leaders, amplify your reach, and collaborate 
            on content that moves.
          </p>
          <a
            href="/fit-check"
            className="inline-flex items-center justify-center h-12 px-6 font-semibold bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Check Your Fit
          </a>
        </div>
      </section>
    </div>
  )
}
