// ─────────────────────────────────────────────
// Root Layout
//
// This is the top-level layout that wraps every page in the app.
// It sets the HTML language, loads global styles, and defines
// the default metadata (title, description) shown in the browser tab.
// ─────────────────────────────────────────────

import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Security System",
  description: "Smart security monitoring dashboard",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        The `antialiased` class improves font rendering.
        `min-h-screen` ensures the background fills the full viewport.
      */}
      <body className="antialiased min-h-screen bg-brand-950 text-white">
        {children}
      </body>
    </html>
  );
}
