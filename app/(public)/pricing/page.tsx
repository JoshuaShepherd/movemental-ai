import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  Check, 
  X, 
  ArrowRight, 
  Zap, 
  TrendingUp, 
  Shield, 
  Users,
  BookOpen,
  Video,
  MessageSquare,
  BarChart3,
  Globe,
  Sparkles
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pricing | Movemental',
  description: 'Revolutionary pricing for movement leaders. $1,000 platform build + 10% revenue share. Keep 90% of your revenue instead of 10%.',
  openGraph: {
    title: 'Revolutionary Pricing for Movement Leaders | Movemental',
    description: '$1,000 platform build vs. $50K-$150K industry standard. Keep 90% of your revenue.',
    type: 'website',
  },
}

const COMPARISON_DATA = [
  {
    aspect: 'Upfront Cost',
    traditional: '$50,000 - $150,000',
    platforms: '$0 (but you pay forever)',
    movemental: '$1,000',
    highlight: true,
  },
  {
    aspect: 'Revenue You Keep',
    traditional: '10-15%',
    platforms: '70-85%',
    movemental: '90%',
    highlight: true,
  },
  {
    aspect: 'Platform Ownership',
    traditional: 'No - Publisher owns',
    platforms: 'No - Renting access',
    movemental: 'Yes - 100% yours',
    highlight: true,
  },
  {
    aspect: 'Audience Data',
    traditional: 'Publisher controls',
    platforms: 'Platform controls',
    movemental: 'You own completely',
    highlight: false,
  },
  {
    aspect: 'Custom Domain',
    traditional: 'Rarely',
    platforms: 'Sometimes (extra cost)',
    movemental: 'Always included',
    highlight: false,
  },
  {
    aspect: 'AI Content Assistance',
    traditional: 'No',
    platforms: 'Generic tools',
    movemental: 'Voice-preserving AI',
    highlight: false,
  },
  {
    aspect: 'Network Effects',
    traditional: 'No',
    platforms: 'Competes with you',
    movemental: 'Amplifies your reach',
    highlight: false,
  },
  {
    aspect: 'Time to Launch',
    traditional: '6-12 months',
    platforms: 'Days (but limited)',
    movemental: '3-4 weeks (full platform)',
    highlight: false,
  },
]

const PLATFORM_FEATURES = [
  {
    icon: BookOpen,
    title: 'Books & Articles',
    description: 'Publish and sell your content with full e-reader experience',
  },
  {
    icon: Video,
    title: 'Courses & Videos',
    description: 'Create and monetize video courses and learning paths',
  },
  {
    icon: MessageSquare,
    title: 'Community',
    description: 'Build engaged communities around your content',
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    description: 'Understand your audience with comprehensive insights',
  },
  {
    icon: Globe,
    title: 'Custom Domain',
    description: 'Your brand, your domain, your platform',
  },
  {
    icon: Sparkles,
    title: 'AI Assistance',
    description: 'Voice-preserving AI that amplifies, not replaces',
  },
]

