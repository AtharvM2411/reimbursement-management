import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import {
  Users,
  Receipt,
  IndianRupee,
  Clock3,
  CheckCircle2,
} from "lucide-react";

import AppShell from "../../layouts/AppShell";

import StatCard from "../../components/common/StatCard";

import ExpenseAnalyticsChart from "../../components/common/ExpenseAnalyticsChart";

import { getAllExpenses } from "../../services/expenseService";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [recent, setRecent] = useState([]);

  const [filters, setFilters] = useState({
    status: "ALL",
    user: "ALL",
    fromDate: "",
    toDate: "",
  });

  // FETCH DATA
  const fetchData = async () => {
    try {
      const data = await getAllExpenses();

      console.log("ADMIN DATA:", data);

      setExpenses(data);

      setRecent(data.slice(0, 5));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // FILTERING
  const filteredExpenses = useMemo(() => {
    return expenses.filter((e) => {
      if (
        filters.status !== "ALL" &&
        e.status !== filters.status
      )
        return false;

      if (
        filters.user !== "ALL" &&
        e.user?.name !== filters.user
      )
        return false;

      const created = new Date(e.createdAt);

      if (
        filters.fromDate &&
        created < new Date(filters.fromDate)
      )
        return false;

      if (
        filters.toDate &&
        created > new Date(filters.toDate)
      )
        return false;

      return true;
    });
  }, [expenses, filters]);

  // STATS
  const stats = useMemo(() => {
    const approved = filteredExpenses.filter(
      (e) => e.status === "APPROVED"
    ).length;

    const rejected = filteredExpenses.filter(
      (e) => e.status === "REJECTED"
    ).length;

    const pending = filteredExpenses.filter(
      (e) => e.status === "PENDING"
    ).length;

    const totalAmount = filteredExpenses.reduce(
      (sum, e) => sum + (e.amount || 0),
      0
    );

    return {
      totalExpenses: filteredExpenses.length,
      approved,
      rejected,
      pending,
      totalAmount,
    };
  }, [filteredExpenses]);

  return (
    <AppShell title="Admin Dashboard">
      {/* HERO */}
      <div className="mb-8">
        <h1 className="text-4xl font-display gradient-text">
          Financial Operations Hub
        </h1>

        <p className="text-[var(--text-secondary)] mt-2">
          Monitor reimbursements, approvals,
          workflows, and company spending.
        </p>
      </div>

      {/* FILTERS */}
      <div className="card p-5 mb-8">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-4">
          <div>
            <h3 className="font-display text-lg">
              Expense Filters
            </h3>

            <p className="text-sm text-[var(--text-muted)] mt-1">
              Filter reimbursements and workflow
              activity
            </p>
          </div>

          <button
            onClick={() =>
              setFilters({
                status: "ALL",
                user: "ALL",
                fromDate: "",
                toDate: "",
              })
            }
            className="btn-secondary"
          >
            Reset Filters
          </button>
        </div>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-4
          "
        >
          {/* STATUS */}
          <select
            value={filters.status}
            onChange={(e) =>
              setFilters({
                ...filters,
                status: e.target.value,
              })
            }
            className="input-field"
          >
            <option value="ALL">
              All Status
            </option>

            <option value="APPROVED">
              Approved
            </option>

            <option value="PENDING">
              Pending
            </option>

            <option value="REJECTED">
              Rejected
            </option>
          </select>

          {/* USER */}
          <select
            value={filters.user}
            onChange={(e) =>
              setFilters({
                ...filters,
                user: e.target.value,
              })
            }
            className="input-field"
          >
            <option value="ALL">
              All Users
            </option>

            {[
              ...new Set(
                expenses.map((e) => e.user?.name)
              ),
            ].map((name) => (
              <option
                key={name}
                value={name}
              >
                {name}
              </option>
            ))}
          </select>

          {/* FROM DATE */}
          <input
            type="date"
            value={filters.fromDate}
            onChange={(e) =>
              setFilters({
                ...filters,
                fromDate: e.target.value,
              })
            }
            className="input-field"
          />

          {/* TO DATE */}
          <input
            type="date"
            value={filters.toDate}
            onChange={(e) =>
              setFilters({
                ...filters,
                toDate: e.target.value,
              })
            }
            className="input-field"
          />
        </div>
      </div>

      {/* STATS */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-5
          gap-6
          mb-8
        "
      >
        <StatCard
          title="Total Expenses"
          value={stats.totalExpenses}
          color="#3b82f6"
          icon={Receipt}
        />

        <StatCard
          title="Approved"
          value={stats.approved}
          color="#22c55e"
          icon={CheckCircle2}
        />

        <StatCard
          title="Pending"
          value={stats.pending}
          color="#f59e0b"
          icon={Clock3}
        />

        <StatCard
          title="Rejected"
          value={stats.rejected}
          color="#ef4444"
          icon={Users}
        />

        <StatCard
          title="Total Amount"
          value={`₹ ${stats.totalAmount}`}
          color="#8b5cf6"
          icon={IndianRupee}
        />
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4 mb-8 flex-wrap">
        <button
          onClick={() =>
            navigate("/settings/users")
          }
          className="btn-primary"
        >
          Manage Users
        </button>

        <button
          onClick={() => navigate("/reports")}
          className="btn-secondary"
        >
          View Reports
        </button>

        <button
          onClick={() =>
            navigate("/settings/rules")
          }
          className="btn-secondary"
        >
          System Settings
        </button>
      </div>

      {/* ANALYTICS + ACTIVITY */}
      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-3
          gap-6
        "
      >
        {/* ANALYTICS */}
        <div
          className="
            card
            xl:col-span-2
            p-6
          "
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display text-2xl">
                Expense Analytics
              </h3>

              <p className="text-sm text-[var(--text-muted)] mt-1">
                Company-wide spending trends
              </p>
            </div>

            <button className="btn-secondary">
              Export
            </button>
          </div>

          <ExpenseAnalyticsChart />
        </div>

        {/* RECENT ACTIVITY */}
        <div className="card p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="font-display text-2xl">
                Recent Activity
              </h3>

              <p className="text-sm text-[var(--text-muted)] mt-1">
                Latest reimbursement workflow
                events
              </p>
            </div>

            <button className="btn-secondary">
              View All
            </button>
          </div>

          {recent.length === 0 ? (
            <p className="text-[var(--text-muted)]">
              No activity available
            </p>
          ) : (
            <div className="space-y-4">
              {recent.map((item) => (
                <div
                  key={item.id}
                  className="
                    card
                    p-4
                    flex
                    items-start
                    justify-between
                    hover:translate-y-[-2px]
                    transition-all
                    duration-200
                  "
                >
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="
                          h-10
                          w-10
                          rounded-xl
                          bg-[var(--accent-soft)]
                          flex
                          items-center
                          justify-center
                          text-[var(--accent)]
                          font-bold
                        "
                      >
                        ₹
                      </div>

                      <div>
                        <p className="text-white font-medium">
                          {item.description}
                        </p>

                        <p className="text-sm text-[var(--text-muted)]">
                          {item.user?.name}
                        </p>
                      </div>
                    </div>

                    <div className="text-sm text-[var(--text-secondary)]">
                      ₹ {item.amount}
                    </div>
                  </div>

                  <div>
                    <span
                      className={
                        item.status === "APPROVED"
                          ? "badge badge-approved"
                          : item.status === "REJECTED"
                          ? "badge badge-rejected"
                          : "badge badge-pending"
                      }
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
};

export default AdminDashboard;