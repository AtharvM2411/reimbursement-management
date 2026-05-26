const express = require("express");
const userRoutes = require("../modules/users/user.routes");
const expenseRoutes = require("../modules/expenses/expense.routes");
const authRoutes = require("../modules/auth/auth.routes");
const approvalRoutes = require("../modules/approvals/approval.routes");
const router = express.Router();
const ruleRoutes = require("../modules/rules/rule.routes");
router.get("/test", (req, res) => {
  res.json({ message: "API working " });
});
router.use("/expenses", expenseRoutes);
router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/approvals", approvalRoutes);
router.use("/rules", ruleRoutes);
module.exports = router;
