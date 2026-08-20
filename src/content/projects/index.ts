import type { ProjectContent } from "../types";
import { catCare } from "./catcare";
import { iml, nutriaprova, registro, relprev, sistersLive } from "./placeholders";

export { catCare, catCareInspect, catCareVisual } from "./catcare";

/** Full project registry. Only `verified` entries are wired into any UI in Fase 1. */
export const projects: ProjectContent[] = [catCare, iml, relprev, registro, nutriaprova, sistersLive];

export const verifiedProjects = projects.filter((p) => p.status === "verified");

export function getProjectById(id: string): ProjectContent | undefined {
  return projects.find((p) => p.id === id);
}
