import { useEffect, useMemo, useState } from "react";

import {
  Users as UsersIcon,
  Search,
  Filter,
  Trash2,
  Pencil,
  Shield,
  Briefcase,
  User,
  Mail,
  Eye,
  UserPlus,
  Building2,
} from "lucide-react";

import AppShell from "../../layouts/AppShell";

import {
  getUsers,
  deleteUser,
} from "../../services/userService";

export default function Users() {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [roleFilter, setRoleFilter] =
    useState("ALL");

  const [selectedUser, setSelectedUser] =
    useState(null);

  // FETCH USERS
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const data = await getUsers();

      setUsers(data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // DELETE
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);

      fetchUsers();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // FILTERED USERS
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        user.email
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesRole =
        roleFilter === "ALL"
          ? true
          : user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  // STATS
  const stats = useMemo(() => {
    return {
      total: users.length,

      admins: users.filter(
        (u) => u.role === "ADMIN"
      ).length,

      managers: users.filter(
        (u) => u.role === "MANAGER"
      ).length,

      employees: users.filter(
        (u) => u.role === "EMPLOYEE"
      ).length,
    };
  }, [users]);

  // ROLE BADGE
  const getRoleBadge = (role) => {
    if (role === "ADMIN")
      return "badge badge-rejected";

    if (role === "MANAGER")
      return "badge badge-pending";

    return "badge badge-approved";
  };

  // ROLE ICON
  const getRoleIcon = (role) => {
    if (role === "ADMIN")
      return <Shield size={16} />;

    if (role === "MANAGER")
      return <Briefcase size={16} />;

    return <User size={16} />;
  };

  return (
    <AppShell title="Organization Management">
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
            <Building2 size={22} />
          </div>

          <div>
            <h1 className="text-4xl font-display gradient-text">
              Organization Console
            </h1>

            <p className="text-[var(--text-secondary)] mt-1">
              Manage employees, managers, and administrative roles
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
                Total Users
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
              <UsersIcon size={20} />
            </div>
          </div>
        </div>

        {/* ADMINS */}
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="stat-title">
                Admins
              </div>

              <div className="stat-value">
                {stats.admins}
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
              <Shield size={20} />
            </div>
          </div>
        </div>

        {/* MANAGERS */}
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="stat-title">
                Managers
              </div>

              <div className="stat-value">
                {stats.managers}
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
              <Briefcase size={20} />
            </div>
          </div>
        </div>

        {/* EMPLOYEES */}
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="stat-title">
                Employees
              </div>

              <div className="stat-value">
                {stats.employees}
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
              <User size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="card p-5 mb-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-display text-xl">
              User Filters
            </h3>

            <p className="text-sm text-[var(--text-muted)] mt-1">
              Search and filter organization members
            </p>
          </div>

          <button className="btn-primary">
            <UserPlus size={16} />
            Invite User
          </button>
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
              placeholder="Search users..."
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

          {/* ROLE FILTER */}
          <div className="relative">
            <Filter
              size={16}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-[var(--text-muted)]
              "
            />

            <select
              value={roleFilter}
              onChange={(e) =>
                setRoleFilter(e.target.value)
              }
              className="
                input-field
                pl-10
              "
            >
              <option value="ALL">
                All Roles
              </option>

              <option value="ADMIN">
                Admin
              </option>

              <option value="MANAGER">
                Manager
              </option>

              <option value="EMPLOYEE">
                Employee
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* USERS TABLE */}
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
              Team Directory
            </h3>

            <p className="text-sm text-[var(--text-muted)] mt-1">
              Organization members and role management
            </p>
          </div>

          <button className="btn-secondary">
            Export Directory
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
        ) : filteredUsers.length === 0 ? (
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
              <UsersIcon size={32} />
            </div>

            <h3 className="text-2xl font-display mb-2">
              No Users Found
            </h3>

            <p className="text-[var(--text-muted)]">
              No organization members available.
            </p>
          </div>
        ) : (
          /* TABLE */
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    {/* USER */}
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          {user.name?.[0]}
                        </div>

                        <div>
                          <div className="text-white font-medium">
                            {user.name}
                          </div>

                          <div className="text-xs text-[var(--text-muted)]">
                            Organization Member
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* EMAIL */}
                    <td>
                      <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                        <Mail size={14} />

                        {user.email}
                      </div>
                    </td>

                    {/* ROLE */}
                    <td>
                      <span
                        className={getRoleBadge(
                          user.role
                        )}
                      >
                        <span className="flex items-center gap-2">
                          {getRoleIcon(user.role)}

                          {user.role}
                        </span>
                      </span>
                    </td>

                    {/* DEPARTMENT */}
                    <td>
                      <div className="text-[var(--text-secondary)]">
                        Finance Operations
                      </div>
                    </td>

                    {/* ACTIONS */}
                    <td>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            setSelectedUser(user)
                          }
                          className="btn-secondary"
                        >
                          <Eye size={15} />
                        </button>

                        <button className="btn-secondary">
                          <Pencil size={15} />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(user.id)
                          }
                          className="btn-secondary"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* USER DRAWER */}
      {selectedUser && (
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
              <div className="flex items-center gap-4">
                <div className="avatar text-lg">
                  {selectedUser.name?.[0]}
                </div>

                <div>
                  <h2 className="font-display text-3xl">
                    {selectedUser.name}
                  </h2>

                  <p className="text-[var(--text-muted)] mt-1">
                    Organization profile overview
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  setSelectedUser(null)
                }
                className="btn-secondary"
              >
                Close
              </button>
            </div>

            {/* DETAILS */}
            <div className="space-y-5">
              {/* EMAIL */}
              <div className="card p-5">
                <div className="text-xs text-[var(--text-muted)] mb-2">
                  Email Address
                </div>

                <div className="text-white font-medium">
                  {selectedUser.email}
                </div>
              </div>

              {/* ROLE + DEPARTMENT */}
              <div className="grid grid-cols-2 gap-5">
                <div className="card p-5">
                  <div className="text-xs text-[var(--text-muted)] mb-2">
                    Role
                  </div>

                  <span
                    className={getRoleBadge(
                      selectedUser.role
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {getRoleIcon(
                        selectedUser.role
                      )}

                      {selectedUser.role}
                    </span>
                  </span>
                </div>

                <div className="card p-5">
                  <div className="text-xs text-[var(--text-muted)] mb-2">
                    Department
                  </div>

                  <div className="text-white font-medium">
                    Finance Operations
                  </div>
                </div>
              </div>

              {/* ACTIVITY */}
              <div className="card p-5">
                <div className="mb-5">
                  <h3 className="font-display text-xl">
                    User Activity
                  </h3>

                  <p className="text-sm text-[var(--text-muted)] mt-1">
                    Workflow and reimbursement participation
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
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
                        Active Workflow Member
                      </div>

                      <div className="text-sm text-[var(--text-muted)]">
                        Participating in reimbursement operations
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
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
                      <UsersIcon size={18} />
                    </div>

                    <div>
                      <div className="text-white font-medium">
                        Team Collaboration
                      </div>

                      <div className="text-sm text-[var(--text-muted)]">
                        Organization access enabled
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-4 pt-2">
                <button className="btn-primary">
                  Edit User
                </button>

                <button
                  onClick={() =>
                    handleDelete(
                      selectedUser.id
                    )
                  }
                  className="btn-secondary"
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}