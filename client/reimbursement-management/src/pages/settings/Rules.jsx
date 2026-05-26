import { useEffect, useMemo, useState } from "react";

import {
  Workflow,
  Sparkles,
  ShieldCheck,
  GitBranch,
  Filter,
  Search,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  BrainCircuit,
  Building2,
} from "lucide-react";

import AppShell from "../../layouts/AppShell";

import api from "../../services/api";

export default function Rules() {
  const [rules, setRules] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedRule, setSelectedRule] =
    useState(null);

  // FETCH RULES
  const fetchRules = async () => {
    try {
      setLoading(true);

      const res = await api.get("/rules");

      setRules(res.data);
    } catch (err) {
      console.error(
        "Error fetching rules:",
        err
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  // FILTERED RULES
  const filteredRules = useMemo(() => {
    return rules.filter((rule) =>
      rule.type
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [rules, search]);

  // RULE STATS
  const stats = useMemo(() => {
    return {
      total: rules.length,

      percentage: rules.filter(
        (r) => r.type === "PERCENTAGE"
      ).length,

      approver: rules.filter(
        (r) =>
          r.type === "SPECIFIC_APPROVER"
      ).length,

      custom: rules.filter(
        (r) =>
          r.type !== "PERCENTAGE" &&
          r.type !== "SPECIFIC_APPROVER"
      ).length,
    };
  }, [rules]);

  // BADGE
  const getRuleBadge = (type) => {
    if (type === "PERCENTAGE")
      return "badge badge-approved";

    if (type === "SPECIFIC_APPROVER")
      return "badge badge-pending";

    return "badge badge-rejected";
  };

  return (
    <AppShell title="Workflow Rules">
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
              Workflow Automation Engine
            </h1>

            <p className="text-[var(--text-secondary)] mt-1">
              Configure approval logic, escalation paths, and intelligent reimbursement workflows
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
                Active Rules
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
              <Workflow size={20} />
            </div>
          </div>
        </div>

        {/* PERCENTAGE */}
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="stat-title">
                Percentage Rules
              </div>

              <div className="stat-value">
                {stats.percentage}
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
              <ShieldCheck size={20} />
            </div>
          </div>
        </div>

        {/* APPROVER */}
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="stat-title">
                Approver Rules
              </div>

              <div className="stat-value">
                {stats.approver}
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
              <GitBranch size={20} />
            </div>
          </div>
        </div>

        {/* CUSTOM */}
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="stat-title">
                Custom Logic
              </div>

              <div className="stat-value">
                {stats.custom}
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
              <AlertTriangle size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* AI INSIGHTS */}
      <div className="card p-6 mb-8">
        <div className="flex items-start gap-4">
          <div
            className="
              h-14
              w-14
              rounded-2xl
              bg-[var(--accent-soft)]
              flex
              items-center
              justify-center
              text-[var(--accent)]
              shrink-0
            "
          >
            <BrainCircuit size={24} />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="font-display text-2xl">
                AI Workflow Suggestions
              </h3>

              <span className="badge badge-approved">
                Intelligent Insights
              </span>
            </div>

            <div className="space-y-3">
              <div className="card p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-white font-medium mb-1">
                      Add finance review for travel claims above ₹20,000
                    </div>

                    <div className="text-sm text-[var(--text-muted)]">
                      AI detected increasing high-value travel reimbursements
                    </div>
                  </div>

                  <button className="btn-secondary">
                    Apply
                  </button>
                </div>
              </div>

              <div className="card p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-white font-medium mb-1">
                      Add director escalation for international reimbursements
                    </div>

                    <div className="text-sm text-[var(--text-muted)]">
                      Workflow optimization recommended by policy engine
                    </div>
                  </div>

                  <button className="btn-secondary">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="card p-5 mb-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-display text-xl">
              Workflow Filters
            </h3>

            <p className="text-sm text-[var(--text-muted)] mt-1">
              Search and manage approval automation rules
            </p>
          </div>

          <button className="btn-primary">
            <Sparkles size={16} />
            Create Rule
          </button>
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
            placeholder="Search workflow rules..."
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

      {/* RULES GRID */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="skeleton h-40 w-full"
            />
          ))}
        </div>
      ) : filteredRules.length === 0 ? (
        <div className="card p-16 text-center">
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
            <Workflow size={32} />
          </div>

          <h3 className="text-2xl font-display mb-2">
            No Workflow Rules Found
          </h3>

          <p className="text-[var(--text-muted)]">
            Create automation logic to manage reimbursement approvals.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredRules.map((rule) => (
            <div
              key={rule.id}
              className="
                card
                p-6
                hover:translate-y-[-2px]
                transition-all
              "
            >
              {/* TOP */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-display text-2xl">
                      {rule.type}
                    </h3>

                    <span
                      className={getRuleBadge(
                        rule.type
                      )}
                    >
                      Active
                    </span>
                  </div>

                  <p className="text-[var(--text-secondary)]">
                    {rule.type === "PERCENTAGE"
                      ? `${rule.value}% approval required`
                      : rule.type ===
                        "SPECIFIC_APPROVER"
                      ? `${
                          rule.approver?.name ||
                          "Approver"
                        } approval required`
                      : "Custom workflow automation logic"}
                  </p>
                </div>

                <button
                  onClick={() =>
                    setSelectedRule(rule)
                  }
                  className="btn-secondary"
                >
                  View Rule
                </button>
              </div>

              {/* FLOW */}
              <div
                className="
                  card
                  p-5
                  flex
                  flex-wrap
                  items-center
                  gap-4
                "
              >
                {/* EMPLOYEE */}
                <div className="flex items-center gap-3">
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
                    <Building2 size={18} />
                  </div>

                  <div>
                    <div className="text-white font-medium">
                      Employee
                    </div>

                    <div className="text-xs text-[var(--text-muted)]">
                      Expense Submitted
                    </div>
                  </div>
                </div>

                <ArrowRight
                  className="text-[var(--text-muted)]"
                  size={18}
                />

                {/* MANAGER */}
                <div className="flex items-center gap-3">
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
                    <ShieldCheck size={18} />
                  </div>

                  <div>
                    <div className="text-white font-medium">
                      Manager Review
                    </div>

                    <div className="text-xs text-[var(--text-muted)]">
                      Conditional Validation
                    </div>
                  </div>
                </div>

                <ArrowRight
                  className="text-[var(--text-muted)]"
                  size={18}
                />

                {/* FINANCE */}
                <div className="flex items-center gap-3">
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
                    <Workflow size={18} />
                  </div>

                  <div>
                    <div className="text-white font-medium">
                      Finance Approval
                    </div>

                    <div className="text-xs text-[var(--text-muted)]">
                      Workflow Execution
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* RULE DRAWER */}
      {selectedRule && (
        <div className="modal-overlay">
          <div
            className="
              modal-panel
              p-6
              max-w-3xl
            "
          >
            {/* HEADER */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="font-display text-3xl">
                  Workflow Rule Details
                </h2>

                <p className="text-[var(--text-muted)] mt-1">
                  Approval automation and orchestration overview
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedRule(null)
                }
                className="btn-secondary"
              >
                Close
              </button>
            </div>

            {/* DETAILS */}
            <div className="space-y-5">
              {/* RULE TYPE */}
              <div className="card p-5">
                <div className="text-xs text-[var(--text-muted)] mb-2">
                  Workflow Type
                </div>

                <div className="flex items-center gap-3">
                  <h3 className="text-white text-2xl font-semibold">
                    {selectedRule.type}
                  </h3>

                  <span
                    className={getRuleBadge(
                      selectedRule.type
                    )}
                  >
                    Active
                  </span>
                </div>
              </div>

              {/* CONDITIONS */}
              <div className="grid grid-cols-2 gap-5">
                <div className="card p-5">
                  <div className="text-xs text-[var(--text-muted)] mb-2">
                    Condition Logic
                  </div>

                  <div className="text-white font-medium">
                    {selectedRule.type ===
                    "PERCENTAGE"
                      ? `${selectedRule.value}% approval threshold`
                      : "Specific workflow approver"}
                  </div>
                </div>

                <div className="card p-5">
                  <div className="text-xs text-[var(--text-muted)] mb-2">
                    Assigned Approver
                  </div>

                  <div className="text-white font-medium">
                    {selectedRule.approver
                      ?.name || "Finance Team"}
                  </div>
                </div>
              </div>

              {/* EXECUTION FLOW */}
              <div className="card p-5">
                <div className="mb-5">
                  <h3 className="font-display text-xl">
                    Workflow Execution
                  </h3>

                  <p className="text-sm text-[var(--text-muted)] mt-1">
                    Approval orchestration lifecycle
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
                        Expense Triggered
                      </div>

                      <div className="text-sm text-[var(--text-muted)]">
                        Workflow initiated automatically
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
                      <GitBranch size={18} />
                    </div>

                    <div>
                      <div className="text-white font-medium">
                        Rule Evaluation
                      </div>

                      <div className="text-sm text-[var(--text-muted)]">
                        Conditions and thresholds verified
                      </div>
                    </div>
                  </div>

                  {/* STEP 3 */}
                  <div className="flex gap-4">
                    <div
                      className="
                        h-10
                        w-10
                        rounded-full
                        bg-[var(--accent-soft)]
                        flex
                        items-center
                        justify-center
                        text-[var(--accent)]
                      "
                    >
                      <Workflow size={18} />
                    </div>

                    <div>
                      <div className="text-white font-medium">
                        Approval Executed
                      </div>

                      <div className="text-sm text-[var(--text-muted)]">
                        Workflow orchestration completed
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-4 pt-2">
                <button className="btn-primary">
                  Edit Workflow
                </button>

                <button className="btn-secondary">
                  Disable Rule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}