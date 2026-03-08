import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  ReadingContainer,
  SectionHeader,
  ReadingParagraph,
  ReadingList,
  BlockQuote,
} from '@/components/ai-book-reading'
import { Breadcrumbs } from '@/components/shared'

// Sample chapters data - in production this would come from CMS
const CHAPTERS = [
  {
    id: 'introduction',
    number: 1,
    title: 'The Problem Nobody Talks About',
    subtitle: 'Why movement leaders lose 85-90% of their revenue',
    readingTime: 8,
    href: '/book/introduction',
  },
  {
    id: 'structural-nature',
    number: 2,
    title: 'Why This Is a Structural Problem',
    subtitle: 'Understanding the historical constraints',
    readingTime: 12,
    href: '/book/structural-nature',
  },
  {
    id: 'what-changed',
    number: 3,
    title: 'What Changed',
    subtitle: 'The shifts that make ownership possible',
    readingTime: 10,
    href: '/book/what-changed',
  },
  {
    id: 'platform-ownership',
    number: 4,
    title: 'Platform Ownership',
    subtitle: 'Owning vs renting your digital presence',
    readingTime: 15,
    href: '/book/platform-ownership',
  },
  {
    id: 'network-effects',
    number: 5,
    title: 'Network Effects',
    subtitle: 'How connected platforms create amplification',
    readingTime: 12,
    href: '/book/network-effects',
  },
  {
    id: 'content-that-moves',
    number: 6,
    title: 'Content That Moves',
    subtitle: 'Creating content that catalyzes change',
    readingTime: 18,
    href: '/book/content-that-moves',
  },
]

interface PageProps {
  params: Promise<{ chapterId: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { chapterId } = await params
  const chapter = CHAPTERS.find((ch) => ch.id === chapterId)
  
  if (!chapter) {
    return { title: 'Chapter Not Found | Movemental' }
  }

  return {
    title: `${chapter.title} | The Movemental Book`,
    description: chapter.subtitle,
  }
}

export default async function ChapterPage({ params }: PageProps) {
  const { chapterId } = await params
  const chapterIndex = CHAPTERS.findIndex((ch) => ch.id === chapterId)
  const chapter = CHAPTERS[chapterIndex]
  
  if (!chapter) {
    notFound()
  }

  const previousChapter = chapterIndex > 0 ? CHAPTERS[chapterIndex - 1] : undefined
  const nextChapter = chapterIndex < CHAPTERS.length - 1 ? CHAPTERS[chapterIndex + 1] : undefined

  const breadcrumbItems = [
    { label: 'AI Book', href: '/book' },
    { label: chapter.title, href: `/book/${chapter.id}` },
  ]

  return (
    <div>
      <div className="container max-w-4xl mx-auto px-4 pt-6">
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      <ReadingContainer
      chapter={{
        number: chapter.number,
        title: chapter.title,
        subtitle: chapter.subtitle,
        readingTime: chapter.readingTime,
      }}
      chapters={CHAPTERS}
      currentChapterId={chapter.id}
      previousChapter={previousChapter}
      nextChapter={nextChapter}
    >
      {/* Sample content - would come from CMS */}
      <SectionHeader>The Hidden Truth</SectionHeader>
      
      <ReadingParagraph>
        Movement leaders have incredible teaching that could transform thousands of lives, 
        but they&apos;re trapped in publishing systems that extract most of their value. This 
        isn&apos;t a failure of effort or talent—it&apos;s a <strong>structural problem</strong> with 
        the available options.
      </ReadingParagraph>

      <ReadingParagraph>
        Consider the current landscape. When a movement leader wants to share their 
        message with the world, they face a limited set of choices:
      </ReadingParagraph>

      <ReadingList
        items={[
          <><strong>Traditional Publishers</strong> — Take 90% of book revenue, leaving authors with just 10% for distribution that&apos;s increasingly irrelevant in a digital world.</>,
          <><strong>Digital Platforms</strong> — Own your audience, capture 70-90% of revenue through fees and revenue sharing, and force optimization for algorithms instead of movements.</>,
          <><strong>Custom Development</strong> — Costs $50K-$150K and takes 6-12 months, making platform ownership impossible for most leaders.</>,
          <><strong>Isolated Platforms</strong> — Individual websites struggle with low domain authority, poor SEO, and minimal network effects.</>,
        ]}
      />

      <BlockQuote citation="A movement leader who tried all four options">
        I spent three years building my following on platforms that took most of my revenue, 
        then another year trying to build my own site that nobody could find. I was ready 
        to give up before I understood this wasn&apos;t my failure—it was the system.
      </BlockQuote>

      <SectionHeader>Why This Matters</SectionHeader>

      <ReadingParagraph>
        The implications of this structural problem extend far beyond individual finances. 
        When movement leaders can&apos;t sustain their work, <em>movements themselves suffer</em>. 
        The ideas that could catalyze lasting change never reach the people who need them.
      </ReadingParagraph>

      <ReadingParagraph>
        Revenue extraction and platform dependency create a cascade of problems:
      </ReadingParagraph>

      <ReadingList
        type="numbered"
        items={[
          <><strong>Unsustainable ministry</strong> — Leaders can&apos;t sustain full-time movement work when they lose 85-90% of revenue.</>,
          <><strong>Lost audience ownership</strong> — Creators don&apos;t own their audience data, limiting direct communication and long-term relationship building.</>,
          <><strong>Diluted brand identity</strong> — Fractured digital tools create inconsistent presence across platforms.</>,
          <><strong>Limited amplification</strong> — Isolated platforms can&apos;t compete with network effects, reaching only 1-5% of potential audience.</>,
        ]}
      />

      <SectionHeader level={3}>The Path Forward</SectionHeader>

      <ReadingParagraph>
        Understanding this problem is the first step toward solving it. In the chapters 
        that follow, we&apos;ll explore <em>why</em> this structural problem exists, <em>what</em> has 
        changed to make new solutions possible, and <em>how</em> movement leaders can reclaim 
        ownership of their digital presence.
      </ReadingParagraph>

      <ReadingParagraph>
        The good news: the constraint that created this problem has been removed. For the 
        first time, movement leaders can have revenue retention, platform ownership, <em>and</em> 
        accessibility—all three, together.
      </ReadingParagraph>
    </ReadingContainer>
    </div>
  )
}
