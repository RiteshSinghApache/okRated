// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* ✅ Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&family=Lato&family=Noto+Sans+Georgian&family=Noto+Serif+Georgian&family=Playfair+Display+SC&display=swap"
          rel="stylesheet"
        />
        {/* ✅ Bootstrap CSS */}
        {/* <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css"
          rel="stylesheet"
        /> */}
        {/* Stylesheets are imported in _app.js */}
        {/* Use Next.js Script component for loading JS files */}
        <Script src="/assets/dist/js/bootstrap.bundle.min.js" strategy="beforeInteractive" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
