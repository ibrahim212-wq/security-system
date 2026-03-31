// ─────────────────────────────────────────────
// Root page ( / )
//
// Immediately redirects users to /login.
// In a real app you'd check for an active session here
// and redirect to /dashboard if already logged in.
// ─────────────────────────────────────────────

import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login");
}
