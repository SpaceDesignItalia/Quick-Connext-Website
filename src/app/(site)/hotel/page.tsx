"use client";

import { SectorPage } from "@/components/sector/SectorPage";
import { hotelSectorConfig } from "@/data/sectors/hotel";

export default function HotelPage() {
  return <SectorPage config={hotelSectorConfig} />;
}
