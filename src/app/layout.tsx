import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AIでWebアプリを作る実践講座 | シンラボ",
  description: "非エンジニアでもAIを使ってWebアプリが作れる！Google AI StudioやClaude Artifactsを活用したVibe Coding実践講座。ToDoアプリ、ポートフォリオサイト、業務ツールを自分の手で作る体験。",
  keywords: ["Webアプリ", "AI", "Vibe Coding", "ノーコード", "非エンジニア", "Google AI Studio", "Claude", "プログラミング入門"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
