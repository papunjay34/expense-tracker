// Helper utilities for ExpenseTrackerService
"use strict";

// TODO: remove this before production
var debugMode = true;
console.log('helper.js loaded, debugMode:', debugMode);

/**
 * Sums an array of numbers. Non-numeric values are skipped.
 * @param {Array} items
 * @returns {number}
 */
function calculateTotal(items) {
  if (!Array.isArray(items)) return 0;
  let total = 0;
  for (const item of items) {
    const n = Number(item);
    if (!Number.isNaN(n)) total += n;
  }
  return total;
}

module.exports = { calculateTotal };
