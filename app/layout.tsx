import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sarbojonin Welfare Association | Registered Charitable Trust",
  description:
    "Sarbojonin Welfare Association is a registered charitable trust dedicated to advancing education, healthcare, social welfare, cultural development, and humanitarian service since 2019.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
