import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  Search,
  Receipt,
  Calendar,
  Eye,
  Clock3,
  CheckCircle2,
  XCircle,
  Filter,
  IndianRupee,
} from "lucide-react";

import AppShell from "../../layouts/AppShell";

import { getMyExpenses } from "../../services/expenseService";

export default function Expenses() {
  const [data, setData] = useState([]);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [selectedExpense, setSelectedExpense] =
    useState(null);

  const [loading, setLoading] = useState(true);

  // FETCH
  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await getMyExpenses();

      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // FILTERED DATA
  const filteredExpenses = useMemo(() => {
    return data.filter((exp) => {
      const matchesSearch =
        exp.description
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL"
          ? true
          : exp.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [data, search, statusFilter]);

  // STATS
  const stats = useMemo(() => {
    return {
      total: data.length,

      approved: data.filter(
        (e) => e.status === "APPROVED"
      ).length,

      pending: data.filter(
        (e) => e.status === "PENDING"
      ).length,

      rejected: data.filter(
        (e) => e.status === "REJECTED"
      ).length,
    };
  }, [data]);

  return (
    <AppShell title="My Expenses">
      {/* HERO */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="
              h-12
              w-12
              rounded-2xl
              bg-[var(--accent-soft)]
              flex
              items-center
              justify-center
              text-[var(--accent)]
            "
          >
            <Receipt size={22} />
          </div>

          <div>
            <h1 className="text-4xl font-display gradient-text">
              Expense Center
            </h1>

            <p className="text-[var(--text-secondary)] mt-1">
              Track reimbursements, approvals, and expense history
            </p>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
          mb-8
        "
      >
        {/* TOTAL */}
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="stat-title">
                Total Expenses
              </div>

              <div className="stat-value">
                {stats.total}
              </div>
            </div>

            <div
              className="
                h-12
                w-12
                rounded-2xl
                bg-[var(--accent-soft)]
                flex
                items-center
                justify-center
                text-[var(--accent)]
              "
            >
              <Receipt size={20} />
            </div>
          </div>
        </div>

        {/* APPROVED */}
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="stat-title">
                Approved
              </div>

              <div className="stat-value">
                {stats.approved}
              </div>
            </div>

            <div
              className="
                h-12
                w-12
                rounded-2xl
                bg-[var(--green-soft)]
                flex
                items-center
                justify-center
                text-[var(--green)]
              "
            >
              <CheckCircle2 size={20} />
            </div>
          </div>
        </div>

        {/* PENDING */}
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="stat-title">
                Pending
              </div>

              <div className="stat-value">
                {stats.pending}
              </div>
            </div>

            <div
              className="
                h-12
                w-12
                rounded-2xl
                bg-[var(--amber-soft)]
                flex
                items-center
                justify-center
                text-[var(--amber)]
              "
            >
              <Clock3 size={20} />
            </div>
          </div>
        </div>

        {/* REJECTED */}
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="stat-title">
                Rejected
              </div>

              <div className="stat-value">
                {stats.rejected}
              </div>
            </div>

            <div
              className="
                h-12
                w-12
                rounded-2xl
                bg-[var(--red-soft)]
                flex
                items-center
                justify-center
                text-[var(--red)]
              "
            >
              <XCircle size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="card p-5 mb-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-display text-xl">
              Filters & Search
            </h3>

            <p className="text-sm text-[var(--text-muted)] mt-1">
              Search and manage reimbursement requests
            </p>
          </div>

          <div
            className="
              h-11
              w-11
              rounded-2xl
              bg-[var(--accent-soft)]
              flex
              items-center
              justify-center
              text-[var(--accent)]
            "
          >
            <Filter size={18} />
          </div>
        </div>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-4
          "
        >
          {/* SEARCH */}
          <div className="relative">
            <Search
              size={16}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-[var(--text-muted)]
              "
            />

            <input
              type="text"
              placeholder="Search expenses..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                input-field
                pl-10
              "
            />
          </div>

          {/* STATUS FILTER */}
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
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
        </div>
      </div>

      {/* EXPENSE TABLE */}
      <div className="card overflow-hidden">
        {/* TABLE HEADER */}
        <div
          className="
            px-6
            py-5
            border-b border-[var(--border)]
            flex
            items-center
            justify-between
          "
        >
          <div>
            <h3 className="font-display text-2xl">
              Expense Records
            </h3>

            <p className="text-sm text-[var(--text-muted)] mt-1">
              View reimbursement submissions and workflow status
            </p>
          </div>

          <button className="btn-secondary">
            Export CSV
          </button>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="skeleton h-20 w-full"
              />
            ))}
          </div>
        ) : filteredExpenses.length === 0 ? (
          /* EMPTY STATE */
          <div className="p-16 text-center">
            <div
              className="
                h-20
                w-20
                mx-auto
                rounded-3xl
                bg-[var(--accent-soft)]
                flex
                items-center
                justify-center
                text-[var(--accent)]
                mb-5
              "
            >
              <Receipt size={32} />
            </div>

            <h3 className="text-2xl font-display mb-2">
              No Expenses Found
            </h3>

            <p className="text-[var(--text-muted)] max-w-md mx-auto">
              You haven’t submitted any reimbursement requests yet.
            </p>
          </div>
        ) : (
          /* TABLE */
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {filteredExpenses.map((exp) => (
                  <tr key={exp.id}>
                    {/* DESCRIPTION */}
                    <td>
                      <div className="flex items-center gap-3">
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
                          "
                        >
                          <Receipt size={16} />
                        </div>

                        <div>
                          <div className="text-white font-medium">
                            {exp.description}
                          </div>

                          <div className="text-xs text-[var(--text-muted)]">
                            Expense Claim
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* AMOUNT */}
                    <td>
                      <div className="flex items-center gap-1 text-white font-semibold">
                        <IndianRupee size={14} />

                        {exp.amount}
                      </div>
                    </td>

                    {/* STATUS */}
                    <td>
                      <span
                        className={
                          exp.status === "APPROVED"
                            ? "badge badge-approved"
                            : exp.status === "REJECTED"
                            ? "badge badge-rejected"
                            : "badge badge-pending"
                        }
                      >
                        {exp.status}
                      </span>
                    </td>

                    {/* DATE */}
                    <td>
                      <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                        <Calendar size={14} />

                        {new Date(
                          exp.createdAt
                        ).toLocaleDateString()}
                      </div>
                    </td>

                    {/* ACTIONS */}
                    <td>
                      <button
                        onClick={() =>
                          setSelectedExpense(exp)
                        }
                        className="btn-secondary"
                      >
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* EXPENSE DRAWER */}
      {selectedExpense && (
        <div className="modal-overlay">
          <div
            className="
              modal-panel
              p-6
              max-w-2xl
            "
          >
            {/* HEADER */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="font-display text-3xl">
                  Expense Details
                </h2>

                <p className="text-[var(--text-muted)] mt-1">
                  Reimbursement workflow overview
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedExpense(null)
                }
                className="btn-secondary"
              >
                Close
              </button>
            </div>

            {/* DETAILS */}
            <div className="space-y-5">
              <div className="card p-5">
                <div className="text-xs text-[var(--text-muted)] mb-2">
                  Description
                </div>

                <div className="text-white font-medium">
                  {selectedExpense.description}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="card p-5">
                  <div className="text-xs text-[var(--text-muted)] mb-2">
                    Amount
                  </div>

                  <div className="text-white font-semibold">
                    ₹ {selectedExpense.amount}
                  </div>
                </div>

                <div className="card p-5">
                  <div className="text-xs text-[var(--text-muted)] mb-2">
                    Status
                  </div>

                  <span
                    className={
                      selectedExpense.status ===
                      "APPROVED"
                        ? "badge badge-approved"
                        : selectedExpense.status ===
                          "REJECTED"
                        ? "badge badge-rejected"
                        : "badge badge-pending"
                    }
                  >
                    {selectedExpense.status}
                  </span>
                </div>
              </div>

              {/* WORKFLOW */}
              <div className="card p-5">
                <div className="mb-5">
                  <h3 className="font-display text-xl">
                    Approval Workflow
                  </h3>

                  <p className="text-sm text-[var(--text-muted)] mt-1">
                    Current reimbursement processing state
                  </p>
                </div>

                <div className="space-y-4">
                  {/* STEP 1 */}
                  <div className="flex items-center gap-4">
                    <div
                      className="
                        h-10
                        w-10
                        rounded-full
                        bg-[var(--green-soft)]
                        text-[var(--green)]
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <CheckCircle2 size={18} />
                    </div>

                    <div>
                      <div className="text-white font-medium">
                        Expense Submitted
                      </div>

                      <div className="text-sm text-[var(--text-muted)]">
                        Request created successfully
                      </div>
                    </div>
                  </div>

                  {/* STEP 2 */}
                  <div className="flex items-center gap-4">
                    <div
                      className={`
                        h-10
                        w-10
                        rounded-full
                        flex
                        items-center
                        justify-center
                        ${
                          selectedExpense.status ===
                          "APPROVED"
                            ? "bg-[var(--green-soft)] text-[var(--green)]"
                            : selectedExpense.status ===
                              "REJECTED"
                            ? "bg-[var(--red-soft)] text-[var(--red)]"
                            : "bg-[var(--amber-soft)] text-[var(--amber)]"
                        }
                      `}
                    >
                      {selectedExpense.status ===
                      "APPROVED" ? (
                        <CheckCircle2 size={18} />
                      ) : selectedExpense.status ===
                        "REJECTED" ? (
                        <XCircle size={18} />
                      ) : (
                        <Clock3 size={18} />
                      )}
                    </div>

                    <div>
                      <div className="text-white font-medium">
                        Manager Review
                      </div>

                      <div className="text-sm text-[var(--text-muted)]">
                        Workflow processing stage
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}