const FAQ_ITEMS = [
  {
    question: 'Why is the upfront cost so low?',
    answer: 'Our mission is to serve movement leaders who otherwise couldn\'t afford these tools. The $1,000 covers the platform build and deployment. We earn through the 10% revenue share, which means we succeed when you succeed. This aligns our incentives and makes professional-grade platforms accessible.',
  },
  {
    question: 'How does the 10% revenue share work?',
    answer: 'You keep 90% of all revenue from your content—subscriptions, course sales, ebooks, consulting fees processed through your platform. We take 10% as our ongoing fee. There are no hidden costs, no monthly fees, no per-transaction charges on top of the revenue share.',
  },
  {
    question: 'What if I don\'t generate revenue right away?',
    answer: 'No problem. The revenue share only applies when you earn. If you\'re building your audience and not monetizing yet, you pay nothing beyond the initial $1,000. We\'re invested in your long-term success.',
  },
  {
    question: 'Do I really own the platform?',
    answer: 'Yes. Your platform, your domain, your audience data, your content—it\'s all yours. If you ever decide to leave, you take everything with you. We\'ll never hold your content or audience hostage.',
  },
  {
    question: 'What\'s included in the $1,000 build?',
    answer: 'Everything you need to launch: custom domain setup, content management system, e-commerce integration, email tools, analytics, AI content assistance, and network features. We build your platform based on your specific needs during our 3-4 week onboarding process.',
  },
  {
    question: 'How is this different from Substack, Kajabi, or Teachable?',
    answer: 'Those platforms rent you access. You\'re building on their land, subject to their rules, competing with others on their platform. With Movemental, you own your platform outright. Plus, you keep 90% of revenue instead of 70-85%, and you get network amplification instead of competition.',
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 px-4 bg-gradient-to-b from-sage-900 via-sage-900 to-sage-800">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 text-sm text-emerald-400">
            <Zap className="h-4 w-4" />
            <span>Revolutionary Pricing Model</span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-6">
            <span className="text-emerald-400">$1,000</span> Platform Build
            <br />
            <span className="text-sage-300 text-3xl sm:text-4xl md:text-5xl">+ 10% Revenue Share</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-sage-300 mb-4">
            Keep <span className="text-emerald-400 font-semibold">90%</span> of your revenue
          </p>
          <p className="text-lg text-sage-300 max-w-2xl mx-auto mb-10">
            vs. 10-15% with traditional publishers, or endless monthly fees with rental platforms.
            Own your platform. Keep your audience. Amplify your impact.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-emerald-500/25"
            >
              <Link href="/fit-check">
                Check Your Fit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full"
            >
              <Link href="/why-movemental">
                Learn Why This Works
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* The Math Section */}
      <section className="py-16 sm:py-20 px-4 bg-emerald-600">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-12 text-center">
            The Math That Changes Everything
          </h2>
          
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl sm:text-6xl font-bold text-white mb-2">90%</div>
              <div className="text-lg font-semibold text-emerald-100">Revenue You Keep</div>
              <div className="text-sm text-emerald-200 mt-1">vs. 10-15% traditional</div>
            </div>
            <div>
              <div className="text-5xl sm:text-6xl font-bold text-white mb-2">$1K</div>
              <div className="text-lg font-semibold text-emerald-100">Platform Build</div>
              <div className="text-sm text-emerald-200 mt-1">vs. $50K-$150K agencies</div>
            </div>
            <div>
              <div className="text-5xl sm:text-6xl font-bold text-white mb-2">100%</div>
              <div className="text-lg font-semibold text-emerald-100">Ownership</div>
              <div className="text-sm text-emerald-200 mt-1">Your platform forever</div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 text-center">
            How Movemental Compares
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Traditional publishers, rental platforms, and Movemental—see the real difference
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-4 font-semibold text-foreground"></th>
                  <th className="text-center py-4 px-4 font-semibold text-muted-foreground">
                    <div className="flex flex-col items-center gap-1">
                      <X className="h-5 w-5 text-red-500" />
                      <span>Traditional Publishers</span>
                    </div>
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-muted-foreground">
                    <div className="flex flex-col items-center gap-1">
                      <X className="h-5 w-5 text-orange-500" />
                      <span>Rental Platforms</span>
                    </div>
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-emerald-600">
                    <div className="flex flex-col items-center gap-1">
                      <Check className="h-5 w-5 text-emerald-500" />
                      <span>Movemental</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_DATA.map((row, index) => (
                  <tr 
                    key={row.aspect} 
                    className={`border-b ${row.highlight ? 'bg-emerald-50 dark:bg-emerald-950/20' : ''}`}
                  >
                    <td className="py-4 px-4 font-medium text-foreground">{row.aspect}</td>
                    <td className="py-4 px-4 text-center text-muted-foreground">{row.traditional}</td>
                    <td className="py-4 px-4 text-center text-muted-foreground">{row.platforms}</td>
                    <td className="py-4 px-4 text-center font-semibold text-emerald-600">{row.movemental}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 sm:py-24 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 text-center">
            Everything You Need to Launch
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Your $1,000 platform build includes a complete digital publishing platform
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLATFORM_FEATURES.map((feature) => (
              <Card key={feature.title} className="p-6">
                <feature.icon className="h-10 w-10 text-emerald-500 mb-4" />
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>

          <div className="mt-12 p-6 bg-background border rounded-xl">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                <Users className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Network Amplification</h3>
                <p className="text-muted-foreground">
                  Unlike rental platforms where you compete with others, Movemental&apos;s network 
                  amplifies your reach. Cross-pollination, shared audiences, and collaborative 
                  discovery—your content reaches further because we&apos;re all connected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Revenue Share Works */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 text-center">
            How Revenue Share Works
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Simple, transparent, aligned with your success
          </p>

          <div className="grid sm:grid-cols-2 gap-8">
            <Card className="p-6 border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-foreground">You Earn</h3>
              </div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">90%</div>
              <p className="text-muted-foreground">
                Of all revenue from subscriptions, course sales, ebooks, consulting fees, 
                and any other income through your platform.
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-sage-100 dark:bg-sage-800 rounded-lg">
                  <Shield className="h-5 w-5 text-sage-600" />
                </div>
                <h3 className="font-semibold text-foreground">We Earn</h3>
              </div>
              <div className="text-4xl font-bold text-sage-600 mb-2">10%</div>
              <p className="text-muted-foreground">
                Our fee for ongoing platform hosting, updates, support, AI features, 
                and network infrastructure. We only earn when you earn.
              </p>
            </Card>
          </div>

          <div className="mt-8 p-6 bg-muted/50 rounded-xl">
            <h4 className="font-semibold text-foreground mb-2">Example: $10,000 Monthly Revenue</h4>
            <div className="flex items-center gap-4 text-lg">
              <span className="text-muted-foreground">You keep:</span>
              <span className="font-bold text-emerald-600">$9,000</span>
              <span className="text-muted-foreground mx-2">|</span>
              <span className="text-muted-foreground">We receive:</span>
              <span className="font-bold text-sage-600">$1,000</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              No monthly fees. No per-transaction charges. No hidden costs.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24 px-4 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {FAQ_ITEMS.map((item, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-semibold text-foreground mb-2">{item.question}</h3>
                <p className="text-muted-foreground">{item.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-28 px-4 bg-gradient-to-b from-sage-900 to-sage-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Own Your Platform?
          </h2>
          <p className="text-lg text-sage-300 mb-8">
            Start with a 60-second fit check to see if Movemental is right for you.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-emerald-500/25"
          >
            <Link href="/fit-check">
              Take the Fit Check
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <p className="text-sage-300 mt-4 text-sm">
            No credit card required. No commitment.
          </p>
        </div>
      </section>
    </div>
  )
}
