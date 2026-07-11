import type { FolioPlugin } from "@/folio/core/types";
import { developerModule } from "./developer";
import { designerModule } from "./designer";

/**
 * Built-in profession modules, keyed by the id used in config `modules: []`.
 * A module IS a FolioPlugin — same extension mechanism as third-party plugins.
 * Stubs (photographer, writer, founder) are spec'd in ./_stubs.
 */
export const builtinModules: Record<string, FolioPlugin> = {
  developer: developerModule,
  designer: designerModule,
};

export function getModule(id: string): FolioPlugin {
  const moduleFound = builtinModules[id];
  if (!moduleFound) {
    const available = Object.keys(builtinModules);
    throw new Error(
      `[folio] Unknown module "${id}". Available: ${available.length ? available.join(", ") : "(none yet)"}`,
    );
  }
  return moduleFound;
}
