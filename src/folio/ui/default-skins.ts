import type { SkinComponents } from "@/folio/core/types";
import { SectionShell } from "./section-shell";
import { SectionHeading } from "./section-heading";
import { Card } from "./card";
import { Button } from "./button";
import { Badge } from "./badge";
import { Nav } from "./nav";
import { Footer } from "./footer";

/**
 * The baseline skin set. Themes override any subset via ThemeDefinition.skins;
 * the renderer merges overrides on top of these.
 */
export const defaultSkins: SkinComponents = {
  SectionShell,
  SectionHeading,
  Card,
  Button,
  Badge,
  Nav,
  Footer,
};
