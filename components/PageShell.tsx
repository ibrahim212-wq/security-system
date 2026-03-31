// ─────────────────────────────────────────────
// PageShell — Shared page wrapper with BottomNav
//
// Wrap every authenticated page with this component.
// It handles the desktop sidebar offset and the mobile
// bottom-nav padding so content is never hidden behind the nav.
//
// Usage:
//   <PageShell>
//     <YourPageContent />
//   </PageShell>
// ─────────────────────────────────────────────

import BottomNav from "./BottomNav";

interface PageShellProps {
  children: React.ReactNode;
}

export default function PageShell({ children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800">
      {/* Navigation (mobile bottom bar + desktop sidebar) */}
      <BottomNav />

      {/*
        Main content area:
        - On mobile: add bottom padding so content clears the nav bar
        - On desktop (md+): add left margin to clear the sidebar
      */}
      <main className="pb-20 md:pb-0 md:ml-56 min-h-screen">
        {children}
      </main>
    </div>
  );
}
