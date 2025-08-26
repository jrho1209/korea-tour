import './globals.css';
import Script from 'next/script';
import Navigation from './components/Navigation';
import Head from "next/head";


export const metadata = {
  title: 'Korea Tour',
  description: '맛집과 액티비티 소개 웹사이트',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <Head>
      <Script
          scr="https://dapi.kakao.com/v2/maps/sdk.js?appkey=a65a8036af7ad6fb68519672be9c3795&libraries=services,clusterer&autoload=false"
          strategy='beforeInteractive'
        />
      </Head>
      <body>
      <Navigation />
        {children}
      </body>
    </html>
  );
}
