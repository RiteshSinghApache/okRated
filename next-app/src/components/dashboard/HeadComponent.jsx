import Head from 'next/head';
import Script from 'next/script';


export default function HeadComponent() {
  return (
    <Head>
      <title>Dashboard</title>
      <meta name="description" content="Dashboard page" />
      <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
            rel="stylesheet"></link>
      <Script src="https://cdn.jsdelivr.net/npm/chart.js"></Script>
    </Head>
  );
}
