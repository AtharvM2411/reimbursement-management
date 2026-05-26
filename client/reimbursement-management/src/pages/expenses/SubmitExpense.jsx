import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Upload,
  Sparkles,
  Receipt,
  IndianRupee,
  FileImage,
  CheckCircle2,
} from "lucide-react";

import AppShell from "../../layouts/AppShell";

import { createExpense } from "../../services/expenseService";

export default function SubmitExpense() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [currency, setCurrency] = useState("INR");

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // FILE HANDLER
  const handleFileChange = (e) => {
    const selected = e.target.files[0];

    setFile(selected);

    if (selected) {
      setPreview(URL.createObjectURL(selected));
    }
  };

  // SUBMIT
  const handleSubmit = async () => {
    if (!amount || !description) {
      toast.success("Fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("amount", Number(amount));
      formData.append("currency", currency);
      formData.append("description", description);

      if (file) {
        formData.append("receipt", file);
      }

      await createExpense(formData);

      toast.success("Expense submitted successfully");

      navigate("/employee");
    } catch (err) {
      console.error(err);

      toast.error(
        err?.response?.data?.message ||
        "Error submitting expense"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell title="Submit Expense">
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
              Submit Expense
            </h1>

            <p className="text-[var(--text-secondary)] mt-1">
              Upload receipts and create reimbursement requests
            </p>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-3
          gap-6
        "
      >
        {/* LEFT SIDE */}
        <div className="xl:col-span-2 space-y-6">
          {/* RECEIPT UPLOAD */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display text-2xl">
                  Receipt Upload
                </h3>

                <p className="text-sm text-[var(--text-muted)] mt-1">
                  Upload invoice, bill, or reimbursement receipt
                </p>
              </div>

              <div
                className="
                  badge
                  badge-approved
                "
              >
                OCR Ready
              </div>
            </div>

            {/* DROPZONE */}
            <label
              className="
                border-2
                border-dashed
                border-[var(--border)]
                rounded-3xl
                p-10
                flex
                flex-col
                items-center
                justify-center
                text-center
                cursor-pointer
                transition-all
                hover:border-[var(--accent)]
                hover:bg-[rgba(124,99,255,0.04)]
              "
            >
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />

              <div
                className="
                  h-16
                  w-16
                  rounded-2xl
                  bg-[var(--accent-soft)]
                  flex
                  items-center
                  justify-center
                  text-[var(--accent)]
                  mb-5
                "
              >
                <Upload size={28} />
              </div>

              <h3 className="text-xl font-semibold mb-2">
                Upload Receipt
              </h3>

              <p className="text-[var(--text-muted)] max-w-md">
                Drag & drop your receipt or click to browse files
              </p>

              <div className="mt-5 text-xs text-[var(--text-muted)]">
                PNG, JPG, PDF up to 10MB
              </div>
            </label>

            {/* PREVIEW */}
            {preview && (
              <div className="mt-6">
                <div className="card p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={preview}
                      alt="preview"
                      className="
                        w-28
                        h-28
                        object-cover
                        rounded-2xl
                        border border-[var(--border)]
                      "
                    />

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <FileImage
                          size={16}
                          className="text-[var(--accent)]"
                        />

                        <span className="text-white font-medium">
                          {file?.name}
                        </span>
                      </div>

                      <div className="text-sm text-[var(--text-muted)]">
                        Receipt successfully uploaded
                      </div>

                      <div className="mt-4 flex items-center gap-2 text-sm text-[var(--green)]">
                        <CheckCircle2 size={16} />

                        OCR scan ready
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* EXPENSE DETAILS */}
          <div className="card p-6">
            <div className="mb-6">
              <h3 className="font-display text-2xl">
                Expense Details
              </h3>

              <p className="text-sm text-[var(--text-muted)] mt-1">
                Provide reimbursement information
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* AMOUNT */}
              <div>
                <label className="block text-sm text-[var(--text-secondary)] mb-2">
                  Amount
                </label>

                <div className="relative">
                  <IndianRupee
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
                    type="number"
                    value={amount}
                    onChange={(e) =>
                      setAmount(e.target.value)
                    }
                    placeholder="Enter amount"
                    className="
                      input-field
                      pl-10
                    "
                  />
                </div>
              </div>

              {/* CURRENCY */}
              <div>
                <label className="block text-sm text-[var(--text-secondary)] mb-2">
                  Currency
                </label>

                <select
                  value={currency}
                  onChange={(e) =>
                    setCurrency(e.target.value)
                  }
                  className="input-field"
                >
                  <option value="INR">
                    INR ₹
                  </option>

                  <option value="USD">
                    USD $
                  </option>

                  <option value="EUR">
                    EUR €
                  </option>
                </select>
              </div>

              {/* DESCRIPTION */}
              <div className="md:col-span-2">
                <label className="block text-sm text-[var(--text-secondary)] mb-2">
                  Description
                </label>

                <textarea
                  rows={5}
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  placeholder="Describe the expense purpose..."
                  className="input-field resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          {/* AI EXTRACTION */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-5">
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
                <Sparkles size={18} />
              </div>

              <div>
                <h3 className="font-display text-xl">
                  AI Extraction
                </h3>

                <p className="text-sm text-[var(--text-muted)]">
                  OCR receipt intelligence
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="card p-4">
                <div className="text-xs text-[var(--text-muted)] mb-1">
                  Merchant
                </div>

                <div className="text-white font-medium">
                  Starbucks Coffee
                </div>
              </div>

              <div className="card p-4">
                <div className="text-xs text-[var(--text-muted)] mb-1">
                  Detected Amount
                </div>

                <div className="text-white font-medium">
                  ₹ 1,240
                </div>
              </div>

              <div className="card p-4">
                <div className="text-xs text-[var(--text-muted)] mb-1">
                  Category
                </div>

                <div className="text-white font-medium">
                  Meals & Travel
                </div>
              </div>

              <div className="card p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[var(--text-muted)]">
                    OCR Confidence
                  </span>

                  <span className="text-sm text-[var(--green)]">
                    98%
                  </span>
                </div>

                <div
                  className="
                    h-2
                    rounded-full
                    bg-[rgba(255,255,255,0.05)]
                    overflow-hidden
                  "
                >
                  <div
                    className="
                      h-full
                      w-[98%]
                      bg-[var(--green)]
                      rounded-full
                    "
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SUBMIT CARD */}
          <div className="card p-6">
            <h3 className="font-display text-xl mb-2">
              Ready to Submit
            </h3>

            <p className="text-sm text-[var(--text-muted)] mb-6">
              Review expense details before submission
            </p>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`
                w-full
                btn-primary
                justify-center
                ${
                  loading
                    ? "opacity-60 cursor-not-allowed"
                    : ""
                }
              `}
            >
              {loading
                ? "Submitting Expense..."
                : "Submit Expense"}
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}