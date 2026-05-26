import { useMemo, useState } from "react";

import {
  LayoutDashboard,
  Receipt,
  FileText,
  Workflow,
  ShieldCheck,
  Users,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  Sparkles,
  ChevronDown,
} from "lucide-react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/");
  };

  // NAV ITEMS
  const navItems = useMemo(() => {
    if (user?.role === "EMPLOYEE") {
      return [
        {
          label: "Dashboard",
          path: "/employee",
          icon: <LayoutDashboard size={16} />,
        },
        {
          label: "Submit",
          path: "/submit",
          icon: <Receipt size={16} />,
        },
        {
          label: "Expenses",
          path: "/expenses",
          icon: <FileText size={16} />,
        },
      ];
    }

    if (user?.role === "MANAGER") {
      return [
        {
          label: "Dashboard",
          path: "/manager",
          icon: <LayoutDashboard size={16} />,
        },
        {
          label: "Approvals",
          path: "/approvals",
          icon: <Workflow size={16} />,
        },
      ];
    }

    if (user?.role === "ADMIN") {
      return [
        {
          label: "Dashboard",
          path: "/admin",
          icon: <LayoutDashboard size={16} />,
        },
        {
          label: "Users",
          path: "/settings/users",
          icon: <Users size={16} />,
        },
        {
          label: "Rules",
          path: "/settings/rules",
          icon: <ShieldCheck size={16} />,
        },
      ];
    }

    return [];
  }, [user]);

  return (
    <>
      {/* TOPBAR */}
      <div
        className="
          sticky
          top-0
          z-50
          h-[74px]
          px-5
          lg:px-8
          flex
          items-center
          justify-between
          border-b border-[var(--border)]
          bg-[rgba(10,10,15,0.78)]
          backdrop-blur-xl
        "
      >
        {/* LEFT */}
        <div className="flex items-center gap-4">
          {/* MOBILE MENU */}
          <button
            onClick={() =>
              setMobileOpen(true)
            }
            className="
              lg:hidden
              btn-secondary
              p-2
            "
          >
            <Menu size={18} />
          </button>

          {/* LOGO */}
          <div
            onClick={() => {
              if (user?.role === "EMPLOYEE") {
                navigate("/employee");
              } else if (
                user?.role === "MANAGER"
              ) {
                navigate("/manager");
              } else {
                navigate("/admin");
              }
            }}
            className="
              flex
              items-center
              gap-3
              cursor-pointer
            "
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
                floating
              "
            >
              <Sparkles size={18} />
            </div>

            <div>
              <h1 className="font-display text-xl gradient-text">
                ReimburseAI
              </h1>

              <p className="text-xs text-[var(--text-muted)]">
                Expense Intelligence Platform
              </p>
            </div>
          </div>
        </div>

        {/* CENTER NAV */}
        <div
          className="
            hidden
            lg:flex
            items-center
            gap-2
          "
        >
          {navItems.map((item) => {
            const active =
              location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() =>
                  navigate(item.path)
                }
                className={`
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2.5
                  rounded-xl
                  text-sm
                  font-medium
                  transition-all
                  ${
                    active
                      ? `
                        bg-[rgba(124,99,255,0.14)]
                        border border-[rgba(124,99,255,0.18)]
                        text-white
                      `
                      : `
                        text-[var(--text-secondary)]
                        hover:bg-[rgba(255,255,255,0.04)]
                        hover:text-white
                      `
                  }
                `}
              >
                {item.icon}

                {item.label}
              </button>
            );
          })}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* SEARCH */}
          <button
            className="
              hidden
              md:flex
              items-center
              gap-2
              h-11
              px-4
              rounded-xl
              border border-[var(--border)]
              bg-[rgba(255,255,255,0.03)]
              text-[var(--text-muted)]
              hover:border-[var(--border-strong)]
              transition-all
            "
          >
            <Search size={15} />

            <span className="text-sm">
              Search platform...
            </span>
          </button>

          {/* NOTIFICATIONS */}
          <button
            className="
              relative
              h-11
              w-11
              rounded-xl
              border border-[var(--border)]
              bg-[rgba(255,255,255,0.03)]
              flex
              items-center
              justify-center
              text-[var(--text-secondary)]
              hover:text-white
              hover:border-[var(--border-strong)]
              transition-all
            "
          >
            <Bell size={17} />

            <span
              className="
                absolute
                top-2
                right-2
                h-2
                w-2
                rounded-full
                bg-[var(--red)]
              "
            />
          </button>

          {/* PROFILE */}
          <div className="relative">
            <button
              onClick={() =>
                setProfileOpen(
                  !profileOpen
                )
              }
              className="
                flex
                items-center
                gap-3
                px-3
                py-2
                rounded-2xl
                border border-[var(--border)]
                bg-[rgba(255,255,255,0.03)]
                hover:border-[var(--border-strong)]
                transition-all
              "
            >
              <div className="avatar">
                {user?.name?.[0] || "U"}
              </div>

              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-white">
                  {user?.name || "User"}
                </div>

                <div className="text-xs text-[var(--text-muted)]">
                  {user?.role}
                </div>
              </div>

              <ChevronDown
                size={15}
                className="
                  text-[var(--text-muted)]
                "
              />
            </button>

            {/* DROPDOWN */}
            {profileOpen && (
              <div
                className="
                  absolute
                  right-0
                  top-[calc(100%+12px)]
                  w-64
                  card
                  p-3
                  animate-fadeUp
                "
              >
                {/* USER */}
                <div
                  className="
                    flex
                    items-center
                    gap-3
                    p-3
                    rounded-xl
                    bg-[rgba(255,255,255,0.03)]
                    mb-3
                  "
                >
                  <div className="avatar">
                    {user?.name?.[0] || "U"}
                  </div>

                  <div>
                    <div className="text-white font-medium">
                      {user?.name}
                    </div>

                    <div className="text-sm text-[var(--text-muted)]">
                      {user?.email}
                    </div>
                  </div>
                </div>

                {/* ROLE */}
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    p-3
                    rounded-xl
                    bg-[rgba(255,255,255,0.03)]
                    mb-3
                  "
                >
                  <span className="text-sm text-[var(--text-muted)]">
                    Workspace Role
                  </span>

                  <span className="badge badge-premium">
                    {user?.role}
                  </span>
                </div>

                {/* LOGOUT */}
                <button
                  onClick={handleLogout}
                  className="
                    w-full
                    btn-secondary
                    justify-center
                  "
                >
                  <LogOut size={16} />

                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      {mobileOpen && (
        <div className="modal-overlay lg:hidden">
          <div
            className="
              h-full
              w-[300px]
              bg-[var(--bg-card)]
              border-r border-[var(--border)]
              p-6
              animate-fadeUp
            "
          >
            {/* TOP */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display text-2xl gradient-text">
                  ReimburseAI
                </h2>

                <p className="text-sm text-[var(--text-muted)] mt-1">
                  Navigation
                </p>
              </div>

              <button
                onClick={() =>
                  setMobileOpen(false)
                }
                className="btn-secondary p-2"
              >
                <X size={18} />
              </button>
            </div>

            {/* NAV */}
            <div className="space-y-2">
              {navItems.map((item) => {
                const active =
                  location.pathname ===
                  item.path;

                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);

                      setMobileOpen(false);
                    }}
                    className={`
                      w-full
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      rounded-2xl
                      transition-all
                      ${
                        active
                          ? `
                            bg-[rgba(124,99,255,0.14)]
                            border border-[rgba(124,99,255,0.18)]
                            text-white
                          `
                          : `
                            text-[var(--text-secondary)]
                            hover:bg-[rgba(255,255,255,0.04)]
                          `
                      }
                    `}
                  >
                    {item.icon}

                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* FOOTER */}
            <div className="absolute bottom-6 left-6 right-6">
              <button
                onClick={handleLogout}
                className="
                  w-full
                  btn-secondary
                  justify-center
                "
              >
                <LogOut size={16} />

                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;