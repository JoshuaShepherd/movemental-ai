import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ArrowUpRight, Menu, X, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/Container';

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-card/95 backdrop-blur-md border-b border-border shadow-sm py-2'
          : 'bg-transparent border-b border-transparent py-4'
      )}
    >
      <Container className="flex items-center justify-between gap-6 transition-all duration-300">
        <Link to="/" className="flex items-center" aria-label="Movemental Home">
          {isDark ? (
             <img src="https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/media-library/movemental/logos/movemental-logo-transparent-white.webp" alt="Movemental Logo" className="h-11 w-auto" />
          ) : (
            <img src="https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/media-library/movemental/logos/movemental-logo-transparent.png" alt="Movemental Logo" className="h-11 w-auto" />
          )}
        </Link>
        
        <nav className="hidden lg:flex items-center gap-6">
          <div className="relative group">
            <Link to="/pathway" className="text-sm font-medium hover:text-primary transition-all duration-200 py-4 flex items-center gap-1">The Pathway <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></Link>
            <div className="absolute top-full left-0 w-64 bg-card border border-border shadow-lg rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 p-2 z-50">
              <Link to="/pathway/foundations" className="block px-4 py-3 hover:bg-section rounded-lg transition-colors">
                <div className="text-sm font-semibold text-foreground">01. Safety Documentation</div>
                <div className="text-xs text-muted-foreground mt-1">AI use & trust charters</div>
              </Link>
              <Link to="/pathway/lab" className="block px-4 py-3 hover:bg-section rounded-lg transition-colors">
                <div className="text-sm font-semibold text-foreground">02. Sandbox Discovery</div>
                <div className="text-xs text-muted-foreground mt-1">Facilitated use case sprints</div>
              </Link>
              <Link to="/training" className="block px-4 py-3 hover:bg-section rounded-lg transition-colors">
                <div className="text-sm font-semibold text-foreground">03. Skills Development</div>
                <div className="text-xs text-muted-foreground mt-1">Cohorts & self-paced fluency</div>
              </Link>
              <Link to="/technology" className="block px-4 py-3 hover:bg-section rounded-lg transition-colors">
                <div className="text-sm font-semibold text-foreground">04. Solutions Deployment</div>
                <div className="text-xs text-muted-foreground mt-1">Custom agentic CMS/LMS builds</div>
              </Link>
            </div>
          </div>

          <div className="relative group">
            <button className="text-sm font-medium hover:text-primary transition-all duration-200 py-4 flex items-center gap-1">Audiences <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></button>
            <div className="absolute top-full left-0 w-48 bg-card border border-border shadow-lg rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 p-2 z-50">
              <Link to="/for-churches" className="block px-4 py-2.5 text-sm font-medium hover:bg-section rounded-lg transition-colors">For Churches</Link>
              <Link to="/for-nonprofits" className="block px-4 py-2.5 text-sm font-medium hover:bg-section rounded-lg transition-colors">For Nonprofits</Link>
              <Link to="/for-institutions" className="block px-4 py-2.5 text-sm font-medium hover:bg-section rounded-lg transition-colors">For Institutions</Link>
            </div>
          </div>

          <Link to="/about" className="text-sm font-medium hover:text-primary transition-all duration-200 hover:-translate-y-0.5 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300">About</Link>
          <Link to="/contact" className="text-sm font-medium hover:text-primary transition-all duration-200 hover:-translate-y-0.5 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300">Contact</Link>
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-full hover:bg-section transition-colors" aria-label="Toggle theme">
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <Link to="/contact" className="btn-pill btn-pill--primary py-2.5">
            Start a Conversation
          </Link>
        </div>

        <button className="lg:hidden p-2 rounded-md hover:bg-section transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-expanded={isMenuOpen} aria-label={isMenuOpen ? "Close menu" : "Open menu"} onClick={() => setIsMenuOpen(!isMenuOpen)}>
           {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </Container>
      
      {/* Mobile menu */}
      <div 
        className={cn(
          "absolute top-full left-0 right-0 bg-card border-b border-border shadow-lg lg:hidden flex flex-col gap-2 overflow-hidden transition-all duration-300 ease-in-out origin-top",
          isMenuOpen ? "max-h-[80vh] opacity-100 py-6 px-6" : "max-h-0 opacity-0 py-0 px-6 pointer-events-none"
        )}
      >
        <div className="flex flex-col gap-4 overflow-y-auto max-h-full pb-4">
           <Link to="/pathway" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium p-2 hover:bg-section rounded-md transition-colors">The Pathway</Link>
           <div className="pl-4 border-l-2 border-border ml-2 flex flex-col gap-2 my-1">
             <span className="text-sm uppercase tracking-widest text-muted-foreground font-semibold px-2">Products</span>
             <Link to="/training" onClick={() => setIsMenuOpen(false)} className="text-[1.0625rem] font-medium p-2 hover:bg-section rounded-md transition-colors">Training</Link>
             <Link to="/technology" onClick={() => setIsMenuOpen(false)} className="text-[1.0625rem] font-medium p-2 hover:bg-section rounded-md transition-colors">Technology</Link>
           </div>
           <div className="pl-4 border-l-2 border-border ml-2 flex flex-col gap-2 my-1">
             <span className="text-sm uppercase tracking-widest text-muted-foreground font-semibold px-2">Audiences</span>
             <Link to="/for-churches" onClick={() => setIsMenuOpen(false)} className="text-[1.0625rem] font-medium p-2 hover:bg-section rounded-md transition-colors">For Churches</Link>
             <Link to="/for-nonprofits" onClick={() => setIsMenuOpen(false)} className="text-[1.0625rem] font-medium p-2 hover:bg-section rounded-md transition-colors">For Nonprofits</Link>
             <Link to="/for-institutions" onClick={() => setIsMenuOpen(false)} className="text-[1.0625rem] font-medium p-2 hover:bg-section rounded-md transition-colors">For Institutions</Link>
           </div>
           <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium p-2 hover:bg-section rounded-md transition-colors">About</Link>
           <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium p-2 hover:bg-section rounded-md transition-colors">Contact</Link>
           <button onClick={() => setIsDark(!isDark)} className="mt-4 flex items-center justify-center gap-2 text-foreground/80 p-3 bg-section rounded-md hover:bg-border transition-colors">
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-background border-t border-border py-16 md:py-24">
      <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
        <div className="col-span-1 md:col-span-2 lg:col-span-2 lg:pr-12">
           <Link to="/" className="inline-block mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
             <h3 className="text-2xl font-bold font-serif-display tracking-tight text-foreground">Movemental</h3>
           </Link>
           <p className="text-muted-foreground leading-relaxed max-w-sm mb-8 text-[1.0625rem]">
             Helping organizations adopt AI in a way that keeps the mission recognizable, and the work responsibly human.
           </p>
           <div className="flex gap-4">
             <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-section flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="LinkedIn">
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
             </a>
             <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-section flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="Twitter">
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
             </a>
           </div>
        </div>
        
        <div className="col-span-1">
           <h4 className="font-semibold mb-6">Movemental</h4>
           <ul className="space-y-4 text-foreground/80">
             <li><Link to="/about" className="hover:text-primary transition-colors hover:underline underline-offset-4 decoration-primary/30 hover:decoration-primary">About</Link></li>
             <li><Link to="/team" className="hover:text-primary transition-colors hover:underline underline-offset-4 decoration-primary/30 hover:decoration-primary">Team</Link></li>
             <li><Link to="/voices" className="hover:text-primary transition-colors hover:underline underline-offset-4 decoration-primary/30 hover:decoration-primary">Trusted voices</Link></li>
             <li><Link to="/library" className="hover:text-primary transition-colors hover:underline underline-offset-4 decoration-primary/30 hover:decoration-primary">Library</Link></li>
             <li><Link to="/field-guide" className="hover:text-primary transition-colors hover:underline underline-offset-4 decoration-primary/30 hover:decoration-primary">Field guide</Link></li>
             <li><Link to="/faq" className="hover:text-primary transition-colors hover:underline underline-offset-4 decoration-primary/30 hover:decoration-primary">FAQ</Link></li>
             <li><Link to="/contact" className="hover:text-primary transition-colors hover:underline underline-offset-4 decoration-primary/30 hover:decoration-primary">Contact</Link></li>
           </ul>
        </div>
        
        <div>
           <h4 className="font-semibold mb-6">Who we serve</h4>
           <ul className="space-y-4 text-foreground/80">
             <li><Link to="/who-we-serve" className="hover:text-primary transition-colors hover:underline underline-offset-4 decoration-primary/30 hover:decoration-primary">Who we serve</Link></li>
             <li><Link to="/churches" className="hover:text-primary transition-colors hover:underline underline-offset-4 decoration-primary/30 hover:decoration-primary">Churches</Link></li>
             <li><Link to="/nonprofits" className="hover:text-primary transition-colors hover:underline underline-offset-4 decoration-primary/30 hover:decoration-primary">Nonprofits</Link></li>
             <li><Link to="/institutions" className="hover:text-primary transition-colors hover:underline underline-offset-4 decoration-primary/30 hover:decoration-primary">Institutions</Link></li>
             <li><Link to="/movement-leaders" className="hover:text-primary transition-colors hover:underline underline-offset-4 decoration-primary/30 hover:decoration-primary">Movement leaders</Link></li>
           </ul>
        </div>
        
        <div>
           <h4 className="font-semibold mb-6">Get started</h4>
           <ul className="space-y-4 text-foreground/80">
             <li><Link to="/assess" className="hover:text-primary transition-colors hover:underline underline-offset-4 decoration-primary/30 hover:decoration-primary">Take the diagnostic</Link></li>
             <li><Link to="/contact" className="hover:text-primary transition-colors hover:underline underline-offset-4 decoration-primary/30 hover:decoration-primary">Start a conversation</Link></li>
             <li><Link to="/field-guide" className="hover:text-primary transition-colors hover:underline underline-offset-4 decoration-primary/30 hover:decoration-primary">Read the field guide</Link></li>
           </ul>
        </div>
      </Container>
      
      <Container className="mt-16 pt-8 border-t border-border text-sm text-foreground/60 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© {new Date().getFullYear()} Movemental. All rights reserved.</p>
        <div className="flex gap-4">
           <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
           <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
           <Link to="/cookies" className="hover:text-primary transition-colors">Cookies</Link>
        </div>
      </Container>
    </footer>
  );
}

export function Layout() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}
