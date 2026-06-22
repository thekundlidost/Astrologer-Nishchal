import Link from "next/link";
import { MessageCircle, Star, ShieldCheck, Clock } from "lucide-react";
import ZodiacWheel from "./ZodiacWheel";
import { DEFAULT_WHATSAPP_MESSAGE, whatsappLink, TRUST_STATS } from "@/lib/constants";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
}

export default function CTASection({
  title = "Ready for Clarity?",
  subtitle = "Book a confidential consultation with Astrologer Nishchal and get practical guidance for the decision in front of you.",
}: CTASectionProps) {
  return (
    <section className="relative overflow-hidden bg-royal-gradient">
      <ZodiacWheel spin className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 text-gold-400 opacity-30" />
      <div className="container-px relative mx-auto max-w-7xl py-16 text-center sm:py-20">
        <h2 className="mx-auto max-w-xl font-heading text-2xl font-bold text-white sm:text-3xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-white/70 sm:text-base">{subtitle}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/booking" className="btn-primary">Book Consultation</Link>
          <a href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            <MessageCircle className="h-4 w-4" />
            WhatsApp Now
          </a>
        </div>
        {/* Conversion reassurance row */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/65">
          <span className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
            {TRUST_STATS.rating}★ from {TRUST_STATS.verifiedReviews} reviews
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-gold-400" />
            100% confidential
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-gold-400" />
            Same-day slots usually available
          </span>
        </div>
      </div>
    </section>
  );
}
