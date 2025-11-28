import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";
import { Geist, Geist_Mono } from "next/font/google";

export const metadata: Metadata = {
  title: "ShopCo",
  description:
    "Shop smarter with ShopCo. Find everything you need from fashion to lifestyle products, all in one place.",
};

const integralCF = localFont({
  src: [
    {
      path: "../../public/fonts/Integral-CF/Demo_Fonts/Fontspring-DEMO-integralcf-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Integral-CF/Demo_Fonts/Fontspring-DEMO-integralcf-medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Integral-CF/Demo_Fonts/Fontspring-DEMO-integralcf-bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-integral-cf",
  display: "swap",
});

const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/Satoshi_Complete/Fonts/WEB/fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi_Complete/Fonts/WEB/fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi_Complete/Fonts/WEB/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${integralCF.variable} ${satoshi.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
