// ─────────────────────────────────────────────
// Root Layout
//
// This is the top-level layout that wraps every page in the app.
// It sets the HTML language, loads global styles, and defines
// the default metadata (title, description) shown in the browser tab.
// ─────────────────────────────────────────────

import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { NotificationProvider } from "@/contexts/NotificationContext";

export const metadata: Metadata = {
  title: "Security System",
  description: "Smart security monitoring dashboard",
  themeColor: "#ffffff",
  colorScheme: "light",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  colorScheme: "light",
  themeColor: "#ffffff",
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
      <body className="antialiased min-h-screen">
        <AuthProvider>
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
