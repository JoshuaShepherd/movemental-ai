"use client";

import { cn } from "@/lib/utils";

interface ReaderEbookDarkProps {
  className?: string;
}

export function ReaderEbookDark({ className }: ReaderEbookDarkProps) {
  return (
    <section className={cn("relative w-full min-h-[70vh] md:min-h-[80vh] flex items-center justify-center bg-mvmt-surface-dark", className)} >
      {/* Reader Modal */}
      <div
        className="w-full max-w-5xl mx-4 rounded-lg overflow-hidden flex flex-col bg-mvmt-surface-light"
        style={{ minHeight: "70vh" }}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-b-mvmt-border-light">
          <button className="flex items-center gap-2 text-sm text-mvmt-text-secondary">
            ‹ Back to store
          </button>
          <span className="text-sm font-medium text-mvmt-text-primary">
            The Sending Church: A Field Guide for Movement Makers
          </span>
          <div className="flex items-center gap-3">
            <span className="text-mvmt-text-muted">🔍</span>
            <span className="text-sm text-mvmt-text-muted">Aa</span>
          </div>
        </div>

        {/* Book Content */}
        <div className="flex-1 px-8 sm:px-16 md:px-24 py-10 grid md:grid-cols-2 gap-8">
          <div>
            <h3
              className="text-sm font-bold tracking-[0.3em] text-center mb-8 text-mvmt-text-primary"
            >
              PROLOGUE
            </h3>
            <p className="text-sm leading-[1.8] text-justify text-mvmt-text-primary font-mvmt-heading">
              <span className="text-5xl font-bold float-left mr-2 leading-none text-mvmt-text-primary">I</span>n the next twenty-four months, our church will be sending our first team to plant in a new city. I don&rsquo;t know how this could be happening. I&rsquo;m not the kind of pastor who sends planters. I&rsquo;m <em>not</em>. I&rsquo;ve never even attended a church planting conference. I&rsquo;ve never even thought about multiplication before. I&rsquo;m the most traditional pastor who ever was.
            </p>
            <p className="text-sm leading-[1.8] text-justify mt-4 text-mvmt-text-primary font-mvmt-heading">
              &ldquo;They have a pretty solid case against you, Pastor.&rdquo;
            </p>
            <p className="text-sm leading-[1.8] text-justify mt-4 text-mvmt-text-primary font-mvmt-heading">
              My coach, Robert, does not sugar coat things. I&rsquo;ve only known him a short time, but I already know he&rsquo;s not about handholding and comfort zones. He has spent the last twenty minutes enumerating all the obstacles against our sending plan. And when I hear it all laid out for me like that, it sounds impossible.
            </p>
          </div>
          <div>
            <p className="text-sm leading-[1.8] text-justify text-mvmt-text-primary font-mvmt-heading">
              The whole time I was listening to Robert, my heart was thumping wildly in my chest. It actually made it a bit hard to hear him for stretches of time. To my right, my associate Sam is slumped in his chair, a glassy look in his eyes. Sam was the one who brought up the idea of sending. <em>He&rsquo;s your best chance, Pastor,</em> he told me. So if Robert can&rsquo;t help me, that means I have no chance.
            </p>
            <p className="text-sm leading-[1.8] text-justify mt-4 text-mvmt-text-primary font-mvmt-heading">
              &ldquo;It&rsquo;s all circumstantial evidence,&rdquo; I say, even though I&rsquo;m not certain that&rsquo;s the case or even exactly what circumstantial evidence is. But I know one thing: &ldquo;I didn&rsquo;t do it.&rdquo;
            </p>
            <p className="text-sm leading-[1.8] text-justify mt-4 text-mvmt-text-primary font-mvmt-heading">
              Robert lets out an extended sigh and folds his arms across his chest. &ldquo;You have to understand that if this goes to the denomination, you&rsquo;re going to be celebrated.&rdquo;
            </p>
            <p className="text-sm leading-[1.8] text-justify mt-4 text-mvmt-text-primary font-mvmt-heading">
              &ldquo;<em>If</em> this goes public?&rdquo;
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="px-8 sm:px-16 md:px-24 pb-6">
          <div className="w-full h-1 rounded-full mb-2 bg-mvmt-border-light" >
            <div className="h-full w-[3%] rounded-full bg-mvmt-text-muted"  />
          </div>
          <p className="text-xs text-center text-mvmt-text-muted">
            Location 157 of 583 • 3%
          </p>
        </div>
      </div>
    </section>
  );
}

ReaderEbookDark.displayName = "ReaderEbookDark";
