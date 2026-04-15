import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "F5 Crypto | GMX Investment Dashboard",
  description:
    "Fundamentale Analyse des GMX-Tokens (Perp DEX) fuer das F5 Crypto Investmentkomitee.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className="dark">
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
