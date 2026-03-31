// ─────────────────────────────────────────────
// Shared TypeScript types used across the app
// ─────────────────────────────────────────────

import type { ComponentType } from "react";

/** A security event logged in the system */
export interface SecurityEvent {
  id: string;
  type: "motion" | "door" | "camera" | "alert";
  description: string;
  location: string;
  timestamp: string;
  severity: "low" | "medium" | "high";
}

/** Authenticated user profile */
export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  phone?: string;
  created_at: string;
}

/** Navigation link item for the bottom nav bar */
export interface NavItem {
  label: string;
  href: string;
  icon: ComponentType<{ size?: number; className?: string }>;
}
