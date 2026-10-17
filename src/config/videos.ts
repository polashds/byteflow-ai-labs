import type { ProjectVideo } from "@/config/projects";

/**
 * Homepage intro video. Empty youtubeId = the section is not rendered.
 * Videos load only after a click (youtube-nocookie), never autoplay with
 * sound on page load, and request captions (cc_load_policy=1).
 */
export const introVideo: ProjectVideo & { eyebrow: string; heading: string; caption: string } = {
  youtubeId: "",
  title: "ByteFlow AI Labs intro video",
  eyebrow: "Watch",
  heading: "See how a system is built",
  caption: "A short walkthrough of how we build and hand over an automation.",
};

/** Founder introduction on /about. Empty youtubeId = the section is not rendered. */
export const founderVideo: ProjectVideo & { caption: string } = {
  youtubeId: "",
  title: "Meet the founder",
  caption: "A short introduction from Siddique.",
};

/** Text used by the click-to-load player. */
export const videoUi = {
  play: "Play video",
  consent: "Loads from YouTube when you press play.",
} as const;
