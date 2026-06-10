"use client";

import { useState } from "react";

import styles from "../../ink-band.module.css";
import type { ScreenProps } from "./stub-screen";
import { Crumb } from "./chrome";

const TOPICS = [
  "Exploring whether this fits",
  "Starting with Safety",
  "Pricing or an engagement",
  "Something else",
];

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * The contact form (prototype `CONTACT_HTML` + `bindContactForm`) — **UI only**.
 * Topic-chip select, inline validation, and a mock submit → success state, all
 * client-side. It does **not** POST to `/api/contact` (deferred to a product
 * decision, per AF-90); the success toast is local, matching the prototype's
 * "No autoresponder" framing.
 */
export function ContactScreen({ onHome }: ScreenProps) {
  const [topic, setTopic] = useState(0);
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: boolean; email?: boolean; message?: boolean }>({});
  const [sentName, setSentName] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
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
    // UI only — no network. The prototype reads `topic` here too.
    setErrors({});
    setSentName(name.trim().split(/\s+/)[0]);
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
          <button type="submit" className={styles.cfSubmit}>
            Send message <span aria-hidden="true">→</span>
          </button>
          <span className={styles.cfNote}>No autoresponder. A person on our team will reply.</span>
        </div>
      </form>
    </div>
  );
}
