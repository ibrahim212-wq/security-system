// ─────────────────────────────────────────────
// (main) Layout — shared for authenticated app pages
//
// Provides a persistent fixed bottom navigation bar across:
// /dashboard, /history, /settings, /profile
// ─────────────────────────────────────────────

import DashboardBottomNav from "@/components/DashboardBottomNav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      {/* Page content scrolls, bottom nav stays fixed */}
      <main className="pb-16">{children}</main>

      {/* Fixed bottom navigation */}
      <DashboardBottomNav />
    </div>
  );
}
