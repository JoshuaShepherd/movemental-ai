"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import type { MastAuthMenu, MastAuthRole } from "@/lib/agent-room/mast-auth-menus";

import styles from "../ink-band.module.css";

type MastAuthState =
  | { status: "signed-out" }
  | { status: "signed-in"; role: MastAuthRole; menu: MastAuthMenu };

function SignInIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" y1="12" x2="3" y2="12" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

/**
 * Mast auth cluster — sign-in affordance when anonymous; account menu when
 * session is present. Matches `docs/html/home` markup and menu links.
 */
export function MastAuth() {
  const menuId = useId();
  const [auth, setAuth] = useState<MastAuthState>({ status: "signed-out" });
  const [menuOpen, setMenuOpen] = useState(false);
  const clusterRef = useRef<HTMLDivElement>(null);

  const loadMenu = useCallback(async () => {
    const res = await fetch("/api/agent-room/mast-auth", { credentials: "same-origin" });
    if (!res.ok) {
      setAuth({ status: "signed-out" });
      return;
    }
    const data = (await res.json()) as
      | { role: "signed-out" }
      | { role: MastAuthRole; label: string; links: MastAuthMenu["links"] };
    if (data.role === "signed-out") {
      setAuth({ status: "signed-out" });
      return;
    }
    setAuth({
      status: "signed-in",
      role: data.role,
      menu: { label: data.label, links: data.links },
    });
  }, []);

  useEffect(() => {
    const supabase = createClient();
    void loadMenu();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void loadMenu();
    });

    return () => subscription.unsubscribe();
  }, [loadMenu]);

  useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (clusterRef.current?.contains(target)) return;
      setMenuOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setMenuOpen(false);
    await loadMenu();
  };

  if (auth.status === "signed-out") {
    return (
      <div className={styles.authCluster}>
        <Link
          className={styles.authIconBtn}
          href="/login?next=/agent"
          aria-label="Sign in"
          title="Sign in"
        >
          <SignInIcon />
        </Link>
      </div>
    );
  }

  const { menu } = auth;

  return (
    <div className={styles.authCluster} ref={clusterRef}>
      <button
        type="button"
        className={`${styles.authIconBtn} ${styles.authMenuTrigger}`}
        aria-label="Account menu"
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        aria-controls={menuId}
        title="Account"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <AccountIcon />
      </button>
      {!menuOpen ? null : (
        <div className={styles.authMenu} id={menuId} role="menu">
          <p className={styles.authMenuLabel}>{menu.label}</p>
          <ul className={styles.authMenuList}>
            {menu.links.map((item) => (
              <li key={item.href}>
                <Link href={item.href} role="menuitem" onClick={() => setMenuOpen(false)}>
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className={styles.authMenuSignOut}
            role="menuitem"
            onClick={() => void handleSignOut()}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
