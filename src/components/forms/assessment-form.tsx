"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const dimensions = [
  {
    key: "content",
    title: "Content Infrastructure",
    questions: [
      "How organized and accessible is your existing teaching content?",
      "Can your content be found, searched, and reused across contexts?",
      "Is your content structured for learning pathways, or just published chronologically?",
    ],
  },
  {
    key: "pathways",
    title: "Pathway Design",
    questions: [
      "Do people follow guided journeys through your material, or consume randomly?",
      "Can someone new find a clear starting point and progression?",
      "Are your learning pathways connected to outcomes you can observe?",
    ],
  },
  {
    key: "community",
    title: "Community Integration",
    questions: [
      "Does learning happen in relationship with others, or mostly in isolation?",
      "Can community members support each other's formation journeys?",
      "Is community activity connected to content and pathways, or separate?",
    ],
  },
  {
    key: "sustainability",
    title: "Sustainability",
    questions: [
      "Does your digital work generate revenue that sustains itself?",
      "Can your current model scale without proportional cost increases?",
      "Are your economics aligned between you and your platform providers?",
    ],
  },
  {
    key: "coherence",
    title: "System Coherence",
    questions: [
      "Do your digital tools work together as a connected system?",
      "Can data and insights flow between your content, community, and commerce?",
      "Would someone experiencing your work online feel it's one coherent thing?",
    ],
  },
] as const;

const scaleLabels = [
  { value: 1, label: "Not at all" },
  { value: 2, label: "Barely" },
  { value: 3, label: "Somewhat" },
  { value: 4, label: "Mostly" },
  { value: 5, label: "Strongly" },
];

type Scores = Record<string, number>;

type Phase = "questions" | "email" | "results";

export function AssessmentForm() {
  const [phase, setPhase] = React.useState<Phase>("questions");
  const [currentDimension, setCurrentDimension] = React.useState(0);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [answers, setAnswers] = React.useState<number[]>([]);
  const [email, setEmail] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [scores, setScores] = React.useState<Scores | null>(null);
  const [totalScore, setTotalScore] = React.useState(0);

  const totalQuestions = dimensions.reduce((acc, d) => acc + d.questions.length, 0);
  const answeredCount = answers.length;
  const dim = dimensions[currentDimension];
  const question = dim?.questions[currentQuestion];

  function handleAnswer(value: number) {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < dim.questions.length - 1) {
      setCurrentQuestion((q) => q + 1);
    } else if (currentDimension < dimensions.length - 1) {
      setCurrentDimension((d) => d + 1);
      setCurrentQuestion(0);
    } else {
      // All questions answered — compute scores
      const computed: Scores = {};
      let idx = 0;
      for (const d of dimensions) {
        let sum = 0;
        for (let q = 0; q < d.questions.length; q++) {
          sum += newAnswers[idx] ?? 0;
          idx++;
        }
        computed[d.key] = sum;
      }
      const total = Object.values(computed).reduce((a, b) => a + b, 0);
      setScores(computed);
      setTotalScore(total);
      setPhase("email");
    }
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!scores) return;
    setSubmitting(true);

    try {
      await fetch("/api/assess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, scores, total_score: totalScore }),
      });
    } catch {
      // Non-blocking — show results even if save fails
    }

    setSubmitting(false);
    setPhase("results");
  }

  if (phase === "email" && scores) {
    return (
      <div className="mx-auto max-w-lg rounded-xl bg-card p-8 text-center">
        <p className="text-lg font-semibold text-foreground">Your assessment is ready.</p>
        <p className="mt-2 text-sm text-muted-foreground">Enter your email to see your full results.</p>
        <form onSubmit={handleEmailSubmit} className="mt-6">
          <Label htmlFor="assess-email" className="sr-only">Email</Label>
          <Input
            id="assess-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="h-11"
          />
          <Button
            type="submit"
            disabled={submitting}
            className="mt-4 h-12 w-full bg-linear-to-br from-primary to-primary-dim text-base font-semibold text-primary-foreground hover:opacity-92"
          >
            {submitting ? "Saving..." : "See my results"}
          </Button>
        </form>
      </div>
    );
  }

  if (phase === "results" && scores) {
    const lowestKey = Object.entries(scores).reduce((a, b) => (a[1] < b[1] ? a : b))[0];
    const lowestDim = dimensions.find((d) => d.key === lowestKey);

    const interpretations: Record<string, string> = {
      content: "Your content infrastructure — how organized, accessible, and reusable your teaching material is.",
      pathways: "Your pathway design — whether people follow guided formation journeys or consume randomly.",
      community: "Your community integration — whether learning happens in relationship or isolation.",
      sustainability: "Your sustainability model — whether your digital work generates aligned, scalable revenue.",
      coherence: "Your system coherence — whether your tools work together as one connected experience.",
    };

    return (
      <div className="space-y-8">
        <div className="rounded-xl bg-card p-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">Your Formation System Score</p>
          <p className="mt-2 text-5xl font-bold tracking-[-0.02em] text-foreground">{totalScore}<span className="text-2xl text-muted-foreground"> / 75</span></p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dimensions.map((d) => {
            const score = scores[d.key] ?? 0;
            const pct = Math.round((score / 15) * 100);
            return (
              <div key={d.key} className="rounded-xl bg-card p-6">
                <p className="text-sm font-semibold text-foreground">{d.title}</p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-section">
                  <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{score} / 15</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{interpretations[d.key]}</p>
              </div>
            );
          })}
        </div>

        <div className="rounded-xl bg-section p-8">
          <p className="font-semibold text-foreground">Your biggest opportunity</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Based on your responses, <strong className="text-foreground">{lowestDim?.title}</strong> is where focused attention could have the most impact. This is common — most organizations have one or two dimensions that are significantly underdeveloped relative to others.
          </p>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">Want to explore what this means for your work?</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-linear-to-br from-primary to-primary-dim px-8 py-4 text-base font-semibold text-primary-foreground hover:opacity-92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Start a conversation
            </Link>
            <Link href="/fragmentation" className="text-sm font-medium text-primary hover:underline">Read the fragmentation story &rarr;</Link>
          </div>
        </div>
      </div>
    );
  }

  // Questions phase
  return (
    <div className="mx-auto max-w-lg">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{dim.title}</span>
          <span>{answeredCount + 1} of {totalQuestions}</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-section">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(answeredCount / totalQuestions) * 100}%` }} />
        </div>
      </div>

      {/* Question */}
      <div className="rounded-xl bg-card p-8">
        <p className="text-lg font-semibold leading-relaxed text-foreground">{question}</p>
        <div className="mt-8 flex flex-col gap-3">
          {scaleLabels.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => handleAnswer(s.value)}
              className="flex items-center gap-4 rounded-lg border border-border px-4 py-3 text-left text-sm transition-colors hover:border-primary/40 hover:bg-primary/5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-section text-xs font-bold text-foreground">{s.value}</span>
              <span className="text-muted-foreground">{s.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
