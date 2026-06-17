"use client";

import { useCallback, useMemo, useState, type CSSProperties, type ReactNode } from "react";

import styles from "./audience-page.module.css";
import {
  BUILD_CAPABILITY_ORDER,
  getBuildCapability,
  getBuildLiveUrl,
  getFeaturesForCapability,
  wireframeAriaLabel,
  type BuildAudienceSlug,
  type BuildCapabilityId,
  type FormationWireframeData,
  type FoundationWireframeData,
  type PublishingWireframeData,
  type RelationshipsWireframeData,
  type ResolvedCapability,
} from "./the-build-data";

type TheBuildExplorerProps = {
  audience: BuildAudienceSlug;
  title: string;
  titleHighlight?: string;
  intro: string;
  footnote: string;
};

function renderTitle(title: string, highlight?: string): ReactNode {
  if (!highlight) return title;
  const idx = title.indexOf(highlight);
  if (idx === -1) return title;
  return (
    <>
      {title.slice(0, idx)}
      <span className={styles.buildUnderline}>
        {highlight}
        <svg viewBox="0 0 150 12" preserveAspectRatio="none" aria-hidden="true">
          <path d="M3 8 C 45 3, 105 11, 147 5" />
        </svg>
      </span>
      {title.slice(idx + highlight.length)}
    </>
  );
}

