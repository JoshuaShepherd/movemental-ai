import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { EReaderContainer } from '@/components/e-reader'

// Sample book content - in production this would come from database/CMS
const BOOK_CONTENT: Record<string, {
  title: string
  slug: string
  chapters: {
    number: number
    title: string
    slug: string
    content: string
  }[]
}> = {
  'knowledge-spine': {
    title: 'The Knowledge Spine',
    slug: 'knowledge-spine',
    chapters: [
      {
        number: 1,
        title: 'The Problem Nobody Talks About',
        slug: 'ch-1',
        content: `The movement leader stands at a crossroads that few understand.

For decades, the path seemed clear: write a book, build an audience, speak at conferences, and watch your influence grow. The traditional publishing gatekeepers—those who decided whose voice deserved amplification—created a system that, for all its flaws, provided a kind of structure.

But that system is collapsing.

The collapse isn't gradual. It's accelerating. And what's replacing it isn't what most movement leaders expected.

Consider the numbers: movement leaders who go through traditional publishing retain, on average, 10-15% of the revenue their content generates. The rest goes to publishers, distributors, retailers, and the vast machinery of traditional media.

For a book that sells 50,000 copies at $20 retail, the author might see $2-3 per book. That's $100,000-$150,000—a meaningful sum, certainly, but a fraction of the $1,000,000 the book generated.

Where does the rest go? To intermediaries. To systems. To structures that were built for a different era.

The problem isn't that these intermediaries provide no value. They do. Editing, design, distribution, marketing—these are real services that require real expertise.

The problem is that the value equation has shifted. The technology now exists for movement leaders to own their platforms, control their distribution, and retain the vast majority of their revenue while still accessing world-class services.

But most movement leaders don't know this. Or if they know it intellectually, they don't know how to make it real.

This book is about making it real.`,
      },
      {
        number: 2,
        title: 'Why This Is a Structural Problem',
        slug: 'ch-2',
        content: `Understanding why things are the way they are requires understanding how they got this way.

The traditional publishing model emerged from scarcity. Printing presses were expensive. Distribution networks were complex. Retail relationships required decades to build. Marketing at scale required institutional resources.

In that world, the publisher's cut made sense. They were providing access to machinery that individuals couldn't replicate.

But here's what changed: the machinery became accessible.

Print-on-demand eliminated the need for inventory and upfront printing costs. Digital distribution made global reach possible for anyone. Content management systems made beautiful websites accessible to non-technical users. Email marketing tools created direct audience relationships.

What didn't change—or changed much more slowly—was the mental model.

Movement leaders continued to think they needed traditional publishers because that's what serious authors did. They continued to give away 85-90% of their revenue because that's what the contracts said. They continued to build on rented platforms because that's where the audience was.

The structural problem isn't technological. The technology has been available for years. The structural problem is conceptual.

Movement leaders have been trained to think of themselves as content creators who need platforms. They haven't been trained to think of themselves as platform owners who create content.

That distinction matters more than almost any other.

When you're a content creator seeking a platform, you're always dependent on someone else's rules, someone else's algorithms, someone else's priorities. You're always one policy change away from losing everything you've built.

When you're a platform owner who creates content, you control your destiny. Your audience belongs to you. Your revenue belongs to you. Your future belongs to you.

This isn't about ego or independence for its own sake. It's about sustainability. It's about building something that can outlast the whims of venture-backed platforms and traditional publishers.

It's about structural freedom.`,
      },
      {
        number: 3,
        title: 'What Changed',
        slug: 'ch-3',
        content: `The shift happened gradually, then suddenly.

For years, the components were assembling. WordPress made website creation accessible. Stripe made payment processing simple. Email services made direct communication scalable. Social media made audience building possible.

But these were pieces without a puzzle. Movement leaders could use them individually, but integration was complex, technical, and time-consuming.

Then the puzzle came together.

Modern platform tools now allow non-technical users to build sophisticated digital operations that would have required a team of developers just five years ago. The technology stack that powers multi-million dollar media companies is now accessible to individuals.

But technology availability is only part of what changed.

The bigger shift was in audience expectations and behavior.

Audiences increasingly expect direct relationships with creators. They're willing to pay for access, for depth, for community. They're tired of algorithmic feeds and platform-mediated experiences.

This shift creates an opportunity that didn't exist before: audiences actually want what platform ownership enables. They want the direct relationship. They want the depth. They want the community.

The third change was economic. The creator economy—once a novelty—became a category. Investors, platforms, and institutions recognized that individual creators could build meaningful businesses around their expertise and audience.

This recognition brought resources, tools, and legitimacy to what was once considered a fringe approach.

For movement leaders, this convergence creates an unprecedented opportunity. The technology is ready. The audience is ready. The economic infrastructure is ready.

What's often missing is the knowledge of how to bring it all together.

That's what this book provides.`,
      },
      {
        number: 4,
        title: 'Platform Ownership',
        slug: 'ch-4',
        content: `Platform ownership isn't a technical concept. It's a philosophical one.

When you own your platform, you own the relationship with your audience. You own the data about who they are and what they want. You own the ability to reach them without intermediaries.

When you rent a platform, you own none of these things.

Consider the difference:

On a rented platform like social media, your content reaches your audience through an algorithm you don't control. That algorithm can change at any time, for any reason, and you have no recourse. Your "followers" aren't really yours—they're the platform's users who have expressed interest in your content. The platform can change the rules, throttle your reach, or remove you entirely.

On an owned platform, you control the relationship. When someone joins your email list, they're giving you direct permission to communicate with them. When they purchase your content, you have a direct commercial relationship. When they join your community, you set the rules and norms.

This isn't about isolating yourself from other platforms. Social media, podcasts, and traditional media all have value for distribution and discovery. But they should be channels that feed your owned platform, not substitutes for it.

The financial implications are significant. On most platforms, you retain 100% of the revenue minus transaction fees (typically 3-5%). Compare that to the 10-15% typical of traditional publishing or the 50-70% typical of marketplace platforms.

But the strategic implications are even more significant. When you own your platform, you can experiment, iterate, and evolve without asking permission. You can serve your audience the way you believe is best, not the way an algorithm rewards.

Platform ownership is the foundation of sustainable movement leadership in the digital age.`,
      },
      {
        number: 5,
        title: 'Network Effects',
        slug: 'ch-5',
        content: `Platform ownership solves one problem—dependence on intermediaries. But it creates another: isolation.

A single platform, no matter how well-built, has limited reach. The movement leader on their own platform can retain more revenue, but may reach fewer people. The math might not favor ownership if it means obscurity.

This is where network effects come in.

Network effects occur when a platform becomes more valuable as more people use it. Social media platforms have strong network effects—Facebook became valuable precisely because everyone else was already there.

Movement leaders can create network effects by connecting their platforms. When multiple leaders point to and reference each other, when their audiences overlap and discover new voices, when their content creates conversations across platforms—the whole becomes greater than the sum of its parts.

This is the Movemental model.

Individual leaders maintain ownership of their platforms, audiences, and revenue. But they participate in a network that creates discovery, cross-pollination, and collective authority.

The numbers are striking. A leader on an isolated platform might reach 1,000 people. That same leader participating in a network might reach 28,000—or more. The amplification comes not from giving up ownership, but from strategic connection.

Network effects also compound over time. As the network grows, each new participant benefits from—and contributes to—the collective reach. Early participants benefit most as the network matures.

This creates alignment between individual interests and collective success. When the network thrives, everyone thrives. When one leader creates something remarkable, the entire network benefits from the attention and credibility.

Network effects transform platform ownership from a potentially isolating choice to a strategically superior one.`,
      },
      {
        number: 6,
        title: 'Content That Moves',
        slug: 'ch-6',
        content: `Everything so far has been about structure—ownership, networks, technology. But structure without substance is empty.

The movement leader's ultimate responsibility isn't to own a platform or participate in a network. It's to create content that moves—content that catalyzes lasting change in the people who encounter it.

This is harder than it sounds.

The digital environment rewards certain types of content: hot takes, controversy, outrage, novelty. Algorithms are optimized for engagement, not transformation. The incentives push toward content that captures attention rather than content that changes lives.

Movement leaders must resist these incentives. They must create content that serves their calling, not content that serves the algorithm.

What does content that moves look like?

It starts with depth. Surface-level content might generate clicks, but it rarely generates change. Movement leaders have expertise that took decades to develop. That expertise deserves expression in forms that honor its depth—long-form writing, comprehensive courses, ongoing mentorship.

It requires authenticity. Audiences have finely-tuned sensors for inauthenticity. They can tell when someone is performing versus when someone is sharing from genuine conviction. Movement leaders must speak in their own voice, from their own experience, with their own perspective.

It demands relevance. Deep, authentic content that doesn't connect to real challenges in people's lives won't move them. Movement leaders must bridge the gap between theological truth and lived experience, between abstract principles and practical application.

It builds over time. A single piece of content rarely creates transformation. Movement happens through sustained engagement—the book that leads to the course that leads to the community that leads to life change.

Content that moves is the ultimate measure of whether platform ownership and network participation are worth it. If the structure doesn't enable better content, it's just complexity. If it does enable better content—content that changes lives at scale—then it's worth every investment.`,
      },
    ],
  },
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const book = BOOK_CONTENT[slug]

  if (!book) {
    return {
      title: 'Book Not Found | Movemental',
    }
  }

  return {
    title: `Reading: ${book.title} | Movemental`,
  }
}

export default async function BookReadPage({ params }: PageProps) {
  const { slug } = await params
  const book = BOOK_CONTENT[slug]

  if (!book) {
    notFound()
  }

  return <EReaderContainer book={book} />
}
