import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PathwayStop {
  num: string;
  name: string;
  duration: string;
  price: string;
  outcome: string;
  href?: string;
  deliverables?: string[];
}

interface PathwayComponentProps {
  stops: PathwayStop[];
}

export function PathwayComponent({ stops }: PathwayComponentProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full space-y-4">
      {stops.map((stop, index) => {
        const isOpen = openIndex === index;
        const hasDeliverables = stop.deliverables && stop.deliverables.length > 0;
        
        return (
          <div 
            key={stop.num}
            className="bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300"
          >
            <div 
              className={cn(
                "p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6",
                hasDeliverables ? "cursor-pointer hover:bg-section/50 transition-colors" : ""
              )}
              onClick={() => hasDeliverables && toggleOpen(index)}
            >
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-sm font-semibold uppercase tracking-widest text-primary/70">{stop.num}</span>
                  <div className="flex gap-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <span className="bg-section px-2 py-1 rounded-md">{stop.duration}</span>
                    <span className="bg-section px-2 py-1 rounded-md">{stop.price}</span>
                  </div>
                </div>
                <h3 className="font-serif-display text-3xl italic mb-2 text-foreground">{stop.name}</h3>
                <p className="text-[1.0625rem] leading-relaxed text-muted-foreground max-w-2xl">{stop.outcome}</p>
              </div>
              
              {hasDeliverables && (
                <div className="flex items-center justify-start md:justify-end text-primary">
                  <span className="text-sm font-medium mr-2">{isOpen ? 'Hide Scope' : 'View Scope'}</span>
                  <ChevronDown className={cn("w-5 h-5 transition-transform duration-300", isOpen && "rotate-180")} />
                </div>
              )}
            </div>
            
            {hasDeliverables && (
              <div 
                className={cn(
                  "grid transition-all duration-300 ease-in-out",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <div className="p-6 md:p-8 pt-0 border-t border-border bg-section/30 mt-4">
                    <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground mb-6 mt-6">Included Deliverables</h4>
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
                      {stop.deliverables?.map((item, i) => (
                        <div key={i} className="flex items-start text-[1.0625rem] text-muted-foreground">
                          <span className="text-primary mr-3 mt-1">—</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                    {stop.href && (
                      <div className="mt-8 pt-4">
                        <Link to={stop.href} className="btn-pill btn-pill--ghost text-sm">More details</Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
