"use client";

import { SectorPage } from "@/components/sector/SectorPage";
import { buildingSectorConfig } from "@/data/sectors/building";

export default function BuildingPage() {
  return <SectorPage config={buildingSectorConfig} />;
}
