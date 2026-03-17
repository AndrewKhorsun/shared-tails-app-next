import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/*
  next/font/google — Next.js завантажує шрифти на етапі збірки
  і хостить їх локально. Браузер НЕ робить запит до fonts.googleapis.com.

  variable: "--font-xxx" — створює CSS змінну, яку ми прив'язали
  в globals.css через @theme inline до Tailwind класів (font-sans, font-serif, font-mono)
*/
const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Book Architect",
  description: "Write your book the way it deserves to be written",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${dmSerif.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
