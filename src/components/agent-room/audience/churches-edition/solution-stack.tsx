import type { EditionLayerGroup } from "./churches-edition-types";
import styles from "./churches-edition.module.css";
import { RevealOnScroll } from "./reveal-on-scroll";

type SolutionStackProps = {
  layers: readonly EditionLayerGroup[];
  charterMini: {
    rn: string;
    title: string;
    body: string;
    pin: string;
  };
};

export function SolutionStack({ layers, charterMini }: SolutionStackProps) {
  return (
    <div className={styles.stack}>
      <div className={styles.layerList}>
        {layers.map((layer) => (
          <RevealOnScroll key={layer.title}>
            <div
              className={`${styles.layerGroup} ${layer.isBase ? styles.layerGroupBase : ""}`}
            >
              <div className={styles.layerHead}>
                <b className={styles.layerTitle}>{layer.title}</b>
                <span className={styles.layerTag}>{layer.tag}</span>
              </div>
              <ul className={styles.layerItems}>
                {layer.items.map((item) => (
                  <li key={item} className={styles.layerItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>
        ))}
      </div>

      <RevealOnScroll>
        <aside className={styles.charterMini}>
          <span className={styles.charterMiniRn}>{charterMini.rn}</span>
          <h4 className={styles.charterMiniTitle}>{charterMini.title}</h4>
          <p className={styles.charterMiniBody}>{charterMini.body}</p>
          <div className={styles.charterMiniPin}>{charterMini.pin}</div>
        </aside>
      </RevealOnScroll>
    </div>
  );
}
