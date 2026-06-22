import Link from "next/link";
import { MessageCircle, CalendarCheck } from "lucide-react";
import { DEFAULT_WHATSAPP_MESSAGE, whatsappLink } from "@/lib/constants";

/**
 * Mobile-only sticky bottom bar: "Book Consultation" + WhatsApp.
 * (The desktop floating contact options now live in FloatingActionBar, which
 * also provides the mobile expandable FAB stacked above this bar.)
 */
export default function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-royal-100 bg-white shadow-[0_-4px_20px_rgba(27,42,107,0.1)] dark:border-white/10 dark:bg-royal-900 lg:hidden">
      <Link
        href="/booking"
        className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold text-royal-600 dark:text-white"
      >
        <CalendarCheck className="h-4 w-4" />
        Book Consultation
      </Link>
      <a
        href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        data-track="whatsapp_click"
        data-track-source="sticky_mobile"
        className="flex flex-1 items-center justify-center gap-2 bg-[#25D366] py-3.5 text-sm font-semibold text-white"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </a>
    </div>
  );
}
