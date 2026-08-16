import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Usman Milas — Web Designer & Developer",
  description:
    "I design digital experiences that people remember. Freelance web designer and developer specializing in SaaS, business websites, and UI/UX design.",
  keywords: [
    "Usman Milas",
    "Web Designer",
    "Web Developer",
    "UI/UX",
    "SaaS",
    "Freelance",
    "Figma",
    "WordPress",
  ],
  authors: [{ name: "Usman Milas" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Usman Milas — Web Designer & Developer",
    description:
      "I design digital experiences that people remember.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${jakarta.variable} ${inter.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
