import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Intelligent Market News",
  description: "News that matters, for the stocks you care about",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}

async function Header() {
  const session = await getServerSession();

  return (
    <header className="flex justify-between items-center p-4 border-b font-[family-name:var(--font-geist-sans)]">
      <div className="flex items-center space-x-10">
        <Link href="/" className="flex items-center space-x-4">
          <Image
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
          <span className="font-bold">Intelligent Stock News</span>
        </Link>
        <nav className="space-x-10">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <Link href="/about" className="hover:text-gray-600">About</Link>
        </nav>
      </div>
      <div>
        {session ? (
          <Link href="/portfolio" className="hover:text-gray-600">My Portfolio</Link>
        ) : (
          <div className="space-x-10">
            <Link href="/login" className="hover:text-gray-600">Login</Link>
            <Link href="/signup" className="hover:text-gray-600">Sign up</Link>
          </div>
        )}
      </div>
    </header>
  );
}
