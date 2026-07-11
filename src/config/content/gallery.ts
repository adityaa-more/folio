import type { GalleryContent } from "@/folio/sections/gallery/schema";

/**
 * Demo images from picsum.photos (placeholder service). Swap for your own —
 * local files in /public or any remote URL.
 */
export const gallery: GalleryContent = {
  heading: "Off screen",
  kicker: "Film photography",
  images: [
    { src: "https://picsum.photos/seed/folio1/800/1000", alt: "Street scene, dusk", aspect: "portrait" },
    { src: "https://picsum.photos/seed/folio2/900/600", alt: "Sea link at low tide", aspect: "landscape" },
    { src: "https://picsum.photos/seed/folio3/800/800", alt: "Market colors", aspect: "square" },
    { src: "https://picsum.photos/seed/folio4/900/600", alt: "Monsoon window", aspect: "landscape" },
    { src: "https://picsum.photos/seed/folio5/800/1000", alt: "Stairwell light", aspect: "portrait" },
    { src: "https://picsum.photos/seed/folio6/800/800", alt: "Chai break", aspect: "square" },
  ],
};
