import type { Metadata } from "next";
import { Space_Mono, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const spaceMono = Space_Mono({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "HangDraw - Multiplayer Hangman",
  description: "A fun two-player hangman game where one player sets the word and draws the hangman while the other guesses. Play with friends in real-time!",
  keywords: ["hangman", "multiplayer", "game", "word game", "drawing", "two player"],
  authors: [{ name: "Saikat", url: "https://twitter.com/5aikat" }],
  creator: "Saikat",
  metadataBase: new URL("https://hangdraw.vercel.app"),
  openGraph: {
    title: "HangDraw - Multiplayer Hangman",
    description: "A fun two-player hangman game with real-time drawing. Challenge your friends!",
    url: "https://hangdraw.vercel.app",
    siteName: "HangDraw",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HangDraw - Multiplayer Hangman Game",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HangDraw - Multiplayer Hangman",
    description: "A fun two-player hangman game with real-time drawing. Challenge your friends!",
    creator: "@5aikat",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/logo.svg",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  themeColor: "#F97316",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceMono.variable} ${dmSans.variable} antialiased`}>
        <Header />
        <main className="pt-14 pb-12 min-h-screen">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
