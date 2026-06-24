// Helper utilities for ExpenseTrackerService
'use strict';

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
