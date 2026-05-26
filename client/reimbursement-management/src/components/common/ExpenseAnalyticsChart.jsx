import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", amount: 12000 },
  { month: "Feb", amount: 18000 },
  { month: "Mar", amount: 22000 },
  { month: "Apr", amount: 28000 },
  { month: "May", amount: 24000 },
  { month: "Jun", amount: 36000 },
];

export default function ExpenseAnalyticsChart() {
  return (
    <div className="h-[340px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient
              id="expenseGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#7c63ff"
                stopOpacity={0.4}
              />

              <stop
                offset="100%"
                stopColor="#7c63ff"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="month"
            tick={{
              fill: "#6f6f86",
              fontSize: 12,
            }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              background: "#16161f",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "14px",
              color: "#fff",
            }}
          />

          <Area
            type="monotone"
            dataKey="amount"
            stroke="#7c63ff"
            strokeWidth={3}
            fill="url(#expenseGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}