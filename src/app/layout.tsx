import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// 1. الاستيراد يجب أن يكون هنا في الأعلى تماماً
import Link from 'next/link'; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 2. الـ Metadata يجب أن تحتوي فقط على المعلومات النصية
export const metadata: Metadata = {
  title: "VRAVK | نظام الاستخبارات الرقمي",
  description: "المحرك العالمي لكشف الاحتيال وتأمين الروابط بذكاء استباقي",
  manifest: "/manifest.json", // أضف هذا السطر لربط التطبيق (PWA)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="drl">
      <head>
        {/* يمكنك أيضاً وضع الرابط هنا للتأكيد */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#020617" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
