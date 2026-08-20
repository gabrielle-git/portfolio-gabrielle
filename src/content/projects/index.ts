import type { ProjectContent } from "../types";
import { catCare } from "./catcare";
import { iml } from "./iml";
import { relprev } from "./relprev";
import { registro } from "./registro";
import { nutriaprova, sistersLive } from "./placeholders";

export { catCare, catCareInspect, catCareVisual } from "./catcare";
export { iml, imlPipeline, imlMetric, imlInspect } from "./iml";
export { relprev, relprevStates, relprevInspect, type RelprevState } from "./relprev";
export { registro, registroHierarchy, registroInspect } from "./registro";

/** Full project registry. */
export const projects: ProjectContent[] = [catCare, iml, relprev, registro, nutriaprova, sistersLive];

/** The three "Selected Systems", in Home order. */
export const selectedSystems: ProjectContent[] = [iml, relprev, registro];

export const verifiedProjects = projects.filter((p) => p.status === "verified");

export function getProjectById(id: string): ProjectContent | undefined {
  return projects.find((p) => p.id === id);
}
