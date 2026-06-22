import type { Metadata } from "next";
import ServiceDetail from "@/components/templates/ServiceDetail";
import { getServiceBySlug } from "@/lib/constants";

const service = getServiceBySlug("kundli-report")!;

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  keywords: service.keywords,
  alternates: { canonical: `/services/${service.slug}` },
};

export default function Page() {
  return <ServiceDetail slug="kundli-report" />;
}
