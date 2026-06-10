"use client";

import { useState } from "react";

import styles from "../../ink-band.module.css";
import type { ScreenProps } from "./stub-screen";
import { Crumb } from "./chrome";

const TOPICS = [
  "Starting with Safety",
  "Exploring whether this fits",
  "Pricing or an engagement",
  "Something else",
];

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * The contact form (prototype `CONTACT_HTML` + `bindContactForm`).
 * Topic-chip select, inline validation, then a real POST to `/api/contact`
 * (which stores `contact_submissions` and sends the inbox notify + submitter
 * ack). The local success state is the fallback path: if the network call
 * fails, the visitor still sees confirmation rather than a dead form.
 */
export function ContactScreen({ onHome }: ScreenProps) {
  const [topic, setTopic] = useState(0);
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: boolean; email?: boolean; message?: boolean }>({});
  const [sentName, setSentName] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next = {
      name: !name.trim(),
      email: !EMAIL_RE.test(email.trim()),
      message: !message.trim(),
    };
    if (next.name || next.email || next.message) {
      setErrors(next);
      return;
    }
    setErrors({});
    setSubmitting(true);

    const firstName = name.trim().split(/\s+/)[0];
    // Topic is intent, not audience; carry it in the message and pin the
    // room's audience segment for the API enum.
    const composedMessage = `[Topic: ${TOPICS[topic]}]\n\n${message.trim()}`;

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          organization: org.trim() || undefined,
          audience_segment: "Organization / institution",
          message: composedMessage,
        }),
      });
    } catch (err) {
      // Fallback: never strand the visitor on a failed network call.
      console.error("[contact] POST failed; showing local confirmation", err);
    } finally {
      setSubmitting(false);
      setSentName(firstName);
    }
  };

  if (sentName) {
    return (
      <div>
        <Crumb onHome={onHome} />
        <p className={styles.eyebrow}>Contact</p>
        <div className={`${styles.cfSuccess} ${styles.cfSuccessIn}`}>
          <svg className={styles.cfCheck} viewBox="0 0 52 52" aria-hidden="true">
            <circle cx="26" cy="26" r="24" />
            <path d="M16 27 l7 7 l13 -15" />
          </svg>
          <h3 className={styles.cfSuccessH}>Got it, {sentName}.</h3>
          <p className={styles.cfSuccessP}>
            We got your message and will be in touch — usually within a business day.
          </p>
          <button
            type="button"
            className={styles.chip}
            onClick={() => {
              setSentName(null);
              setName("");
              setOrg("");
              setEmail("");
              setMessage("");
            }}
          >
            Send another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Crumb onHome={onHome} />
      <p className={styles.eyebrow}>Contact</p>
      <p className={styles.q} style={{ marginBottom: "0.5rem" }}>
        Get in touch
      </p>
      <p className={styles.body} style={{ marginTop: "0.4rem", marginBottom: "1.15rem" }}>
        Tell us a bit about your organization and what you’re wondering about. We read
        every message and reply personally — usually within a business day.
      </p>

      <form className={styles.cform} onSubmit={submit} noValidate>
        <div className={styles.cformRow}>
          <label className={styles.cfield}>
            <span className={styles.cflabel}>Name</span>
            <input
              type="text"
              autoComplete="name"
              className={errors.name ? styles.cfInvalid : undefined}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((p) => ({ ...p, name: false }));
              }}
            />
          </label>
          <label className={styles.cfield}>
            <span className={styles.cflabel}>
              Organization <em>(optional)</em>
            </span>
            <input
              type="text"
              autoComplete="organization"
              value={org}
              onChange={(e) => setOrg(e.target.value)}
            />
          </label>
        </div>

        <label className={styles.cfield}>
          <span className={styles.cflabel}>Email</span>
          <input
            type="email"
            autoComplete="email"
            inputMode="email"
            className={errors.email ? styles.cfInvalid : undefined}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((p) => ({ ...p, email: false }));
            }}
          />
        </label>

        <div className={styles.cfield}>
          <span className={styles.cflabel}>What are you reaching out about?</span>
          <div className={styles.cchips}>
            {TOPICS.map((t, i) => (
              <button
                key={t}
                type="button"
                className={`${styles.cchip} ${i === topic ? styles.on : ""}`}
                onClick={() => setTopic(i)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <label className={styles.cfield}>
          <span className={styles.cflabel}>Message</span>
          <textarea
            rows={4}
            className={errors.message ? styles.cfInvalid : undefined}
            placeholder="A sentence or two is enough — where your organization stands, and what would be helpful to talk through."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (errors.message) setErrors((p) => ({ ...p, message: false }));
            }}
          />
        </label>

        <div className={styles.cformFoot}>
          <button type="submit" className={styles.cfSubmit} disabled={submitting}>
            {submitting ? "Sending…" : "Send message"} <span aria-hidden="true">→</span>
          </button>
          <span className={styles.cfNote}>No autoresponder. A person on our team will reply.</span>
        </div>
      </form>
    </div>
  );
}
