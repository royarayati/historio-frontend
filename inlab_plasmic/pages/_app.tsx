import '../styles/globals.css'
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
    document.body.classList.add(vazirmatnCustom.variable);
    analytics;
  }, []);
  return (
    <PlasmicRootProvider Head={Head}>
      <Script src="/new_inlab/inlab_env.js" strategy="beforeInteractive" />
      <Component {...pageProps} />
      <MicrosoftClarity />
    </PlasmicRootProvider>
  );
}
