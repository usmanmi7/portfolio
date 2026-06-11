import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Usman Milas | Designer & Developer",
  description:
    "Crafting digital experiences that matter. Freelance web designer & developer from Sri Lanka, modern, responsive, user-focused.",
  keywords: ["web designer", "freelance developer", "Sri Lanka", "Webflow", "WordPress", "portfolio"],
  authors: [{ name: "Usman Milas" }],
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Usman Milas | Designer & Developer",
    description: "Crafting digital experiences that matter.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");var c=t==="dark"?"dark":"light";document.documentElement.className=c}catch(e){document.documentElement.className="light"}})()`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${syne.variable} antialiased bg-[var(--bg-base)] text-[var(--text-100)] overflow-x-hidden`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
