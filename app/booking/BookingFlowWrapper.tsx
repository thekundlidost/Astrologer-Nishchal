"use client";

import { useSearchParams } from "next/navigation";
import BookingFlow from "@/components/forms/BookingFlow";

export default function BookingFlowWrapper() {
  const params = useSearchParams();
  const service = params.get("service") ?? undefined;
  return <BookingFlow initialService={service} />;
}
