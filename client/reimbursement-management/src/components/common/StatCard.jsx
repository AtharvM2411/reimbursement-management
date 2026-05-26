import { TrendingUp } from "lucide-react";

export default function StatCard({
  title,
  value,
  trend,
  icon: Icon,
}) {
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <div>
          <div className="stat-title">
            {title}
          </div>

          <div className="stat-value">
            {value}
          </div>
        </div>

        <div
          className="
            h-11 w-11 rounded-2xl
            flex items-center justify-center
            bg-[var(--accent-soft)]
            text-[var(--accent)]
          "
        >
          <Icon size={20} />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 text-sm">
        <div className="flex items-center gap-1 text-[var(--green)]">
          <TrendingUp size={14} />

          <span>{trend}</span>
        </div>

        <span className="text-[var(--text-muted)]">
          vs last month
        </span>
      </div>
    </div>
  );
}