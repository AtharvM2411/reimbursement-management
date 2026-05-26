import {
  Eye,
  Receipt,
  MoreHorizontal,
} from "lucide-react";

export default function ExpenseTable({
  expenses = [],
}) {
  return (
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
            Expense Records
          </h3>

          <p className="text-sm text-[var(--text-muted)] mt-1">
            Monitor submitted reimbursements
          </p>
        </div>

        <button className="btn-secondary">
          Export CSV
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                {/* USER */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      {expense.user?.name?.[0]}
                    </div>

                    <div>
                      <div className="text-white font-medium">
                        {expense.user?.name}
                      </div>

                      <div className="text-xs text-[var(--text-muted)]">
                        Employee
                      </div>
                    </div>
                  </div>
                </td>

                {/* DESCRIPTION */}
                <td>
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        h-9
                        w-9
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
                        {expense.description}
                      </div>

                      <div className="text-xs text-[var(--text-muted)]">
                        Expense Claim
                      </div>
                    </div>
                  </div>
                </td>

                {/* AMOUNT */}
                <td>
                  <div className="text-white font-semibold">
                    ₹ {expense.amount}
                  </div>
                </td>

                {/* STATUS */}
                <td>
                  <span
                    className={
                      expense.status === "APPROVED"
                        ? "badge badge-approved"
                        : expense.status === "REJECTED"
                        ? "badge badge-rejected"
                        : "badge badge-pending"
                    }
                  >
                    {expense.status}
                  </span>
                </td>

                {/* DATE */}
                <td>
                  <div className="text-[var(--text-secondary)]">
                    {new Date(
                      expense.createdAt
                    ).toLocaleDateString()}
                  </div>
                </td>

                {/* ACTIONS */}
                <td>
                  <div className="flex items-center gap-2">
                    <button className="btn-secondary">
                      <Eye size={15} />
                    </button>

                    <button className="btn-secondary">
                      <MoreHorizontal size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}