import type { AppProps } from 'next/app';
import React from 'react';
import "../src/Components/styling/donation.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp