"use client";

import { SectorPage } from "@/components/sector/SectorPage";
import { rsaSectorConfig } from "@/data/sectors/rsa";

export default function RsaPage() {
  return <SectorPage config={rsaSectorConfig} />;
}
