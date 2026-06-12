"use client";

import { useState } from "react";

import styles from "./deck.module.css";
import type { DeckDiagram } from "./deck-types";

/**
 * "Same surface / different system underneath" toggle. Owns its own state so it
 * stays flippable while the deck is pinned — slide progression never touches it.
 */
export function DeckDiagramView({ diagram }: { diagram: DeckDiagram }) {
  const [on, setOn] = useState(false);

  return (
    <div className={styles.diagram}>
      <div className={styles.toggle} role="tablist" aria-label="Site versus platform">
        <button
          type="button"
          role="tab"
          aria-selected={!on}
          className={`${styles.toggleBtn} ${on ? "" : styles.toggleBtnOn}`}
          onClick={() => setOn(false)}
        >
          {diagram.toggleLabels.off}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={on}
          className={`${styles.toggleBtn} ${on ? styles.toggleBtnOn : ""}`}
          onClick={() => setOn(true)}
        >
          {diagram.toggleLabels.on}
        </button>
      </div>

      <div className={styles.panel}>
        <div className={styles.panelLabel}>The surface · your website</div>
        <div className={styles.tiles}>
          {diagram.surfaceTiles.map((tile) => (
            <div key={tile} className={styles.tile}>
              {tile}
            </div>
          ))}
        </div>
        <div className={styles.chips}>
          {diagram.surfaceChips.map((chip) => (
            <span key={chip}>{chip}</span>
          ))}
        </div>
      </div>

      <div className={styles.seam}>The part that actually matters</div>

      <div className={`${styles.panel} ${styles.systemPanel} ${on ? styles.systemPanelOn : ""}`}>
        <div className={styles.panelLabel}>
          The system underneath
          <span className={`${styles.stamp} ${on ? styles.stampOn : ""}`}>
            {on ? "Built for you" : "On your own"}
          </span>
        </div>
        <div className={styles.sys}>
          {diagram.systemTiles.map((tile) => (
            <div key={tile.title} className={styles.st}>
              <div className={styles.stT}>{tile.title}</div>
              <div className={on ? styles.stPlatform : styles.stSite}>
                {on ? tile.platform : tile.site}
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className={styles.cap}>
        {on ? (
          <>
            <span className={styles.ie}>A platform.</span>{" "}
            {diagram.captions.home.replace(/^A platform\.\s*/, "")}
          </>
        ) : (
          <>
            <span className={styles.ie}>Just a site.</span>{" "}
            {diagram.captions.site.replace(/^Just a site\.\s*/, "")}
          </>
        )}
      </p>
    </div>
  );
}
