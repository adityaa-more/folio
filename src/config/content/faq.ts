import type { FaqContent } from "@/folio/sections/faq/schema";

export const faq: FaqContent = {
  heading: "Questions",
  kicker: "Before you ask",
  items: [
    {
      question: "Are you available for freelance work?",
      answer:
        "Yes — I take on one or two engagements per quarter. Platform architecture, design-system builds, and performance rescues are my sweet spot. Current booking window is Q4 2026.",
    },
    {
      question: "What does a typical engagement look like?",
      answer:
        "A one-week paid discovery first: I read the codebase, talk to the team, and write up what I'd do and what it costs. If we continue, work runs in two-week cycles with a demo at the end of each.",
    },
    {
      question: "Do you work with early-stage startups?",
      answer:
        "Happily, if the problem is interesting. For pre-seed teams I offer a reduced advisory rate — one afternoon a week, architecture and hiring help.",
    },
    {
      question: "Remote or on-site?",
      answer:
        "Remote-first from Lisbon (WET). I overlap comfortably with Europe and can shift for US East Coast mornings.",
    },
  ],
};
