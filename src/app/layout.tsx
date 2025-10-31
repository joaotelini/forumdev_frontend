import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";

const instumentSans = Instrument_Sans({
  variable: "--font-instument-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ForumDev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${instumentSans.variable} antialiased bg-[#F5F8FA] text-[#0F1419] min-h-screen`}
      >
        <main className="pt-16 flex justify-center px-4">{children}</main>
      </body>
    </html>
  );
}
