"use client";

import { useState, type KeyboardEvent } from "react";

import styles from "../../ink-band.module.css";
import type { ScreenProps } from "./stub-screen";
import { CAPTURE_VARIANTS, EMAIL_RE, isCaptureKind, type CaptureKind } from "@/lib/agent-room/capture";

/**
 * Capture screen (prototype `renderScreen('capture', {kind})`). Renders one of
 * the three lead surfaces into the sheet, in the paper/ink language — the same
 * rounded `.field` cells the composer uses, stacked full-width. Inline, gentle
 * validation (thin margin-red border + a mono helper line); no `<form>`, no
 * `alert()`, no storage. On a valid submit it hands clean values up to the
 * runner host (`onCaptureSubmit`), which stores them and resolves the awaiting
 * scene. The map variant offers a soft skip straight to Safety.
 */
// The capture form is the act the scene is *awaiting*, so it stays interactive
// even though the runner is "busy" — it deliberately ignores `disabled`.
export function CaptureScreen({ opts, onCaptureSubmit, onCaptureSkip, stream }: ScreenProps) {
  // Stream mode (INT-02): the agent picks the variant via `props.kind`; stub mode
  // reads it from `opts.kind`. All four kinds (`map`/`paid`/`free`/`discuss`) are
  // real variants (INT-09 added the long-form Discuss capture). Unknown → `map`.
  const requested = stream ? (stream.props.kind as string | undefined) : opts.kind;
  const kind: CaptureKind = isCaptureKind(requested) ? requested : "map";
  const variant = CAPTURE_VARIANTS[kind];

  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setField = (k: string, v: string) => setValues((s) => ({ ...s, [k]: v }));

  const submit = () => {
    const errs: Record<string, string> = {};
    for (const f of variant.fields) {
      const v = (values[f.key] ?? "").trim();
      if (f.required && !v) errs[f.key] = "Required.";
      else if (f.type === "email" && v && !EMAIL_RE.test(v)) errs[f.key] = "That email doesn’t look right.";
    }
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    const clean: Record<string, string> = {};
    for (const f of variant.fields) clean[f.key] = (values[f.key] ?? "").trim();
    onCaptureSubmit(kind, clean);
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div id="capture">
      <p className={styles.eyebrow}>{variant.eyebrow}</p>
      <p className={styles.q}>{variant.heading}</p>
      <p className={styles.body} style={{ marginTop: "0.5rem" }}>
        {variant.sub}
      </p>
      <div className={styles.cap}>
        {variant.fields.map((f, i) => (
          <div className={styles.capCell} key={f.key}>
            <label className={styles.capLabel} htmlFor={`cap-${f.key}`}>
              {f.label}
              {f.required && <span className={styles.capReq}> *</span>}
            </label>
            <div className={`${styles.capField} ${errors[f.key] ? styles.capFieldErr : ""}`}>
              <input
                id={`cap-${f.key}`}
                type={f.type}
                autoComplete={f.autoComplete}
                placeholder={f.placeholder}
                value={values[f.key] ?? ""}
                onChange={(e) => setField(f.key, e.target.value)}
                onKeyDown={onKey}
                autoFocus={i === 0}
              />
            </div>
            {errors[f.key] && <p className={styles.capErr}>{errors[f.key]}</p>}
          </div>
        ))}
        <button type="button" id="capSubmit" className={styles.capSubmit} onClick={submit}>
          {variant.submit}
        </button>
      </div>
      {variant.skip && (
        <button type="button" className={styles.capSkip} onClick={onCaptureSkip}>
          {variant.skip}
        </button>
      )}
    </div>
  );
}
