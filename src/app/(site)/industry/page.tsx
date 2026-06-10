"use client";

import { SectorPage } from "@/components/sector/SectorPage";
import { industrySectorConfig } from "@/data/sectors/industry";

export default function IndustryPage() {
  return <SectorPage config={industrySectorConfig} />;
}
