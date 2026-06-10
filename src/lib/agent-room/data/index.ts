/**
 * Agent Room — data modules barrel (AF-06). The TS port of the prototype's
 * `js/data/*` — all plain modules, no fetch. `getProfile()` stays the single
 * per-leader content seam (the AF-90 / INT-06 RAG swap-point).
 */
export { LEADERS, type Leader } from "./leaders";
export {
  PROFILES,
  getProfile,
  sayScene,
  type Profile,
  type ProfileWork,
  type ProfileLink,
} from "./profiles";
export {
  MAP_Q,
  STAGE_CLEAR,
  STAGE_NAME,
  cap,
  computeMapRead,
  type Stage,
  type MapQuestion,
  type MapOption,
  type ReadSignal,
  type MapRead,
  type StageRead,
} from "./map-q";
export { FAQ_SECTIONS, type FaqItem, type FaqSection } from "./faq";
export { SCENES, type SceneName } from "./scenes";
