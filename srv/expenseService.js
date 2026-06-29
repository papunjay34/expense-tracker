"use strict";

const cds = require("@sap/cds");

module.exports = cds.service.impl(async function () {
  const { Expense, Budget } = this.entities;

  // ── Input Validation: Users ───────────────────────────────────────────────
  this.before(["CREATE", "UPDATE"], "Users", (req) => {
    const { name, email } = req.data;
    if (name !== undefined && !name?.trim())
      return req.error(400, "Name must not be empty");
    if (email !== undefined) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return req.error(400, "A valid email address is required");
    }
  });

  // ── Input Validation: Expenses ────────────────────────────────────────────
  this.before("CREATE", "Expenses", (req) => {
    const { amount, date, description } = req.data;
    if (!description?.trim())
      return req.error(400, "Expense description is required");
    if (amount == null || Number(amount) <= 0)
      return req.error(400, "Expense amount must be greater than zero");
    if (!date) return req.error(400, "Expense date is required");
  });

  // ── Input Validation: Budgets ─────────────────────────────────────────────
  this.before("CREATE", "Budgets", (req) => {
    const { amount, startDate, endDate } = req.data;
    if (amount == null || Number(amount) <= 0)
      return req.error(400, "Budget amount must be greater than zero");
    if (!startDate) return req.error(400, "Budget start date is required");
    if (!endDate) return req.error(400, "Budget end date is required");
    if (new Date(startDate) >= new Date(endDate))
      return req.error(400, "Budget end date must be after start date");
  });

  // ── Input Validation: Goals ───────────────────────────────────────────────
  this.before("CREATE", "Goals", (req) => {
    const { targetAmount, goalName } = req.data;
    if (!goalName?.trim()) return req.error(400, "Goal name is required");
    if (targetAmount == null || Number(targetAmount) <= 0)
      return req.error(400, "Target amount must be greater than zero");
  });

  // ── Function: getTotalExpenses ────────────────────────────────────────────
  // Returns total amount spent by a user between two dates
  this.on("getTotalExpenses", async (req) => {
    const { userId, fromDate, toDate } = req.data;

    if (!userId) return req.error(400, "userId is required");
    if (!fromDate || !toDate)
      return req.error(400, "Both fromDate and toDate are required");
    if (new Date(fromDate) > new Date(toDate))
      return req.error(400, "fromDate must not be after toDate");

    const result = await SELECT.one.from(Expense).columns`sum(amount) as total`
      .where`user_ID = ${userId} AND date >= ${fromDate} AND date <= ${toDate}`;

    return Number(result?.total ?? 0);
  });

  // ── Function: getBudgetUtilisation ────────────────────────────────────────
  // Just adding comment pk
  // Returns how much of the budget has been spent (as a percentage 0–100)
  this.on("getBudgetUtilisation", async (req) => {
    const { userId, categoryId } = req.data;

    if (!userId) return req.error(400, "userId is required");
    if (!categoryId) return req.error(400, "categoryId is required");

    // Get the most recent budget for this user + category
    const budget = await SELECT.one
      .from(Budget)
      .where({ user_ID: userId, category_ID: categoryId })
      .orderBy`startDate desc`;

    if (!budget)
      return req.error(404, "No budget found for this user and category");

    // Sum expenses within the budget period
    const spent = await SELECT.one.from(Expense).columns`sum(amount) as total`
      .where`user_ID = ${userId} AND category_ID = ${categoryId} AND date >= ${budget.startDate} AND date <= ${budget.endDate}`;

    const spentAmount = Number(spent?.total ?? 0);
    const utilisation =
      budget.amount > 0
        ? Math.min((spentAmount / budget.amount) * 100, 999.99)
        : 0;

    return parseFloat(utilisation.toFixed(2));
  });
});
