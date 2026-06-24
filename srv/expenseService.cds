using com.expense.tracker as my from '../db/schema';

@requires: 'authenticated-user'
service ExpenseTrackerService @(cds.query.limit: {
    default: 100,
    max    : 1000
}) {

    entit Users             as
        projection on my.User
        excluding {
            passwordHash
        };

    entity Expenses          as projection on my.Expense;

    // New: action to mark a notification as read
    action   markNotificationRead(notificationId: UUID)                   returns Boolean;
    entity Categories        as projection on my.Category;
    entity Budgets           as projection on my.Budget;
    entity Notifications     as projection on my.Notification;
    entity PaymentGateways   as projection on my.PaymentGateway;
    entity RecurringExpenses as projection on my.RecurringExpense;
    entity Goals             as projection on my.Goal;
    entity AI_Insights       as projection on my.AIInsight;

    // Returns total amount spent by a user within a date range
    function getTotalExpenses(userId: UUID, fromDate: Date, toDate: Date) returns Decimal(10, 2);

    // Returns budget utilisation percentage (0–100) for a user and category
    function getBudgetUtilisation(userId: UUID, categoryId: UUID)         returns Decimal(5, 2);

}
