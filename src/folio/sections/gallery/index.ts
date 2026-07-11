import { defineSection } from "@/folio/core/define";
import { gallerySchema, type GalleryContent } from "./schema";
import { GalleryMasonry } from "./variants/masonry";
import { GalleryGrid } from "./variants/grid";
import { GalleryFilmstrip } from "./variants/filmstrip";

export const gallerySection = defineSection<GalleryContent>({
  id: "gallery",
  name: "Gallery",
  description: "Image showcase: masonry, uniform grid, or filmstrip.",
  category: "core",
  navLabel: "Gallery",
  schema: gallerySchema,
  variants: {
    masonry: GalleryMasonry,
    grid: GalleryGrid,
    filmstrip: GalleryFilmstrip,
  },
  defaultVariant: "masonry",
  defaultMotion: "stagger-grid",
});
