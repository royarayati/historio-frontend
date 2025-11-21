'use client';

import Script from 'next/script';

const MicrosoftClarity = () => {
  // Only load in production
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <Script
      id="microsoft-clarity-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "ldv91lywrn");
                
                // Configure Clarity for complete session recording
                window.clarity = window.clarity || function(){(window.clarity.q = window.clarity.q || []).push(arguments)};
                
                // Enable session recording with detailed settings
                clarity("set", "config", {
                  track: true,
                  trackPageView: true,
                  trackClicks: true,
                  trackScroll: true,
                  trackFormSubmissions: true,
                  trackInputChanges: true,
                  trackMouseMovements: true,
                  trackTextSelections: true,
                  trackErrors: true,
                  trackConsoleErrors: true,
                  trackNetworkErrors: true,
                  trackPerformance: true,
                  trackCustomEvents: true,
                  // Session recording settings
                  sessionRecording: true,
                  sessionReplay: true,
                  // Reduce data collection frequency for better performance
                  batchSize: 5,
                  batchTimeout: 3000,
                  // Record complete sessions
                  recordCompleteSessions: true,
                  // Keep recordings for longer
                  sessionTimeout: 30 * 60 * 1000, // 30 minutes
                  // Record all interactions
                  recordAllInteractions: true
                });
                
                // Start recording immediately when page loads
                clarity("start", "session");
                `,
      }}
    />
  );
};

export default MicrosoftClarity;
