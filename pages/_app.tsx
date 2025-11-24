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

    // Register the service worker when the app is loaded
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js') // Path to your service worker in the public directory
          .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
          })
          .catch((error) => {
            console.error('Service Worker registration failed:', error);
          });
      });
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
