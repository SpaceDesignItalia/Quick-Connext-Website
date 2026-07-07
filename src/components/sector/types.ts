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
  /** Optional looping micro-animation clip. When set, the scene shows this
   *  living video (with `image` as poster) instead of the before/after slider. */
  video?: string;
  /** Optional distinct image for the "Prima" side of the before/after slider. */
  beforeImage?: string;
  cards: SceneCard[];
  /** Concrete problems shown on the "Prima" side of the slider. */
  before?: string[];
  layout?: "default" | "dominant";
  /** Replaces the image/video with a custom interactive visual. */
  visual?: "live-architecture";
}

export interface StatPause {
  afterSceneIndex: number;
  value: string;
  label: string;
  explanation: string;
}

/** Animated KNX connection-topology diagram, rendered after a given scene. */
export interface SystemSchemaSection {
  afterSceneIndex: number;
  label: string;
  title: string;
  subtitle?: string;
}

/** Sector-specific live panel — the product at work in that vertical.
 *  Rendered as a full band right after the scene at `afterSceneIndex`. */
export interface SectorLiveSection {
  afterSceneIndex: number;
  kind: "industry-control" | "rsa-care" | "building-day";
  label: string;
  title: string;
  subtitle?: string;
}

/** Interactive "explore the room" image with cinematic zoom + text callouts. */
export interface RoomExplorerSection {
  afterSceneIndex: number;
  label: string;
  title: string;
  subtitle?: string;
  image?: string;
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
  hideSceneNav?: boolean;
  introLabel: string;
  introTitle: string;
  introText: string;
  /** Optional market stats shown after the intro block. */
  marketStats?: Array<{ value: string; label: string }>;
  marketStatsSource?: string;
  /** Optional contained 3D-render showcase ("look inside the building"). */
  buildingShowcase?: {
    label: string;
    title: string;
    text: string;
    image: string;
    caption?: string;
    highlights?: { icon: LucideIcon; label: string }[];
  };
  scenes: SceneFeature[];
  statPause?: StatPause;
  /** Optional KNX system-topology diagram shown after a scene. */
  systemSchema?: SystemSchemaSection;
  /** Optional interactive "explore the room" visual shown after a scene. */
  roomExplorer?: RoomExplorerSection;
  /** Optional sector-specific live panel shown after a scene. */
  sectorLive?: SectorLiveSection;
  grid?: { label?: string; title: string; subtitle?: string; features: GridFeature[] };
  /** When "before", the grid renders before scene features (default: after). */
  gridPosition?: "before" | "after";
  stats: Array<{ value: string; label: string }>;
  statsSection?: SectionHeading;
  /**
   * Optional grouping of the stats into named pillars (e.g. Efficienza,
   * Ospitalità…). When present, the stats section renders pillar cards with
   * context text instead of the flat StatGrid.
   */
  statGroups?: Array<{
    icon: LucideIcon;
    title: string;
    stat: { value: string; label: string };
    desc: string;
    secondary?: { value: string; label: string };
  }>;
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
