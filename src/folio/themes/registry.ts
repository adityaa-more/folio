import { Registry } from "@/folio/core/registry";
import type { ThemeDefinition } from "@/folio/core/types";
import { luxuryMinimal } from "./luxury-minimal";
import { terminal } from "./terminal";
import { editorial } from "./editorial";
import { bento } from "./bento";

export const themeRegistry = new Registry<ThemeDefinition>("theme", [
  luxuryMinimal,
  terminal,
  editorial,
  bento,
]);
