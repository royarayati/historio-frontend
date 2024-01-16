import '../styles/globals.css'
import { PlasmicRootProvider } from "@plasmicapp/react-web";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from 'next/script';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlasmicRootProvider Head={Head}>
      <Script src="../inlab_env.js" strategy="beforeInteractive" />
      <Component {...pageProps} />
    </PlasmicRootProvider>
  );
}
