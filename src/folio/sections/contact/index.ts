import { defineSection } from "@/folio/core/define";
import { contactSchema, type ContactContent } from "./schema";
import { ContactMinimalLinks } from "./variants/minimal-links";
import { ContactSplit } from "./variants/split";

export const contactSection = defineSection<ContactContent>({
  id: "contact",
  name: "Contact",
  description: "Email, availability note, social links.",
  category: "core",
  navLabel: "Contact",
  schema: contactSchema,
  variants: {
    "minimal-links": ContactMinimalLinks,
    split: ContactSplit,
  },
  defaultVariant: "minimal-links",
  defaultMotion: "fade-up",
});
