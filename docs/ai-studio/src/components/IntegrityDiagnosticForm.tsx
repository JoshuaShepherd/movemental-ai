import React, { useState, useRef, useEffect } from 'react';
import { DIMENSIONS, QUESTIONS_BY_DIMENSION, TOTAL_QUESTIONS } from '@/lib/integrity-diagnostic/questions';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export function IntegrityDiagnosticForm() {
  const [step, setStep] = useState(0); // 0 = identity, 1-6 = dimensions, 7 = review, 8 = success
  const [identity, setIdentity] = useState({ name: '', email: '', organizationName: '', role: '' });
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [followUps, setFollowUps] = useState<Record<string, string>>({});
  const [closingNote, setClosingNote] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (step > 0 && containerRef.current) {
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        containerRef.current.scrollIntoView({ block: 'start' });
      }
      // Set focus to the container so keyboard navigation starts from the top of the new step
      containerRef.current.focus({ preventScroll: true });
    }
  }, [step]);

  const handleIdentitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identity.name || !identity.email) {
      setError('Please add your name and a valid email.');
      return;
    }
    setError(null);
    setStep(1);
  };

  const handleOptionSelect = (questionId: string, optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleNext = () => setStep(s => Math.min(7, s + 1));
  const handlePrev = () => setStep(s => Math.max(0, s - 1));

  const answersCount = Object.keys(answers).length;
  const isComplete = answersCount === TOTAL_QUESTIONS;

  const handleSubmitDiagnostic = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      // Create the expected array shape for answers based on question order
      // We don't have the real questions so we just submit what we have
      const formattedAnswers = Object.values(answers);
      
      const payload = {
        name: identity.name,
        email: identity.email,
        organizationName: identity.organizationName,
        role: identity.role,
        answers: formattedAnswers,
        followUps,
        closingNote
      };
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      console.log('Submitted diagnostic:', payload);
      setStep(8);
    } catch (e) {
      setError('An error occurred while submitting. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 8) {
    return (
      <div className="bg-card border border-border p-8 md:p-16 rounded-card max-w-4xl mx-auto shadow-sm" aria-live="polite">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
            <Check size={32} />
          </div>
          <h2 className="text-3xl font-serif-display italic mb-4 text-foreground">Thank you. Your diagnostic is in.</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-[1.0625rem] leading-[1.75]">
            Within five business days, you will receive a six-page read-back based on these responses, along with a calendar invite for a thirty-minute call to read it with a founder.
          </p>
          <div className="bg-section p-4 rounded-md inline-block">
            <p className="text-sm font-medium">A confirmation has been sent to <strong>{identity.email}</strong>.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto outline-none" id="begin" ref={containerRef} tabIndex={-1}>
      <div className="bg-card border border-border p-8 md:p-12 rounded-card shadow-sm">
        
        {error && (
          <div className="mb-8 p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-md text-sm font-medium">
            {error}
          </div>
        )}

        {step === 0 && (
          <form onSubmit={handleIdentitySubmit}>
            <div className="mb-10">
              <h2 className="text-3xl font-serif-display italic mb-2 text-foreground">Before you begin.</h2>
              <p className="text-muted-foreground text-[0.98rem]">We use this to send your read-back. Nothing else.</p>
            </div>
            
            <div className="space-y-6 max-w-xl">
              <div>
                <label htmlFor="diag-name" className="block text-sm font-medium mb-2 text-foreground">Your name <span className="text-muted-foreground font-normal">(required)</span></label>
                <input 
                  id="diag-name" 
                  type="text" 
                  required
                  className="w-full bg-input/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-md px-4 py-2.5 outline-none transition-colors" 
                  value={identity.name} 
                  onChange={e => setIdentity(prev => ({...prev, name: e.target.value}))} 
                />
              </div>
              <div>
                <label htmlFor="diag-email" className="block text-sm font-medium mb-2 text-foreground">Email <span className="text-muted-foreground font-normal">(required)</span></label>
                <input 
                  id="diag-email" 
                  type="email" 
                  required
                  className="w-full bg-input/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-md px-4 py-2.5 outline-none transition-colors" 
                  value={identity.email} 
                  onChange={e => setIdentity(prev => ({...prev, email: e.target.value}))} 
                />
              </div>
              <div>
                <label htmlFor="diag-org" className="block text-sm font-medium mb-2 text-foreground">Organization <span className="text-muted-foreground font-normal">(optional)</span></label>
                <input 
                  id="diag-org" 
                  type="text" 
                  className="w-full bg-input/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-md px-4 py-2.5 outline-none transition-colors" 
                  value={identity.organizationName} 
                  onChange={e => setIdentity(prev => ({...prev, organizationName: e.target.value}))} 
                />
              </div>
              <div>
                <label htmlFor="diag-role" className="block text-sm font-medium mb-2 text-foreground">Your role <span className="text-muted-foreground font-normal">(optional)</span></label>
                <input 
                  id="diag-role" 
                  type="text" 
                  placeholder="Senior pastor, executive director, provost..."
                  className="w-full bg-input/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-md px-4 py-2.5 outline-none transition-colors placeholder:text-muted-foreground/60" 
                  value={identity.role} 
                  onChange={e => setIdentity(prev => ({...prev, role: e.target.value}))} 
                />
              </div>
            </div>
            
            <div className="mt-12 flex justify-end">
              <button type="submit" className="btn-pill btn-pill--primary">Begin section 1</button>
            </div>
          </form>
        )}

        {step > 0 && step <= 6 && (
          <div>
            {(() => {
              const dimIndex = step - 1;
              const dimension = DIMENSIONS[dimIndex];
              const questions = QUESTIONS_BY_DIMENSION[dimension.id as keyof typeof QUESTIONS_BY_DIMENSION] || [];

              return (
                <>
                  <div className="mb-12">
                    <span className="text-xs font-semibold uppercase tracking-widest text-ink-soft mb-4 block">Section {dimension.num}</span>
                    <h3 className="text-3xl font-serif-display italic mb-4 text-foreground">{dimension.title}.</h3>
                    <p className="text-muted-foreground text-[1.0625rem] leading-[1.75] max-w-2xl">{dimension.body}</p>
                  </div>

                  <div className="space-y-16">
                    {questions.map((q, i) => {
                      const qNum = Object.keys(answers).indexOf(q.id) >= 0 
                        ? Object.keys(answers).indexOf(q.id) + 1 
                        : Object.keys(answers).length + i + 1; // rough estimation for display

                      return (
                        <fieldset key={q.id} className="diag-preview__question border-0 p-0 m-0">
                          <legend className="text-lg font-medium text-foreground mb-6 float-left w-full">Q{dimIndex + 1}.{i + 1}. {q.prompt}</legend>
                          
                          <div className="diag-preview__options grid gap-3 clear-both">
                            {q.options.map((opt, optIdx) => {
                              const isSelected = answers[q.id] === optIdx;
                              return (
                                <label 
                                  key={optIdx} 
                                  className={cn(
                                    "diag-preview__radio flex items-center p-4 border rounded-md cursor-pointer transition-all",
                                    isSelected ? "border-primary bg-primary/5 is-selected" : "border-border hover:border-foreground/30 bg-card"
                                  )}
                                >
                                  <input 
                                    type="radio" 
                                    name={q.id} 
                                    value={optIdx}
                                    checked={isSelected}
                                    onChange={() => handleOptionSelect(q.id, optIdx)}
                                    className="sr-only"
                                  />
                                  <div className={cn(
                                    "w-5 h-5 rounded-full border mr-4 flex-shrink-0 flex items-center justify-center",
                                    isSelected ? "border-primary" : "border-outline"
                                  )}>
                                    {isSelected && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                                  </div>
                                  <span className={cn(
                                    "text-[0.98rem]",
                                    isSelected ? "text-foreground font-medium" : "text-muted-foreground"
                                  )}>{opt}</span>
                                </label>
                              );
                            })}
                          </div>
                        </fieldset>
                      );
                    })}

                    <div className="pt-8 border-t border-border-soft">
                      <label htmlFor={`followup-${dimension.id}`} className="block text-lg font-medium mb-2 text-foreground">Show your work <span className="text-muted-foreground font-normal text-base">(optional)</span></label>
                      <p className="text-sm text-muted-foreground mb-4 max-w-2xl">One or two sentences. What is true on the ground that the multiple choice didn't quite capture? The read-back is built from these notes. Plain language helps more than the right word.</p>
                      <textarea 
                        id={`followup-${dimension.id}`}
                        maxLength={2000}
                        rows={3}
                        className="w-full bg-input/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-md p-4 outline-none transition-colors resize-y text-[0.98rem]"
                        placeholder="Additional context..."
                        value={followUps[dimension.id] || ''}
                        onChange={e => setFollowUps(prev => ({...prev, [dimension.id]: e.target.value}))}
                      />
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {step === 7 && (
          <div>
            <div className="mb-10">
              <h2 className="text-3xl font-serif-display italic mb-2 text-foreground">Last look.</h2>
              <p className="text-muted-foreground text-[0.98rem] max-w-2xl">We will read your diagnostic against the version dated today. You can still go back and change any answer.</p>
            </div>
            
            <div className="bg-section rounded-card p-8 mb-10">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-soft mb-6">Summary</h3>
              <dl className="grid sm:grid-cols-2 gap-y-6 gap-x-8 text-[0.98rem]">
                <div>
                  <dt className="text-muted-foreground mb-1 text-sm">Name</dt>
                  <dd className="font-medium text-foreground">{identity.name}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground mb-1 text-sm">Email</dt>
                  <dd className="font-medium text-foreground">{identity.email}</dd>
                </div>
                {identity.organizationName && (
                  <div>
                    <dt className="text-muted-foreground mb-1 text-sm">Organization</dt>
                    <dd className="font-medium text-foreground">{identity.organizationName}</dd>
                  </div>
                )}
                {identity.role && (
                  <div>
                    <dt className="text-muted-foreground mb-1 text-sm">Role</dt>
                    <dd className="font-medium text-foreground">{identity.role}</dd>
                  </div>
                )}
                <div className="sm:col-span-2">
                  <dt className="text-muted-foreground mb-1 text-sm">Progress</dt>
                  <dd className="font-medium text-foreground">
                    {answersCount} of {TOTAL_QUESTIONS} questions answered
                  </dd>
                </div>
              </dl>
            </div>

            {!isComplete && (
              <aside className="evidence-note mb-10 bg-accent p-6 rounded-md border border-border">
                <span className="font-medium text-foreground block mb-4">Still to do</span>
                <p className="text-sm text-muted-foreground mb-4">You have unanswered questions. This is okay, but completing them provides a more accurate read-back.</p>
                <div className="flex flex-wrap gap-2">
                  {DIMENSIONS.map((dim, i) => {
                    const qIds = QUESTIONS_BY_DIMENSION[dim.id as keyof typeof QUESTIONS_BY_DIMENSION]?.map(q => q.id) || [];
                    const answered = qIds.filter(id => answers[id] !== undefined).length;
                    if (answered < qIds.length) {
                      return (
                        <button key={dim.id} onClick={() => setStep(i + 1)} className="text-xs py-1.5 px-3 bg-card border border-border rounded-full hover:border-foreground transition-colors">
                          Section {dim.num}
                        </button>
                      );
                    }
                    return null;
                  })}
                </div>
              </aside>
            )}

            <div className="mb-10">
              <label htmlFor="closing-note" className="block text-lg font-medium mb-2 text-foreground">Anything else we should know? <span className="text-muted-foreground font-normal text-base">(optional)</span></label>
              <p className="text-sm text-muted-foreground mb-4 max-w-2xl">Context, constraints, what would make the read-back useful — or what we should not write back about. Plain language is fine.</p>
              <textarea 
                id="closing-note"
                maxLength={5000}
                rows={4}
                className="w-full bg-input/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-md p-4 outline-none transition-colors resize-y text-[0.98rem]"
                value={closingNote}
                onChange={e => setClosingNote(e.target.value)}
              />
            </div>
            
            <p className="text-xs text-muted-foreground text-center max-w-xl mx-auto mb-8">
              Your responses are held confidentially by the Movemental founders. No score, no benchmark, no public leaderboard.
            </p>
          </div>
        )}

        {step > 0 && (
          <div className="mt-12 flex justify-between items-center border-t border-border pt-8">
            <button 
              onClick={handlePrev} 
              type="button"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Back
            </button>
            
            {step < 7 ? (
              <button 
                onClick={handleNext} 
                type="button"
                className="btn-pill btn-pill--primary"
              >
                Continue
              </button>
            ) : (
              <button 
                onClick={handleSubmitDiagnostic}
                disabled={isSubmitting}
                type="button"
                className="btn-pill btn-pill--primary"
              >
                {isSubmitting ? 'Submitting...' : 'Send the diagnostic'}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
