"use client";

import React, { useEffect, useState } from 'react';
import { Reveal } from '@/components/studio/Reveal';
import { Container } from '@/components/studio/Container';
import { SectionHead } from '@/components/studio/SectionHead';
import Link from "next/link";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    role: '',
    audience_segment: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    document.title = "Talk With Us | Movemental";
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
    }, 1000);
  };

  if (status === 'success') {
    return (
      <div className="contact-page min-h-[70vh] flex items-center">
        <Container width="narrow">
          <div className="bg-card border border-border p-12 rounded-card text-center">
            <h2 className="text-3xl font-serif-display italic mb-4 text-foreground">Thanks.</h2>
            <p className="text-muted-foreground text-lg">We'll write back within two business days.</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="contact-page">
      <section className="band-midnight hero" aria-labelledby="contact-hero-h1">
        <Container>
          <Reveal>
            <span className="section-eyebrow">Start the conversation</span>
            <h1 id="contact-hero-h1" className="display hero-headline max-w-4xl">
              Let's talk about where your organization <em dangerouslySetInnerHTML={{__html: 'actually is.'}} />
            </h1>
            <p className="hero-subhead lede lede--regular text-inverse-foreground/80 mb-10 max-w-3xl">
              You don't need to have a plan yet — just start the conversation.
            </p>
            <div className="hero-actions flex flex-wrap gap-4">
              <a href="#contact-method" className="btn-pill btn-pill--primary">Send a note</a>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-default" id="reassurance">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="Low pressure"
              display={<>This is <em dangerouslySetInnerHTML={{__html: 'not a sales call.'}} /></>}
              lede="Our first conversation is about establishing context, not pushing a solution."
            />
            <ul className="space-y-6 max-w-3xl border-t border-border pt-8">
              <li className="flex items-start">
                <span className="text-primary mr-4 mt-1 font-bold text-lg">•</span>
                <p className="text-muted-foreground text-[1.0625rem] leading-[1.75]">We don't pitch software or tools. We listen to where your organization is currently feeling the tension.</p>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-4 mt-1 font-bold text-lg">•</span>
                <p className="text-muted-foreground text-[1.0625rem] leading-[1.75]">We will tell you honestly if we think you are further along than you realize, or if you need to slow down.</p>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-4 mt-1 font-bold text-lg">•</span>
                <p className="text-muted-foreground text-[1.0625rem] leading-[1.75]">If Movemental isn't the right fit, we will point you to resources that are.</p>
              </li>
            </ul>
          </Reveal>
        </Container>
      </section>

      <section className="band-section" id="what-happens-next">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="What happens next"
              display={<>What happens when you reach out.</>}
              lede="A simple, straightforward process."
            />
            <div className="grid md:grid-cols-3 gap-8 relative before:absolute before:inset-0 before:ml-8 md:before:ml-0 before:-translate-x-px md:before:translate-x-0 before:h-full md:before:h-[1px] before:w-[1px] md:before:w-full before:bg-border md:before:top-12">
              <div className="bg-card p-8 rounded-2xl border border-border hover:border-primary/30 transition-colors shadow-sm relative z-10 group">
                <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold uppercase tracking-widest mb-6 shadow-md transition-transform group-hover:scale-110">01</span>
                <h3 className="font-serif-display text-3xl italic mb-3 text-foreground">We reply</h3>
                <p className="text-[1.0625rem] leading-relaxed text-muted-foreground">Within two business days, a founder will reply to your note.</p>
              </div>
              <div className="bg-card p-8 rounded-2xl border border-border hover:border-primary/30 transition-colors shadow-sm relative z-10 group mt-8 md:mt-0">
                <span className="w-8 h-8 rounded-full bg-background border border-border text-foreground flex items-center justify-center text-xs font-semibold uppercase tracking-widest mb-6 shadow-sm transition-transform group-hover:scale-110 group-hover:border-primary">02</span>
                <h3 className="font-serif-display text-3xl italic mb-3 text-foreground">Initial call</h3>
                <p className="text-[1.0625rem] leading-relaxed text-muted-foreground">Thirty minutes. You share the context; we outline how we would approach it collaboratively.</p>
              </div>
              <div className="bg-card p-8 rounded-2xl border border-border hover:border-primary/30 transition-colors shadow-sm relative z-10 group mt-8 md:mt-0">
                <span className="w-8 h-8 rounded-full bg-background border border-border text-foreground flex items-center justify-center text-xs font-semibold uppercase tracking-widest mb-6 shadow-sm transition-transform group-hover:scale-110 group-hover:border-primary">03</span>
                <h3 className="font-serif-display text-3xl italic mb-3 text-foreground">Clarify</h3>
                <p className="text-[1.0625rem] leading-relaxed text-muted-foreground">If it's a fit, we map out a structured diagnostic or a specific engagement path.</p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-default" id="who-this-is-for">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="Who this is for"
              display={<>This conversation is most helpful <em dangerouslySetInnerHTML={{__html: 'if you are:'}} /></>}
            />
            <ul className="space-y-4 max-w-2xl">
              <li className="flex items-center text-muted-foreground text-[1.0625rem]"><span className="w-1.5 h-1.5 rounded-full bg-primary mr-4 block"></span>A senior leader carrying responsibility for mission and people.</li>
              <li className="flex items-center text-muted-foreground text-[1.0625rem]"><span className="w-1.5 h-1.5 rounded-full bg-primary mr-4 block"></span>Looking for a structured approach, not just tips and tricks.</li>
              <li className="flex items-center text-muted-foreground text-[1.0625rem]"><span className="w-1.5 h-1.5 rounded-full bg-primary mr-4 block"></span>Navigating the tension between innovation and faithful formation.</li>
            </ul>
          </Reveal>
        </Container>
      </section>

      <section className="band-section" id="contact-method">
        <Container width="narrow">
          <Reveal>
            <SectionHead 
              eyebrow="Send a note"
              display={<>Tell us what you are <em dangerouslySetInnerHTML={{__html: 'actually facing.'}} /></>}
              lede="Fill out the form below. The more context you can provide, the better our first conversation will be."
            />
            
            <form onSubmit={handleSubmit} className="bg-card border border-border p-8 md:p-12 rounded-2xl shadow-xl shadow-border/10 space-y-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              
              <div className="grid md:grid-cols-2 gap-6 relative z-10">
                <div>
                  <label htmlFor="name" className="form-label">Your name (required)</label>
                  <input required type="text" id="name" className="form-input bg-input/50" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label htmlFor="email" className="form-label">Email (required)</label>
                  <input required type="email" id="email" className="form-input bg-input/50" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="org" className="form-label">Organization</label>
                  <input type="text" id="org" className="form-input bg-input/50" value={formData.organization} onChange={e => setFormData({...formData, organization: e.target.value})} />
                </div>
                <div>
                  <label htmlFor="role" className="form-label">Your role</label>
                  <input type="text" id="role" placeholder="Senior pastor, executive director, provost…" className="form-input bg-input/50 placeholder:text-muted-foreground/50" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
                </div>
              </div>

              <div>
                <label htmlFor="segment" className="form-label">What kind of organization?</label>
                <select id="segment" required className="form-input bg-input/50 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2319150f%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1em] bg-[right_1rem_center] bg-no-repeat pr-10" value={formData.audience_segment} onChange={e => setFormData({...formData, audience_segment: e.target.value})}>
                  <option value="" disabled>Choose one</option>
                  <option value="Church">Church</option>
                  <option value="Nonprofit">Nonprofit</option>
                  <option value="Institution">Institution (seminary, school, other)</option>
                  <option value="Movement leader">Movement leader</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="form-label mb-1">What is on your desk?</label>
                <p className="text-xs text-muted-foreground mb-3">Share a bit about context, where the friction is, and what you're hoping to achieve.</p>
                <textarea id="message" required rows={5} className="form-input bg-input/50 resize-y" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
              </div>

              <div className="pt-4 flex flex-col items-end gap-4 border-t border-border mt-8">
                <button type="submit" disabled={status === 'submitting'} className="btn-pill btn-pill--primary w-full md:w-auto">
                  {status === 'submitting' ? 'Sending...' : 'Send the note'}
                </button>
                <p className="text-xs text-muted-foreground max-w-sm text-right">By submitting this form, you agree to our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> and <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>.</p>
              </div>
            </form>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
