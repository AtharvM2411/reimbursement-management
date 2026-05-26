import { useState } from "react";
import toast from "react-hot-toast";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Sparkles,
  ShieldCheck,
  Workflow,
  BarChart3,
} from "lucide-react";

import { login } from "../../services/authService";

import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
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

  // LOGIN
  const handleLogin = async () => {
    try {
      if (!form.email || !form.password) {
        toast.success("Please fill all fields.");
        return;
      }

      setLoading(true);

      const res = await login(form);

      // STORE
      localStorage.setItem(
        "token",
        res.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.user)
      );

      // ROLE REDIRECT
      const role = res.user.role;

      if (role === "EMPLOYEE") {
        navigate("/employee");
      } else if (role === "MANAGER") {
        navigate("/manager");
      } else if (role === "ADMIN") {
        navigate("/admin");
      } else {
        toast.success("Unknown Rule");
      }
    } catch (err) {
      console.error(err);

      toast.error(
      err?.response?.data?.message ||
      "Invalid Credentials."
    );
    } finally {
      setLoading(false);
    }
  };

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
        {/* BACKGROUND GLOW */}
        <div
          className="
            absolute
            top-[-120px]
            left-[-120px]
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
            bottom-[-120px]
            right-[-120px]
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
                  Intelligent Expense Operations
                </p>
              </div>
            </div>

            <div className="max-w-xl">
              <h2 className="text-6xl leading-tight font-display mb-6">
                AI-powered reimbursement orchestration
              </h2>

              <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
                Streamline approvals, automate workflows,
                and manage enterprise reimbursements with
                intelligent finance operations.
              </p>
            </div>
          </div>

          {/* FEATURE CARDS */}
          <div className="grid grid-cols-3 gap-5">
            {/* WORKFLOW */}
            <div className="card p-5">
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
                <Workflow size={18} />
              </div>

              <div className="text-white font-medium mb-2">
                Workflow Engine
              </div>

              <div className="text-sm text-[var(--text-muted)]">
                Intelligent approval orchestration
              </div>
            </div>

            {/* ANALYTICS */}
            <div className="card p-5">
              <div
                className="
                  h-11
                  w-11
                  rounded-2xl
                  bg-[var(--green-soft)]
                  flex
                  items-center
                  justify-center
                  text-[var(--green)]
                  mb-4
                "
              >
                <BarChart3 size={18} />
              </div>

              <div className="text-white font-medium mb-2">
                Analytics
              </div>

              <div className="text-sm text-[var(--text-muted)]">
                Real-time financial visibility
              </div>
            </div>

            {/* SECURITY */}
            <div className="card p-5">
              <div
                className="
                  h-11
                  w-11
                  rounded-2xl
                  bg-[var(--amber-soft)]
                  flex
                  items-center
                  justify-center
                  text-[var(--amber)]
                  mb-4
                "
              >
                <ShieldCheck size={18} />
              </div>

              <div className="text-white font-medium mb-2">
                Enterprise Security
              </div>

              <div className="text-sm text-[var(--text-muted)]">
                Secure reimbursement processing
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
        <div className="w-full max-w-md">
          {/* MOBILE BRAND */}
          <div className="xl:hidden mb-10">
            <div className="flex items-center gap-3 mb-4">
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

          {/* AUTH CARD */}
          <div className="card p-8">
            {/* HEADER */}
            <div className="mb-8">
              <h2 className="text-4xl font-display mb-3">
                Welcome back
              </h2>

              <p className="text-[var(--text-secondary)]">
                Login to continue managing reimbursements
                and workflow approvals.
              </p>
            </div>

            {/* FORM */}
            <div className="space-y-5">
              {/* EMAIL */}
              <div>
                <label className="block text-sm text-[var(--text-secondary)] mb-2">
                  Email Address
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
                    placeholder="Enter your email"
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
                    placeholder="Enter your password"
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

              {/* REMEMBER */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                  <input type="checkbox" />

                  Remember session
                </label>

                <button className="text-sm text-[var(--accent)] hover:opacity-80">
                  Forgot password?
                </button>
              </div>

              {/* LOGIN BUTTON */}
              <button
                onClick={handleLogin}
                disabled={loading}
                className={`
                  w-full
                  btn-primary
                  justify-center
                  mt-3
                  ${
                    loading
                      ? "opacity-60 cursor-not-allowed"
                      : ""
                  }
                `}
              >
                {loading
                  ? "Signing in..."
                  : "Login to Platform"}
              </button>
            </div>

            {/* SIGNUP */}
            <div
              className="
                mt-8
                pt-6
                border-t border-[var(--border)]
                text-center
              "
            >
              <p className="text-[var(--text-secondary)]">
                Don’t have an account?{" "}
                <a
                  href="/signup"
                  className="
                    text-[var(--accent)]
                    hover:opacity-80
                    font-medium
                  "
                >
                  Create organization
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}