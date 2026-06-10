import type { LucideIcon } from "lucide-react";

export interface SceneCard {
  icon: LucideIcon;
  title: string;
  detail: string;
  status?: string;
  position: string;
  tone?: "light" | "dark";
  delay?: number;
  float?: boolean;
}

export interface SceneFeature {
  icon: LucideIcon;
  label: string;
  title: string;
  desc: string;
  bullets: string[];
  image: string;
  cards: SceneCard[];
  /** Concrete problems shown on the "Prima" side of the slider. */
  before?: string[];
  layout?: "default" | "dominant";
}

export interface StatPause {
  afterSceneIndex: number;
  value: string;
  label: string;
  explanation: string;
}

export interface GridFeature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export interface ComparisonRow {
  aspect: string;
  quick: string;
  traditional: string;
}

export interface InfoCard {
  icon: LucideIcon;
  title: string;
  detail: string;
}

export interface HeroDemoCard {
  title: string;
  detail: string;
  status?: string;
}

export interface HeroKpi {
  value: string;
  label: string;
}

export interface SectorConfig {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  heroLabel: string;
  heroTitle: string;
  heroAccent?: string;
  heroSubtitle: string;
  heroCards: InfoCard[];
  heroVariant?: "default" | "cinematic";
  heroDemoCard?: HeroDemoCard;
  /** Rotating live events shown in the hero card (overrides heroDemoCard). */
  heroLiveEvents?: { title: string; detail: string }[];
  heroKpis?: HeroKpi[];
  interactive?: { commandCenter?: boolean; roi?: boolean };
  hideIntro?: boolean;
  introLabel: string;
  introTitle: string;
  introText: string;
  scenes: SceneFeature[];
  statPause?: StatPause;
  grid?: { title: string; features: GridFeature[] };
  stats: Array<{ value: string; label: string }>;
  comparison: ComparisonRow[];
  finance: {
    label: string;
    title: string;
    text: string;
    points: { title: string; desc: string }[];
  };
  assistance: GridFeature[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaImage?: string;
}
