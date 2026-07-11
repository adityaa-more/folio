import type { BentoContent } from "@/folio/sections/bento/schema";

export const bento: BentoContent = {
  heading: "Now",
  kicker: "At a glance",
  tiles: [
    {
      type: "text",
      title: "Currently",
      text: "Leading the reporting platform at Ledgerline and maintaining Shipmate CLI on the side.",
      size: "wide",
    },
    { type: "stat", value: "0.8s", label: "P&L rollup, 2M txns", size: "sm" },
    {
      type: "link",
      title: "Shipmate CLI",
      text: "Release automation in one command.",
      href: "https://github.com/example/shipmate",
      size: "sm",
    },
    { type: "stat", value: "WET", label: "Lisbon, remote-first", size: "sm" },
    {
      type: "link",
      title: "Writing",
      text: "Make the extension point cheaper than the fork.",
      href: "/blog/make-the-extension-point-cheaper",
      size: "wide",
    },
  ],
};
