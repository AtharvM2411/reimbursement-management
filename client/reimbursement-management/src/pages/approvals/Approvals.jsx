import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  CheckCircle2,
  XCircle,
  Clock3,
  Receipt,
  Eye,
  Search,
  Filter,
  Workflow,
  Sparkles,
} from "lucide-react";

import AppShell from "../../layouts/AppShell";

import {
  getPendingApprovals,
  approveExpense,
  rejectExpense,
} from "../../services/approvalService";

export default function Approvals() {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedApproval, setSelectedApproval] =
    useState(null);

  const [processingId, setProcessingId] =
    useState(null);

  // FETCH
  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await getPendingApprovals();

      setData(res);
    } catch (err) {
      console.error(err);

      toast.success("Failed to load Approvals.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // APPROVE
  const handleApprove = async (id) => {
    try {
      setProcessingId(id);

      await approveExpense(id);

      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setProcessingId(null);
    }
  };

  // REJECT
  const handleReject = async (id) => {
    try {
      setProcessingId(id);

      await rejectExpense(id);

      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setProcessingId(null);
    }
  };

  // FILTERED
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.expense?.description
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [data, search]);

  return (
    <AppShell title="Approval Center">
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
            <Workflow size={22} />
          </div>

          <div>
            <h1 className="text-4xl font-display gradient-text">
              Approval Operations Center
            </h1>

            <p className="text-[var(--text-secondary)] mt-1">
              Review reimbursement requests and manage approval workflows
            </p>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
          mb-8
        "
      >
        {/* PENDING */}
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="stat-title">
                Pending Approvals
              </div>

              <div className="stat-value">
                {data.length}
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

        {/* WORKFLOW */}
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="stat-title">
                Workflow Active
              </div>

              <div className="stat-value">
                Live
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
              <Sparkles size={20} />
            </div>
          </div>
        </div>

        {/* PROCESSING */}
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="stat-title">
                Processing Queue
              </div>

              <div className="stat-value">
                {filteredData.length}
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
      </div>

      {/* FILTERS */}
      <div className="card p-5 mb-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-display text-xl">
              Approval Filters
            </h3>

            <p className="text-sm text-[var(--text-muted)] mt-1">
              Search and manage pending reimbursement requests
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
            placeholder="Search approvals..."
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
      </div>

      {/* APPROVAL QUEUE */}
      <div className="card overflow-hidden">
        {/* HEADER */}
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
              Pending Queue
            </h3>

            <p className="text-sm text-[var(--text-muted)] mt-1">
              Reimbursement approvals awaiting review
            </p>
          </div>

          <button className="btn-secondary">
            Export Queue
          </button>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="skeleton h-24 w-full"
              />
            ))}
          </div>
        ) : filteredData.length === 0 ? (
          /* EMPTY */
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
              <CheckCircle2 size={32} />
            </div>

            <h3 className="text-2xl font-display mb-2">
              No Pending Approvals
            </h3>

            <p className="text-[var(--text-muted)] max-w-md mx-auto">
              All reimbursement requests have been processed.
            </p>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            {filteredData.map((item) => (
              <div
                key={item.id}
                className="
                  card
                  p-5
                  flex
                  flex-col
                  xl:flex-row
                  xl:items-center
                  justify-between
                  gap-6
                  hover:translate-y-[-2px]
                  transition-all
                "
              >
                {/* LEFT */}
                <div className="flex items-start gap-4">
                  {/* ICON */}
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

                  {/* INFO */}
                  <div>
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-white font-semibold text-lg">
                        {item.expense?.description}
                      </h3>

                      <span className="badge badge-pending">
                        Pending Review
                      </span>
                    </div>

                    <div className="text-sm text-[var(--text-secondary)] mb-4">
                      ₹ {item.expense?.amount}
                    </div>

                    {/* WORKFLOW */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <div
                        className="
                          flex
                          items-center
                          gap-2
                          text-sm
                        "
                      >
                        <div
                          className="
                            h-8
                            w-8
                            rounded-full
                            bg-[var(--green-soft)]
                            flex
                            items-center
                            justify-center
                            text-[var(--green)]
                          "
                        >
                          <CheckCircle2 size={14} />
                        </div>

                        <span className="text-[var(--text-secondary)]">
                          Submitted
                        </span>
                      </div>

                      <div className="w-8 h-[2px] bg-[var(--border)]" />

                      <div
                        className="
                          flex
                          items-center
                          gap-2
                          text-sm
                        "
                      >
                        <div
                          className="
                            h-8
                            w-8
                            rounded-full
                            bg-[var(--amber-soft)]
                            flex
                            items-center
                            justify-center
                            text-[var(--amber)]
                          "
                        >
                          <Clock3 size={14} />
                        </div>

                        <span className="text-[var(--text-secondary)]">
                          Manager Review
                        </span>
                      </div>

                      <div className="w-8 h-[2px] bg-[var(--border)]" />

                      <div
                        className="
                          flex
                          items-center
                          gap-2
                          text-sm
                          opacity-50
                        "
                      >
                        <div
                          className="
                            h-8
                            w-8
                            rounded-full
                            bg-[rgba(255,255,255,0.05)]
                            flex
                            items-center
                            justify-center
                            text-[var(--text-muted)]
                          "
                        >
                          <Workflow size={14} />
                        </div>

                        <span className="text-[var(--text-muted)]">
                          Finance Review
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={() =>
                      setSelectedApproval(item)
                    }
                    className="btn-secondary"
                  >
                    <Eye size={16} />
                  </button>

                  <button
                    onClick={() =>
                      handleApprove(item.id)
                    }
                    disabled={
                      processingId === item.id
                    }
                    className="
                      btn-primary
                    "
                  >
                    {processingId === item.id
                      ? "Processing..."
                      : "Approve"}
                  </button>

                  <button
                    onClick={() =>
                      handleReject(item.id)
                    }
                    disabled={
                      processingId === item.id
                    }
                    className="
                      btn-secondary
                    "
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* APPROVAL DRAWER */}
      {selectedApproval && (
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
                  Approval Details
                </h2>

                <p className="text-[var(--text-muted)] mt-1">
                  Workflow and reimbursement metadata
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedApproval(null)
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
                  {
                    selectedApproval.expense
                      ?.description
                  }
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="card p-5">
                  <div className="text-xs text-[var(--text-muted)] mb-2">
                    Amount
                  </div>

                  <div className="text-white font-semibold">
                    ₹{" "}
                    {
                      selectedApproval.expense
                        ?.amount
                    }
                  </div>
                </div>

                <div className="card p-5">
                  <div className="text-xs text-[var(--text-muted)] mb-2">
                    Workflow State
                  </div>

                  <span className="badge badge-pending">
                    Pending Review
                  </span>
                </div>
              </div>

              {/* WORKFLOW */}
              <div className="card p-5">
                <div className="mb-5">
                  <h3 className="font-display text-xl">
                    Approval Timeline
                  </h3>

                  <p className="text-sm text-[var(--text-muted)] mt-1">
                    Workflow execution stages
                  </p>
                </div>

                <div className="space-y-5">
                  {/* STEP 1 */}
                  <div className="flex gap-4">
                    <div
                      className="
                        h-10
                        w-10
                        rounded-full
                        bg-[var(--green-soft)]
                        flex
                        items-center
                        justify-center
                        text-[var(--green)]
                      "
                    >
                      <CheckCircle2 size={18} />
                    </div>

                    <div>
                      <div className="text-white font-medium">
                        Expense Submitted
                      </div>

                      <div className="text-sm text-[var(--text-muted)]">
                        Employee created reimbursement request
                      </div>
                    </div>
                  </div>

                  {/* STEP 2 */}
                  <div className="flex gap-4">
                    <div
                      className="
                        h-10
                        w-10
                        rounded-full
                        bg-[var(--amber-soft)]
                        flex
                        items-center
                        justify-center
                        text-[var(--amber)]
                      "
                    >
                      <Clock3 size={18} />
                    </div>

                    <div>
                      <div className="text-white font-medium">
                        Manager Approval
                      </div>

                      <div className="text-sm text-[var(--text-muted)]">
                        Awaiting workflow approval
                      </div>
                    </div>
                  </div>

                  {/* STEP 3 */}
                  <div className="flex gap-4 opacity-50">
                    <div
                      className="
                        h-10
                        w-10
                        rounded-full
                        bg-[rgba(255,255,255,0.05)]
                        flex
                        items-center
                        justify-center
                        text-[var(--text-muted)]
                      "
                    >
                      <Workflow size={18} />
                    </div>

                    <div>
                      <div className="text-white font-medium">
                        Finance Processing
                      </div>

                      <div className="text-sm text-[var(--text-muted)]">
                        Final reimbursement verification
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-4 pt-2">
                <button
                  onClick={() =>
                    handleApprove(
                      selectedApproval.id
                    )
                  }
                  className="btn-primary"
                >
                  Approve Request
                </button>

                <button
                  onClick={() =>
                    handleReject(
                      selectedApproval.id
                    )
                  }
                  className="btn-secondary"
                >
                  Reject Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}