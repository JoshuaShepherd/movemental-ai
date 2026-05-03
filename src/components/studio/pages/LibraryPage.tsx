"use client";

import React, { useState } from 'react';
import { Container } from '@/components/studio/Container';
import { Reveal } from '@/components/studio/Reveal';
import Link from "next/link";
import { Search, Grid, List, BookOpen, Video, Mic, FileText, ArrowUpRight, Lock, MessageSquare, Briefcase, Zap, Shield } from 'lucide-react';
import { SectionHead } from '@/components/studio/SectionHead';

type ContentType = 'Article' | 'Podcast' | 'Video' | 'Document' | 'Webinar';
type Topic = 'Theology' | 'Policy' | 'Practice' | 'Leadership';

interface LibraryItem {
  id: string;
  title: string;
  date: string;
  type: ContentType;
  topic: Topic;
  icon: React.ReactNode;
  colorClass: string;
}

const LIBRARY_ITEMS: LibraryItem[] = [
  {
    id: '1',
    title: 'The Forgotten Ways in an AI Era: A Conversation with Alan Hirsch',
    date: 'May 12, 2026',
    type: 'Podcast',
    topic: 'Theology',
    icon: <Mic className="w-16 h-16 opacity-80" />,
    colorClass: 'bg-emerald-800/20 text-emerald-600 dark:text-emerald-400'
  },
  {
    id: '2',
    title: 'Turnkey Safety Policy: Data Protection for Missional Organizations',
    date: 'May 8, 2026',
    type: 'Document',
    topic: 'Policy',
    icon: <Shield className="w-16 h-16 opacity-80" />,
    colorClass: 'bg-blue-800/20 text-blue-600 dark:text-blue-400'
  },
  {
    id: '3',
    title: 'Pastoral Voice and the Temptation of Efficiency',
    date: 'April 30, 2026',
    type: 'Article',
    topic: 'Leadership',
    icon: <MessageSquare className="w-16 h-16 opacity-80" />,
    colorClass: 'bg-orange-800/20 text-orange-600 dark:text-orange-400'
  },
  {
    id: '4',
    title: 'Implementing the Sandbox: A Guide for Church Staff',
    date: 'April 22, 2026',
    type: 'Video',
    topic: 'Practice',
    icon: <Video className="w-16 h-16 opacity-80" />,
    colorClass: 'bg-purple-800/20 text-purple-600 dark:text-purple-400'
  },
  {
    id: '5',
    title: 'APEST Dynamics in Technologically Accelerated Teams',
    date: 'April 15, 2026',
    type: 'Webinar',
    topic: 'Theology',
    icon: <Zap className="w-16 h-16 opacity-80" />,
    colorClass: 'bg-amber-800/20 text-amber-600 dark:text-amber-400'
  },
  {
    id: '6',
    title: 'Covocational Ministry and AI Capability',
    date: 'April 2, 2026',
    type: 'Article',
    topic: 'Practice',
    icon: <Briefcase className="w-16 h-16 opacity-80" />,
    colorClass: 'bg-rose-800/20 text-rose-600 dark:text-rose-400'
  },
  {
    id: '7',
    title: 'Protecting Donor Trust When Adopting Generative Tools',
    date: 'March 28, 2026',
    type: 'Document',
    topic: 'Policy',
    icon: <Lock className="w-16 h-16 opacity-80" />,
    colorClass: 'bg-indigo-800/20 text-indigo-600 dark:text-indigo-400'
  },
  {
    id: '8',
    title: 'Movemental Architecture: Brad Brisco on the Send Network',
    date: 'March 14, 2026',
    type: 'Podcast',
    topic: 'Leadership',
    icon: <Mic className="w-16 h-16 opacity-80" />,
    colorClass: 'bg-teal-800/20 text-teal-600 dark:text-teal-400'
  },
  {
    id: '9',
    title: 'Formation Before Efficiency: A Curriculum Guide',
    date: 'March 5, 2026',
    type: 'Document',
    topic: 'Practice',
    icon: <BookOpen className="w-16 h-16 opacity-80" />,
    colorClass: 'bg-stone-800/20 text-stone-600 dark:text-stone-400'
  }
];

