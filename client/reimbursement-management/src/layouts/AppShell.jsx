import { useEffect, useMemo, useState } from "react";

import {
  LayoutDashboard,
  Receipt,
  CheckCircle2,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  Sparkles,
  Workflow,
  Command,
  X,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

const navigation = [
  {
    section: "MAIN",

    items: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/admin",
      },

      {
        label: "Expenses",
        icon: Receipt,
        href: "/expenses",
      },
    ],
  },

  {
    section: "WORKFLOW",

    items: [
      {
        label: "Approvals",
        icon: CheckCircle2,
        href: "/approvals",
      },

      {
        label: "Rules",
        icon: Workflow,
        href: "/settings/rules",
      },
    ],
  },

  {
    section: "ADMIN",

    items: [
      {
        label: "Users",
        icon: Users,
        href: "/settings/users",
      },

      {
        label: "Settings",
        icon: Settings,
        href: "/settings",
      },
    ],
  },
];

export default function AppShell({
  children,
  title = "Dashboard",
}) {
  const navigate = useNavigate();

  const location = useLocation();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [collapsed, setCollapsed] =
    useState(false);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [commandOpen, setCommandOpen] =
    useState(false);

  // KEYBOARD SHORTCUT
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        (e.metaKey || e.ctrlKey) &&
        e.key.toLowerCase() === "k"
      ) {
        e.preventDefault();

        setCommandOpen((prev) => !prev);
      }

      if (e.key === "Escape") {
        setCommandOpen(false);

        setMobileOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, []);

  // ALL COMMANDS
  const commandItems = useMemo(() => {
    return navigation.flatMap(
      (group) => group.items
    );
  }, []);

  // SIDEBAR CONTENT
  const SidebarContent = () => (
    <>
      {/* HEADER */}
      <div className="sidebar-header">
        <div className="flex items-center justify-between gap-3">
          {!collapsed && (
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
                  floating
                "
              >
                <Sparkles size={18} />
              </div>

              <div>
                <h1 className="sidebar-logo gradient-text">
                  ReimburseAI
                </h1>

                <p className="sidebar-subtitle">
                  Expense Intelligence
                </p>
              </div>
            </div>
          )}

          <button
            className="btn-secondary p-2 hidden lg:flex"
            onClick={() =>
              setCollapsed(!collapsed)
            }
          >
            {collapsed ? (
              <PanelLeftOpen size={16} />
            ) : (
              <PanelLeftClose size={16} />
            )}
          </button>

          {/* MOBILE CLOSE */}
          <button
            className="btn-secondary p-2 lg:hidden"
            onClick={() =>
              setMobileOpen(false)
            }
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* NAVIGATION */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        {navigation.map((group) => (
          <div
            key={group.section}
            className="sidebar-section"
          >
            {!collapsed && (
              <div className="sidebar-section-title">
                {group.section}
              </div>
            )}

            <div className="sidebar-nav">
              {group.items.map((item) => {
                const Icon = item.icon;

                const active =
                  location.pathname ===
                  item.href;

                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      navigate(item.href);

                      setMobileOpen(false);
                    }}
                    className={`
                      sidebar-item
                      ${
                        active
                          ? `
                            bg-[rgba(124,99,255,0.14)]
                            border border-[rgba(124,99,255,0.18)]
                            text-white
                          `
                          : `
                            hover:bg-[rgba(255,255,255,0.04)]
                          `
                      }
                    `}
                  >
                    <Icon size={18} />

                    {!collapsed && (
                      <span>{item.label}</span>
                    )}

                    {active && !collapsed && (
                      <div
                        className="
                          ml-auto
                          h-2
                          w-2
                          rounded-full
                          bg-[var(--accent)]
                        "
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="p-4 border-t border-[var(--border)]">
        <div
          className="
            card
            p-3
            flex
            items-center
            gap-3
          "
        >
          <div className="avatar">
            {user?.name?.[0] || "A"}
          </div>

          {!collapsed && (
            <div className="min-w-0">
              <div className="text-sm font-medium truncate">
                {user?.name || "Admin User"}
              </div>

              <div className="text-xs text-[var(--text-muted)] truncate">
                {user?.role || "Enterprise Plan"}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className="app-shell">
        {/* SIDEBAR DESKTOP */}
        <aside
          className={`
            sidebar
            hidden
            lg:flex
            ${collapsed ? "collapsed" : ""}
          `}
        >
          <SidebarContent />
        </aside>

        {/* MOBILE SIDEBAR */}
        {mobileOpen && (
          <div className="modal-overlay lg:hidden z-[120]">
            <aside
              className="
                sidebar
                w-[300px]
                h-full
                animate-fadeUp
              "
            >
              <SidebarContent />
            </aside>
          </div>
        )}

        {/* MAIN */}
        <main
          className={`
            main-content
            ${
              collapsed ? "collapsed" : ""
            }
          `}
        >
          {/* TOPBAR */}
          <header className="topbar">
            {/* LEFT */}
            <div className="flex items-center gap-3">
              {/* MOBILE MENU */}
              <button
                onClick={() =>
                  setMobileOpen(true)
                }
                className="
                  btn-secondary
                  p-2
                  lg:hidden
                "
              >
                <ChevronRight size={16} />
              </button>

              <div>
                <h2 className="font-display text-2xl">
                  {title}
                </h2>

                <p className="text-sm text-[var(--text-muted)] mt-1">
                  Enterprise reimbursement operations
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">
              {/* COMMAND */}
              <button
                onClick={() =>
                  setCommandOpen(true)
                }
                className="
                  hidden
                  md:flex
                  items-center
                  gap-3
                  h-11
                  px-4
                  rounded-2xl
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

                <div
                  className="
                    flex
                    items-center
                    gap-1
                    ml-2
                    text-xs
                    px-2
                    py-1
                    rounded-lg
                    bg-[rgba(255,255,255,0.04)]
                    border border-[var(--border)]
                  "
                >
                  <Command size={12} />

                  K
                </div>
              </button>

              {/* AI */}
              <button className="btn-secondary">
                <Sparkles size={16} />

                <span className="hidden md:block">
                  AI Insights
                </span>
              </button>

              {/* NOTIFICATIONS */}
              <button
                className="
                  relative
                  h-11
                  w-11
                  rounded-2xl
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

              {/* AVATAR */}
              <div className="avatar">
                {user?.name?.[0] || "A"}
              </div>
            </div>
          </header>

          {/* CONTENT */}
          <div className="page-content animate-fadeUp">
            {children}
          </div>
        </main>
      </div>

      {/* COMMAND PALETTE */}
      {commandOpen && (
        <div className="modal-overlay z-[140]">
          <div
            className="
              modal-panel
              w-full
              max-w-2xl
              p-0
              overflow-hidden
            "
          >
            {/* SEARCH */}
            <div
              className="
                flex
                items-center
                gap-3
                px-5
                py-4
                border-b border-[var(--border)]
              "
            >
              <Search
                size={18}
                className="text-[var(--text-muted)]"
              />

              <input
                autoFocus
                type="text"
                placeholder="Search pages, workflows, users..."
                className="
                  bg-transparent
                  outline-none
                  flex-1
                  text-white
                "
              />

              <button
                onClick={() =>
                  setCommandOpen(false)
                }
                className="btn-secondary p-2"
              >
                <X size={14} />
              </button>
            </div>

            {/* RESULTS */}
            <div className="p-3">
              <div className="text-xs text-[var(--text-muted)] px-3 py-2">
                QUICK NAVIGATION
              </div>

              <div className="space-y-1">
                {commandItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.href}
                      onClick={() => {
                        navigate(item.href);

                        setCommandOpen(false);
                      }}
                      className="
                        w-full
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        rounded-2xl
                        hover:bg-[rgba(255,255,255,0.04)]
                        transition-all
                        text-left
                      "
                    >
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
                        <Icon size={16} />
                      </div>

                      <div>
                        <div className="text-white font-medium">
                          {item.label}
                        </div>

                        <div className="text-xs text-[var(--text-muted)]">
                          Navigate to {item.label}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}