"use client";

import Script from "next/script";
import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { GA_ID, META_PIXEL_ID, analyticsEnabled, metaPixelEnabled, trackPageView } from "@/lib/analytics";

/**
 * Injects GA4 + Meta Pixel scripts ONLY when their env IDs are present.
 * With no IDs set, this renders nothing and loads no third-party code, so the
 * site stays privacy-clean and fast by default. Add the env var to switch on.
 */
function RouteChangeTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams?.toString();
    const path = query ? `${pathname}?${query}` : pathname;
    trackPageView(path);
  }, [pathname, searchParams]);

  return null;
}

export default function Analytics() {
  if (!analyticsEnabled && !metaPixelEnabled) return null;

  return (
    <>
      {analyticsEnabled && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {metaPixelEnabled && (
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      <Suspense fallback={null}>
        <RouteChangeTracker />
      </Suspense>
    </>
  );
}
