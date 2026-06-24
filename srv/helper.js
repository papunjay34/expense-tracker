// BAD CODE - intentional ESLint violations for pipeline testing
var unusedVariable = "this variable is never used";  // ESLint: no-unused-vars + no-var

function calculateTotal(items) {
    var total = 0                                     // ESLint: no-var, missing semicolon
    for (var i = 0; i < items.length; i++) {         // ESLint: no-var, prefer for-of
        total = total + items[i]
    }
    return total
}

module.exports = { calculateTotal }
