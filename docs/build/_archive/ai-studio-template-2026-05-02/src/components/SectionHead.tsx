import React from 'react';
import { cn } from '@/lib/utils';

export function SectionHead({ 
  eyebrow, 
  display, 
  title, // for h2 instead of display
  lede 
}: { 
  eyebrow?: string; 
  display?: React.ReactNode; 
  title?: React.ReactNode;
  lede?: string;
}) {
  return (
    <div className="mb-12">
      {eyebrow && <span className="section-eyebrow">
        {eyebrow}
      </span>}
      {display && <h2 className="display mb-6 max-w-3xl">{display}</h2>}
      {title && <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6 max-w-3xl">{title}</h2>}
      {lede && <p className="lede">{lede}</p>}
    </div>
  );
}