const CATEGORIES: ContentType[] = ['Article', 'Document', 'Podcast', 'Video', 'Webinar'];
const TOPICS: Topic[] = ['Leadership', 'Policy', 'Practice', 'Theology'];

export function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ContentType | null>(null);
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);

  const filteredItems = LIBRARY_ITEMS.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory ? item.type === activeCategory : true;
    const matchesTopic = activeTopic ? item.topic === activeTopic : true;
    return matchesSearch && matchesCategory && matchesTopic;
  });

  return (
    <div className="library-page pt-32 pb-24">
      <Container>
        <Reveal>
          <div className="mb-4">
            <span className="section-eyebrow">Content Library</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border pb-12 mb-12">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif-display italic text-foreground mb-6 leading-[1.1] flex flex-col gap-1 md:gap-3">
                <span>Theology &rarr;</span>
                <span>Policy &rarr;</span>
                <span>Practice &rarr;</span>
                <span className="text-primary not-italic font-sans font-semibold tracking-tight">Formation &rarr;</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Resources, frameworks, and conversations for navigating AI as a leadership, formation, and mission challenge.
              </p>
            </div>
            
            <div className="flex flex-col gap-4 min-w-[280px]">
               <div className="bg-card border border-border p-6 rounded-xl flex flex-col gap-3 group hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors"></div>
                 <div className="text-xs font-semibold uppercase tracking-widest text-primary/80">Featured</div>
                 <h4 className="font-serif-display text-xl text-foreground group-hover:text-primary transition-colors line-clamp-2">The Permanent Revolution Playbook in an AI Context</h4>
                 <div className="text-xs text-muted-foreground pt-3 border-t border-border/50 uppercase tracking-widest">May 15, 2026</div>
               </div>
               <div className="bg-card border border-border p-6 rounded-xl flex flex-col gap-3 group hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-1 h-full bg-border group-hover:bg-primary/50 transition-colors"></div>
                 <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">New Framework</div>
                 <h4 className="font-serif-display text-xl text-foreground group-hover:text-primary transition-colors line-clamp-2">Assessing Organizational Readiness for AI</h4>
                 <div className="text-xs text-muted-foreground pt-3 border-t border-border/50 uppercase tracking-widest">May 10, 2026</div>
               </div>
            </div>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-[240px_1fr] gap-12">
          {/* Sidebar */}
          <aside className="space-y-10 hidden lg:block">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground/50 mb-4 border-b border-border pb-2">Filter and sort</h4>
            </div>

            <div>
              <h4 className="text-sm font-medium text-foreground mb-4">Format</h4>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => setActiveCategory(null)}
                    className={`text-sm tracking-wide ${activeCategory === null ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    All formats
                  </button>
                </li>
                {CATEGORIES.map(cat => (
                  <li key={cat}>
                    <button 
                      onClick={() => setActiveCategory(cat)}
                      className={`text-sm tracking-wide flex items-center justify-between w-full ${activeCategory === cat ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      {cat}
                      <span className="text-xs opacity-50">{LIBRARY_ITEMS.filter(i => i.type === cat).length}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-foreground mb-4">Topic</h4>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => setActiveTopic(null)}
                    className={`text-sm tracking-wide ${activeTopic === null ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    All topics
                  </button>
                </li>
                {TOPICS.map(topic => (
                  <li key={topic}>
                    <button 
                      onClick={() => setActiveTopic(topic)}
                      className={`text-sm tracking-wide flex items-center justify-between w-full ${activeTopic === topic ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      {topic}
                      <span className="text-xs opacity-50">{LIBRARY_ITEMS.filter(i => i.topic === topic).length}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search resources..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-section border border-border rounded-md pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              </div>
              <div className="flex items-center gap-2 border border-border rounded-md p-1 bg-section">
                <button className="p-1.5 rounded bg-background shadow-sm text-foreground"><Grid className="w-4 h-4" /></button>
                <button className="p-1.5 rounded text-muted-foreground hover:text-foreground"><List className="w-4 h-4" /></button>
              </div>
            </div>

            {filteredItems.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item, i) => (
                  <Reveal key={item.id} delay={i * 50}>
                    <Link href="#" className="group flex flex-col h-full bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset">
                      <div className={`aspect-[4/3] flex items-center justify-center p-8 ${item.colorClass} relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent mix-blend-overlay"></div>
                        <div className="group-hover:scale-125 group-hover:rotate-3 transition-transform duration-700 ease-out z-10">
                          {item.icon}
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="text-xs text-muted-foreground mb-3">{item.date}</div>
                        <h3 className="font-semibold text-lg text-foreground mb-4 leading-snug group-hover:text-primary transition-colors">{item.title}</h3>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs font-medium text-foreground/70 uppercase tracking-wider">
                            {item.type === 'Article' && <FileText className="w-3.5 h-3.5" />}
                            {item.type === 'Document' && <BookOpen className="w-3.5 h-3.5" />}
                            {item.type === 'Podcast' && <Mic className="w-3.5 h-3.5" />}
                            {item.type === 'Video' && <Video className="w-3.5 h-3.5" />}
                            {item.type === 'Webinar' && <Zap className="w-3.5 h-3.5" />}
                            {item.type}
                          </div>
                          <span className="text-xs bg-section px-2 py-1 rounded text-muted-foreground">{item.topic}</span>
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="py-24 text-center border border-dashed border-border rounded-xl">
                <h3 className="text-lg font-medium text-foreground mb-2">No resources found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory(null);
                    setActiveTopic(null);
                  }}
                  className="mt-6 text-sm text-primary hover:underline underline-offset-4"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {filteredItems.length > 0 && (
              <div className="mt-12 text-center">
                <button className="btn-pill bg-section text-foreground hover:bg-border/50 border border-border px-8 py-3 text-sm font-semibold transition-colors">
                  Load more resources
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* Featured Book / Resource */}
      <section className="mt-24 pt-24 border-t border-border">
        <Container>
          <Reveal>
            <div className="bg-band-midnight text-inverse-foreground rounded-2xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto overflow-hidden relative">
               <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 opacity-10">
                 <BookOpen className="w-96 h-96" />
               </div>
               <div className="flex-1 relative z-10">
                  <div className="flex items-center gap-2 text-primary font-semibold uppercase tracking-widest text-xs mb-4">
                    <BookOpen className="w-4 h-4" /> Comprehensive Guide
                  </div>
                  <h2 className="font-serif-display italic text-3xl md:text-5xl mb-6">Building trusted AI in mission-driven organizations</h2>
                  <p className="text-inverse-foreground/80 text-lg mb-8 leading-relaxed">
                    A complete playbook for establishing safety, moving through the sandbox phase, and arriving at robust capability without compromising core formation.
                  </p>
                  <button className="btn-pill btn-pill--primary">Download the Guide</button>
               </div>
               <div className="w-full md:w-1/3 aspect-[3/4] bg-inverse-surface/50 border border-inverse-border/30 rounded-lg flex items-center justify-center p-8 relative z-10 backdrop-blur-sm">
                 <Shield className="w-32 h-32 text-primary opacity-80" strokeWidth={1} />
               </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Newsletter */}
      <section className="mt-24">
        <Container>
          <Reveal>
            <div className="border border-border rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-12">
               <div className="max-w-xl">
                 <h2 className="font-serif-display italic text-3xl md:text-4xl text-foreground mb-4">Equip your leadership team.</h2>
                 <p className="text-muted-foreground leading-relaxed">
                   Receive monthly insights on leading organizations through technological shifts, practical theology, and safe adoption strategies.
                 </p>
               </div>
               <div className="w-full md:w-auto flex-1 max-w-md">
                 <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                   <div className="relative">
                     <input 
                       type="email" 
                       placeholder="Enter your email" 
                       className="w-full bg-section border border-border rounded-full pl-6 pr-12 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                       required
                     />
                     <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-foreground text-background hover:bg-primary transition-colors rounded-full rounded-r-[1.2rem]">
                       <ArrowUpRight className="w-5 h-5" />
                     </button>
                   </div>
                   <p className="text-xs text-muted-foreground px-4">
                     We never share your email. Unsubscribe anytime.
                   </p>
                 </form>
               </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