function BuildWireframe({ capability }: { capability: ResolvedCapability }) {
  const { wf, wfData } = capability;

  if (wf === "foundation") {
    const data = wfData as FoundationWireframeData;
    return (
      <>
        <div className={styles.buildWfDocTitle}>{data.charterTitle}</div>
        <div className={styles.buildWfTabs}>
          {data.tabs.map((tab, i) => (
            <span key={tab} className={i === 0 ? styles.buildWfTabActive : undefined}>
              {tab}
            </span>
          ))}
        </div>
        <div className={styles.buildWfLines}>
          <i />
          <i className={styles.buildWfLine92} />
          <i className={styles.buildWfLine80} />
          <i className={styles.buildWfLine88} />
        </div>
      </>
    );
  }

  if (wf === "publishing") {
    const data = wfData as PublishingWireframeData;
    return (
      <>
        <div className={styles.buildWfHero}>{data.hero}</div>
        <div className={styles.buildWfCards}>
          {data.cards.map((card) => (
            <div key={card} className={styles.buildWfCard}>
              {card}
            </div>
          ))}
        </div>
      </>
    );
  }

  if (wf === "formation") {
    const data = wfData as FormationWireframeData;
    return (
      <div>
        {data.courses.map(([name, progress]) => (
          <div key={name} className={styles.buildWfCourse}>
            <span>{name}</span>
            <div
              className={styles.buildWfPbar}
              style={{ "--build-progress": `${progress}%` } as CSSProperties}
            >
              <b />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const data = wfData as RelationshipsWireframeData;
  return (
    <div className={styles.buildWfTable}>
      <div className={`${styles.buildWfTr} ${styles.buildWfTh}`}>
        <span>{data.col}</span>
        <span />
        <span>Stage</span>
      </div>
      {data.rows.map((row) => (
        <div key={row.join("-")} className={styles.buildWfTr}>
          <span>{row[0]}</span>
          <span>{row[1]}</span>
          <span className={styles.buildWfStage}>{row[2]}</span>
        </div>
      ))}
    </div>
  );
}

function DeviceStage({
  audience,
  capability,
  stageKey,
}: {
  audience: BuildAudienceSlug;
  capability: ResolvedCapability;
  stageKey: BuildCapabilityId;
}) {
  const liveUrl = getBuildLiveUrl(audience, stageKey);
  const displayUrl = liveUrl.replace(/^https:\/\//, "");
  const agentFirst = capability.agent.split(" ")[0]?.toLowerCase() ?? "agent";

  return (
    <div className={styles.buildStageWrap} key={stageKey}>
      <div className={styles.buildStage}>
        <div className={styles.buildDesktop}>
          <div className={styles.buildBar}>
            <i />
            <i />
            <i />
            <span className={styles.buildUrl}>{displayUrl}</span>
          </div>
          <div
            className={styles.buildDbody}
            role="img"
            aria-label={wireframeAriaLabel(capability)}
          >
            <BuildWireframe capability={capability} />
          </div>
        </div>
        <div className={styles.buildPhone} aria-hidden="true">
          <div className={styles.buildPscreen}>
            <div className={styles.buildNotch} />
            <div className={styles.buildPhead}>
              <span className={styles.buildPav} />
              {capability.agent}
            </div>
            <div className={styles.buildChat}>
              <div className={`${styles.buildBub} ${styles.buildBubUser}`}>
                {capability.phone.q}
              </div>
              <div className={`${styles.buildBub} ${styles.buildBubAgent}`}>
                {capability.phone.a}
              </div>
            </div>
            <div className={styles.buildPinput}>
              <span className={styles.buildPh}>Ask {agentFirst}</span>
              <span className={styles.buildGo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TheBuildExplorer({
  audience,
  title,
  titleHighlight,
  intro,
  footnote,
}: TheBuildExplorerProps) {
  const [activeCap, setActiveCap] = useState<BuildCapabilityId>("foundation");
  const [openFeatures, setOpenFeatures] = useState<Record<string, boolean>>({});

  const activeCapability = useMemo(
    () => getBuildCapability(audience, activeCap),
    [audience, activeCap],
  );

  const toggleFeature = useCallback((cap: BuildCapabilityId, index: number) => {
    const key = `${cap}-${index}`;
    setOpenFeatures((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const selectCap = useCallback((cap: BuildCapabilityId) => {
    setActiveCap(cap);
  }, []);

  return (
    <div className={styles.buildExplorer}>
      <h2 className={styles.buildTitle}>{renderTitle(title, titleHighlight)}</h2>
      <p className={styles.buildIntro}>{intro}</p>

      <div className={styles.buildSwitch}>
        <div className={styles.buildTabs} role="tablist" aria-label="Platform capabilities">
          {BUILD_CAPABILITY_ORDER.map((capId) => {
            const shared = getBuildCapability(audience, capId);
            const isActive = capId === activeCap;
            const feats = isActive ? getFeaturesForCapability(audience, capId) : [];
            const liveUrl = getBuildLiveUrl(audience, capId);

            return (
              <div
                key={capId}
                className={`${styles.buildRow} ${isActive ? styles.buildRowOn : ""}`}
              >
                <button
                  type="button"
                  className={styles.buildRowHead}
                  role="tab"
                  aria-selected={isActive}
                  id={`build-tab-${capId}`}
                  aria-controls={`build-panel-${capId}`}
                  onClick={() => selectCap(capId)}
                >
                  <div className={styles.buildRowTitle}>{shared.title}</div>
                  <div className={styles.buildRowTag}>{shared.tag}</div>
                </button>
                <div
                  className={styles.buildDetail}
                  role="tabpanel"
                  id={`build-panel-${capId}`}
                  aria-labelledby={`build-tab-${capId}`}
                  aria-hidden={!isActive}
                >
                  <div className={styles.buildDetailIn}>
                    {isActive ? (
                      <>
                        <ul className={styles.buildFeats}>
                          {feats.map((feat, i) => {
                            const featKey = `${capId}-${i}`;
                            const isOpen = openFeatures[featKey] ?? false;
                            return (
                              <li
                                key={feat.name}
                                className={`${styles.buildFeat} ${isOpen ? styles.buildFeatOpen : ""} ${feat.agent ? styles.buildFeatAgent : ""}`}
                              >
                                <button
                                  type="button"
                                  className={styles.buildFeatHead}
                                  aria-expanded={isOpen}
                                  onClick={() => toggleFeature(capId, i)}
                                >
                                  <span className={styles.buildFeatDot} />
                                  <span className={styles.buildFeatName}>{feat.name}</span>
                                  <span className={styles.buildFeatChev} aria-hidden="true">
                                    ›
                                  </span>
                                </button>
                                <div className={styles.buildFeatDesc}>
                                  <div className={styles.buildFeatDescIn}>
                                    <p>{feat.description}</p>
                                    {feat.sub ? (
                                      <div className={styles.buildFeatSubs}>{feat.sub}</div>
                                    ) : null}
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                        <a
                          className={styles.buildLive}
                          href={liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Explore it live →
                        </a>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.buildStageArea} aria-live="polite" aria-atomic="true">
          <DeviceStage
            audience={audience}
            capability={activeCapability}
            stageKey={activeCap}
          />
        </div>
      </div>

      <p className={styles.buildFoot}>{footnote}</p>
    </div>
  );
}
