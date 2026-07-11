import { z } from "zod";

export const gallerySchema = z.object({
  heading: z.string().default("Gallery"),
  kicker: z.string().optional(),
  images: z
    .array(
      z.object({
        src: z.string().min(1),
        alt: z.string().min(1),
        caption: z.string().optional(),
        /** Aspect hint for grid/filmstrip: "square" | "portrait" | "landscape". */
        aspect: z.enum(["square", "portrait", "landscape"]).default("landscape"),
      }),
    )
    .min(1, "gallery needs at least one image"),
});

export type GalleryContent = z.infer<typeof gallerySchema>;
