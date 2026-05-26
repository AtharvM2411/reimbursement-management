import { useState } from "react";
import toast from "react-hot-toast";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ShieldCheck,
  Building2,
  Sparkles,
  Workflow,
  CheckCircle2,
  Briefcase,
} from "lucide-react";

import { signup } from "../../services/authService";

import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    company: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();

  // HANDLE CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // SIGNUP
  const handleSignup = async () => {
    try {
      if (
        !form.name ||
        !form.email ||
        !form.password ||
        !form.role
      ) {
        toast.success("Please fill all Fields");
        return;
      }

      setLoading(true);

      await signup(form);

      toast.success("Organization Account Created successfully.");

      navigate("/");
    } catch (err) {
      console.error(err);

      toast.error(
        err?.response?.data?.message ||
        "Signup Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // ROLE CARD
  const roleCard = (
    value,
    label,
    icon,
    desc
  ) => (
    <button
      type="button"
      onClick={() =>
        setForm({
          ...form,
          role: value,
        })
      }
      className={`
        card
        p-4
        text-left
        transition-all
        border
        ${
          form.role === value
            ? "border-[var(--accent)] bg-[rgba(124,99,255,0.08)]"
            : "border-[var(--border)]"
        }
      `}
    >
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
          mb-4
        "
      >
        {icon}
      </div>

      <div className="text-white font-medium mb-1">
        {label}
      </div>

      <div className="text-sm text-[var(--text-muted)]">
        {desc}
      </div>
    </button>
  );

  return (
    <div
      className="
        min-h-screen
        bg-[var(--bg-primary)]
        flex
      "
    >
      {/* LEFT PANEL */}
      <div
        className="
          hidden
          xl:flex
          flex-1
          relative
          overflow-hidden
          border-r border-[var(--border)]
        "
      >
        {/* GLOW */}
        <div
          className="
            absolute
            top-[-140px]
            left-[-140px]
            w-[420px]
            h-[420px]
            rounded-full
            bg-[rgba(124,99,255,0.18)]
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            bottom-[-140px]
            right-[-140px]
            w-[420px]
            h-[420px]
            rounded-full
            bg-[rgba(59,130,246,0.14)]
            blur-[120px]
          "
        />

        {/* CONTENT */}
        <div
          className="
            relative
            z-10
            p-16
            flex
            flex-col
            justify-between
            w-full
          "
        >
          {/* TOP */}
          <div>
            <div className="flex items-center gap-3 mb-8">
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
                "
              >
                <Sparkles size={24} />
              </div>

              <div>
                <h1 className="text-3xl font-display gradient-text">
                  ReimburseAI
                </h1>

                <p className="text-[var(--text-muted)] mt-1">
                  Intelligent Workflow Platform
                </p>
              </div>
            </div>

            <div className="max-w-xl">
              <h2 className="text-6xl leading-tight font-display mb-6">
                Build intelligent reimbursement operations
              </h2>

              <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
                Create AI-powered approval workflows,
                automate finance operations, and manage
                enterprise reimbursements at scale.
              </p>
            </div>
          </div>

          {/* FEATURE LIST */}
          <div className="space-y-5">
            {/* FEATURE */}
            <div className="card p-5 flex items-start gap-4">
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
                  shrink-0
                "
              >
                <Workflow size={20} />
              </div>

              <div>
                <div className="text-white font-medium mb-1">
                  AI Workflow Automation
                </div>

                <div className="text-sm text-[var(--text-muted)]">
                  Build intelligent reimbursement approval pipelines
                </div>
              </div>
            </div>

            {/* FEATURE */}
            <div className="card p-5 flex items-start gap-4">
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
                  shrink-0
                "
              >
                <ShieldCheck size={20} />
              </div>

              <div>
                <div className="text-white font-medium mb-1">
                  Enterprise Governance
                </div>

                <div className="text-sm text-[var(--text-muted)]">
                  Role-based approvals and financial controls
                </div>
              </div>
            </div>

            {/* FEATURE */}
            <div className="card p-5 flex items-start gap-4">
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
                  shrink-0
                "
              >
                <Sparkles size={20} />
              </div>

              <div>
                <div className="text-white font-medium mb-1">
                  Intelligent OCR Extraction
                </div>

                <div className="text-sm text-[var(--text-muted)]">
                  AI-assisted receipt processing and workflow insights
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div
        className="
          flex-1
          flex
          items-center
          justify-center
          p-8
        "
      >
        <div className="w-full max-w-2xl">
          {/* MOBILE BRAND */}
          <div className="xl:hidden mb-10">
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
                <Sparkles size={20} />
              </div>

              <div>
                <h1 className="text-2xl font-display gradient-text">
                  ReimburseAI
                </h1>

                <p className="text-[var(--text-muted)] text-sm">
                  Expense Intelligence Platform
                </p>
              </div>
            </div>
          </div>

          {/* SIGNUP CARD */}
          <div className="card p-8">
            {/* HEADER */}
            <div className="mb-8">
              <h2 className="text-4xl font-display mb-3">
                Create Organization
              </h2>

              <p className="text-[var(--text-secondary)]">
                Setup your reimbursement workspace and
                configure enterprise workflow access.
              </p>
            </div>

            {/* ORGANIZATION */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Building2
                  size={18}
                  className="text-[var(--accent)]"
                />

                <h3 className="text-lg font-semibold">
                  Organization Setup
                </h3>
              </div>

              <div className="space-y-5">
                {/* COMPANY */}
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-2">
                    Company Name
                  </label>

                  <div className="relative">
                    <Building2
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
                      name="company"
                      placeholder="Enter company name"
                      value={form.company}
                      onChange={handleChange}
                      className="
                        input-field
                        pl-10
                      "
                    />
                  </div>
                </div>

                {/* NAME */}
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-2">
                    Full Name
                  </label>

                  <div className="relative">
                    <User
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
                      name="name"
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={handleChange}
                      className="
                        input-field
                        pl-10
                      "
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-2">
                    Work Email
                  </label>

                  <div className="relative">
                    <Mail
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
                      type="email"
                      name="email"
                      placeholder="Enter your work email"
                      value={form.email}
                      onChange={handleChange}
                      className="
                        input-field
                        pl-10
                      "
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-2">
                    Password
                  </label>

                  <div className="relative">
                    <Lock
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
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="password"
                      placeholder="Create password"
                      value={form.password}
                      onChange={handleChange}
                      className="
                        input-field
                        pl-10
                        pr-12
                      "
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className="
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        text-[var(--text-muted)]
                      "
                    >
                      {showPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ROLE SELECTION */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase
                  size={18}
                  className="text-[var(--accent)]"
                />

                <h3 className="text-lg font-semibold">
                  Select Organization Role
                </h3>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {roleCard(
                  "EMPLOYEE",
                  "Employee",
                  <User size={18} />,
                  "Submit and track reimbursements"
                )}

                {roleCard(
                  "MANAGER",
                  "Manager",
                  <Workflow size={18} />,
                  "Review and approve expenses"
                )}

                {roleCard(
                  "ADMIN",
                  "Administrator",
                  <ShieldCheck size={18} />,
                  "Manage workflows and organization"
                )}
              </div>
            </div>

            {/* CHECKLIST */}
            <div className="card p-5 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2
                  size={18}
                  className="text-[var(--green)]"
                />

                <h3 className="font-semibold">
                  Platform Features Included
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                  <CheckCircle2
                    size={15}
                    className="text-[var(--green)]"
                  />

                  AI receipt extraction
                </div>

                <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                  <CheckCircle2
                    size={15}
                    className="text-[var(--green)]"
                  />

                  Approval workflow automation
                </div>

                <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                  <CheckCircle2
                    size={15}
                    className="text-[var(--green)]"
                  />

                  Real-time reimbursement analytics
                </div>

                <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                  <CheckCircle2
                    size={15}
                    className="text-[var(--green)]"
                  />

                  Enterprise organization controls
                </div>
              </div>
            </div>

            {/* CREATE BUTTON */}
            <button
              onClick={handleSignup}
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
                ? "Creating Organization..."
                : "Create Workspace"}
            </button>

            {/* LOGIN */}
            <div
              className="
                mt-8
                pt-6
                border-t border-[var(--border)]
                text-center
              "
            >
              <p className="text-[var(--text-secondary)]">
                Already have an account?{" "}
                <a
                  href="/"
                  className="
                    text-[var(--accent)]
                    hover:opacity-80
                    font-medium
                  "
                >
                  Login to platform
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}