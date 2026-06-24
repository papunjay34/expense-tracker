// Helper utilities for ExpenseTrackerService
'use strict';

function calculateTotal(items) {
    let total = 0;
    for (const item of items) {
        total += item;
    }
    return total;
}

module.exports = { calculateTotal };
