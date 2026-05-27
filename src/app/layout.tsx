import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Book a Cooking Class | Find & Book Local Cooking Classes Near You",
  description: "Discover and book cooking classes near you. From Italian pasta to sushi rolling, find the perfect class for date nights, team building, or solo skill-building.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-sans antialiased bg-white text-gray-900">
        {children}
        <Script
          id="travelpayouts-tracking"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                  var script = document.createElement("script");
                  script.async = 1;
                  script.src = 'https://emrld.ltd/NTMzMzUz.js?t=533353';
                  document.head.appendChild(script);
              })();
            `
          }}
        />
      </body>
    </html>
  );
}
