import './globals.css';
import Script from 'next/script';

export const metadata = {
  title: 'Korea Tour',
  description: '맛집과 액티비티 소개 웹사이트',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head />
      <body>
        <Script
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_API_KEY}`}
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  );
}
