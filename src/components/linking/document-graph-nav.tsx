import Link from "next/link";

import styles from "./linking.module.css";

const GRAPH_LINKS = [
  { href: "/agent", label: "Agent room" },
  { href: "/research", label: "Research" },
  { href: "/articles", label: "Articles" },
  { href: "/voices", label: "Trusted voices" },
  { href: "/footnotes", label: "Footnotes" },
  { href: "/field-guide", label: "Field guides" },
] as const;

type DocumentGraphNavProps = {
  current?: "research" | "articles" | "voices" | "agent" | "footnotes";
};

/** Footer nav block — cross-links the public document graph. */
export function DocumentGraphNav({ current }: DocumentGraphNavProps) {
  return (
    <nav className={styles.graphNav} aria-label="Document graph">
      <p className={styles.graphLabel}>Explore Movemental</p>
      <ul className={styles.graphList}>
        {GRAPH_LINKS.map((link) => {
          const key = link.href.replace(/^\//, "").split("/")[0];
          const isCurrent = current === key || (current === "agent" && link.href === "/agent");
          return (
            <li key={link.href}>
              {isCurrent ? (
                <span className={styles.graphCurrent} aria-current="page">
                  {link.label}
                </span>
              ) : (
                <Link href={link.href} className={styles.graphLink}>
                  {link.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
