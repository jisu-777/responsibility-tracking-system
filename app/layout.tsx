import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layouts/Sidebar";
import MainHeader from "@/components/layouts/MainHeader";
import ScrollToTop from "@/components/ui/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Accountability System",
  description: "Responsibility management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Pretendard 폰트 CDN 로드 */}
        <link
          rel="stylesheet"
          as="style"
          crossOrigin=""
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MainHeader />
        
        <div className="flex h-[calc(100vh-48px)] overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-auto min-w-0">
            {children}
          </main>
        </div>
       
        
        <ScrollToTop />
      </body>
    </html>
  );
}
