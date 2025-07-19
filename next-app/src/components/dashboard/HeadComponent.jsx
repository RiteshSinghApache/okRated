import Head from 'next/head';
import Script from 'next/script';
import '@/styles/dashboard.css';
import '@/styles/media-only.css';

export default function HeadComponent() {
  return (
    <Head>
      <title>Dashboard</title>
      <meta name="description" content="Dashboard page" />
      <Script src="https://cdn.jsdelivr.net/npm/chart.js"></Script>
    </Head>
  );
}
