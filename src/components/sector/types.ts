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
  /** Big display value (e.g. "24/7") — renders the item as a stat tile. */
  stat?: string;
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

export interface SectionHeading {
  label: string;
  title: string;
  subtitle?: string;
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
  /** Optional market stats shown after the intro block. */
  marketStats?: Array<{ value: string; label: string }>;
  marketStatsSource?: string;
  scenes: SceneFeature[];
  statPause?: StatPause;
  grid?: { label?: string; title: string; subtitle?: string; features: GridFeature[] };
  /** When "before", the grid renders before scene features (default: after). */
  gridPosition?: "before" | "after";
  stats: Array<{ value: string; label: string }>;
  statsSection?: SectionHeading;
  comparison: ComparisonRow[];
  comparisonSection?: SectionHeading;
  comparisonTraditionalLabel?: string;
  finance: {
    label: string;
    title: string;
    text: string;
    points: { title: string; desc: string }[];
  };
  assistance: GridFeature[];
  assistanceSection?: SectionHeading;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaLabel?: string;
  ctaImage?: string;
}
