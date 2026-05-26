import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

// AUTH
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

// DASHBOARDS
import EmployeeDashboard from "./pages/dashboard/EmployeeDashboard";
import ManagerDashboard from "./pages/dashboard/ManagerDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";

// FEATURES
import Approvals from "./pages/approvals/Approvals";
import SubmitExpense from "./pages/expenses/SubmitExpense";
import Expenses from "./pages/expenses/Expenses";

// SETTINGS
import Rules from "./pages/settings/Rules";
import Users from "./pages/settings/Users";

// PAGE TRANSITION
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: -10,
        }}
        transition={{
          duration: 0.22,
          ease: "easeOut",
        }}
      >
        <Routes location={location}>
          {/* AUTH */}
          <Route
            path="/"
            element={<Login />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />

          {/* DASHBOARDS */}
          <Route
            path="/employee"
            element={<EmployeeDashboard />}
          />

          <Route
            path="/manager"
            element={<ManagerDashboard />}
          />

          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

          {/* FEATURES */}
          <Route
            path="/approvals"
            element={<Approvals />}
          />

          <Route
            path="/submit"
            element={<SubmitExpense />}
          />

          <Route
            path="/expenses"
            element={<Expenses />}
          />

          {/* SETTINGS */}
          <Route
            path="/settings/users"
            element={<Users />}
          />

          <Route
            path="/settings/rules"
            element={<Rules />}
          />

          {/* REPORTS */}
          <Route
            path="/reports"
            element={
              <div className="p-6 text-white">
                Reports Page
              </div>
            }
          />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <div className="grid-background">
      <Router>
        <AnimatedRoutes />
      </Router>
    </div>
  );
}

export default App;