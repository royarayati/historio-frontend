import '../styles/globals.css';
import { PlasmicRootProvider } from "@plasmicapp/react-web";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from 'next/script';
import localFont from 'next/font/local';
import MicrosoftClarity from '@/utils/metrics/MicrosoftClarity';
import { analytics } from '@/utils/metrics/Firebase';

const vazirmatnCustom = localFont({
  src: './fonts/Vazirmatn-VariableFont_wght.ttf',
  weight: '400',
  style: 'normal',
  display: 'swap',
  variable: '--VazirmatnCustom'
});

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Add custom font class to body
    document.body.classList.add(vazirmatnCustom.variable);
    
    // Initialize analytics
    analytics;

    // Unregister any existing service workers (PWA disabled)
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister().then((success) => {
            if (success) {
              console.log('Service Worker unregistered successfully');
            }
          });
        }
      });
      
      // Also clear service worker cache
      if ('caches' in window) {
        caches.keys().then((cacheNames) => {
          return Promise.all(
            cacheNames.map((cacheName) => {
              return caches.delete(cacheName);
            })
          );
        }).then(() => {
          console.log('Service Worker caches cleared');
        });
      }
    }
  }, []);

  return (
    <PlasmicRootProvider Head={Head}>
      <Script src="/inlab_env.js" strategy="beforeInteractive" />
      <Component {...pageProps} />
      <MicrosoftClarity />
    </PlasmicRootProvider>
  );
}
