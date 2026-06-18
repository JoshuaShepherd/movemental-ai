"use client";

import * as React from "react";

import {
  safetyFlowStepAfterAnswer,
  SAFETY_FLOW_SIGNUP_COPY,
  type SafetyFlowAnswer,
  type SafetyFlowStep,
} from "@/lib/agent-room/data/safety-flow";
import type { ScreenProps } from "../stub/stub-screen";
import styles from "../../ink-band.module.css";
import { Crumb } from "../stub/chrome";
import { SafetyFlowAhead } from "./safety-flow-ahead";
import { SafetyFlowCharter } from "./safety-flow-charter";
import { SafetyFlowDiy } from "./safety-flow-diy";
import { SafetyFlowFork } from "./safety-flow-fork";
import { SafetyFlowQuestion } from "./safety-flow-question";
import { SafetyFlowResult } from "./safety-flow-result";
import { SafetyFlowSignup } from "./safety-flow-signup";
import { SafetyFlowStepper } from "./safety-flow-stepper";

function parseEngineAnswer(raw: string | undefined): SafetyFlowAnswer | null {
  if (raw === "start" || raw === "draft" || raw === "done") return raw;
  return null;
}

function initialStep(step: string | undefined): SafetyFlowStep {
  if (
    step === "question" ||
    step === "result" ||
    step === "ahead" ||
    step === "charter" ||
    step === "fork" ||
    step === "diy" ||
    step === "signup" ||
    step === "signup_sent"
  ) {
    return step;
  }
  return "question";
}

/** Self-serve Safety flow wizard — primary on-ramp from "Get a clear next AI step". */
export function SafetyFlowScreen({ opts, onHome, onRunScene, disabled }: ScreenProps) {
  const engineAnswer = parseEngineAnswer(opts.answer);

  const [step, setStep] = React.useState<SafetyFlowStep>(() => initialStep(opts.step));
  const [answer, setAnswer] = React.useState<SafetyFlowAnswer | null>(engineAnswer);

  React.useEffect(() => {
    const nextStep = initialStep(opts.step);
    setStep(nextStep);
    if (engineAnswer) {
      setAnswer(engineAnswer);
      return;
    }
    if (nextStep === "question") {
      setAnswer(null);
    }
  }, [opts.step, opts.answer, engineAnswer]);

  const handleAnswer = (a: SafetyFlowAnswer) => {
    setAnswer(a);
    setStep(safetyFlowStepAfterAnswer(a));
  };

  const effectiveAnswer: SafetyFlowAnswer | null =
    answer ?? (step === "result" ? "start" : step === "ahead" ? "done" : null);
  const resultAnswer: SafetyFlowAnswer =
    effectiveAnswer === "draft" ? "draft" : "start";

  return (
    <div className={styles.flowWrap}>
      <Crumb onHome={onHome} />
      <SafetyFlowStepper step={step} />

      {step === "question" ? <SafetyFlowQuestion disabled={disabled} onAnswer={handleAnswer} /> : null}

      {step === "result" && effectiveAnswer ? (
        <SafetyFlowResult
          answer={resultAnswer}
          disabled={disabled}
          onNext={() => setStep("charter")}
          onBack={() => setStep("question")}
        />
      ) : null}

      {step === "ahead" ? (
        <SafetyFlowAhead
          disabled={disabled}
          onRevisitCharter={() => setStep("charter")}
          onBack={() => setStep("question")}
          onRunScene={onRunScene}
        />
      ) : null}

      {step === "charter" ? (
        <SafetyFlowCharter
          disabled={disabled}
          onNext={() => setStep("fork")}
          onBack={() => setStep(effectiveAnswer === "done" ? "ahead" : "result")}
        />
      ) : null}

      {step === "fork" ? (
        <SafetyFlowFork disabled={disabled} onSelect={setStep} onBack={() => setStep("charter")} />
      ) : null}

      {step === "diy" ? (
        <SafetyFlowDiy
          disabled={disabled}
          onBack={() => setStep("fork")}
          onDashboard={() => setStep("signup")}
        />
      ) : null}

      {step === "signup" ? (
        <SafetyFlowSignup
          disabled={disabled}
          onBack={() => setStep("fork")}
          onSent={() => setStep("signup_sent")}
        />
      ) : null}

      {step === "signup_sent" ? (
        <div className={styles.flowStep}>
          <p className={`${styles.eyebrow} ${styles.flowEyebrowCenter}`}>{SAFETY_FLOW_SIGNUP_COPY.eyebrow}</p>
          <h1 className={`${styles.q} ${styles.flowTitleCenter}`}>{SAFETY_FLOW_SIGNUP_COPY.sentTitle}</h1>
          <p className={`${styles.sub} ${styles.flowSubCenter}`}>{SAFETY_FLOW_SIGNUP_COPY.sentBody}</p>
        </div>
      ) : null}
    </div>
  );
}
