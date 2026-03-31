// ─────────────────────────────────────────────
// StatusBadge — Reusable severity / status pill
//
// Renders a small colored badge for event severity levels.
// ─────────────────────────────────────────────

interface StatusBadgeProps {
  severity: "low" | "medium" | "high";
  label?: string;
}

const styles: Record<StatusBadgeProps["severity"], string> = {
  low:    "bg-green-500/20 text-green-300 border border-green-500/30",
  medium: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
  high:   "bg-red-500/20 text-red-300 border border-red-500/30",
};

export default function StatusBadge({ severity, label }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[severity]}`}
    >
      {label ?? severity}
    </span>
  );
}
