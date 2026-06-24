using com.expense.tracker as my from '../db/schema';

service ExpenseTrackerService {

    entity Users             as projection on my.User excluding { passwordHash };
    entity Expenses          as projection on my.Expense;
    entity Categories        as projection on my.Category;
    entity Budgets           as projection on my.Budget;
    entity Notifications     as projection on my.Notification;
    entity PaymentGateways   as projection on my.PaymentGateway;
    entity RecurringExpenses as projection on my.RecurringExpense;
    entity Goals             as projection on my.Goal;
    entity AI_Insights       as projection on my.AIInsight;

    // Action: Get total expenses for a user within a date range
    function getTotalExpenses(userId: UUID, fromDate: Date, toDate: Date) returns Decimal(10,2);

    // Action: Get budget utilisation percentage for a user
    function getBudgetUtilisation(userId: UUID, categoryId: UUID) returns Decimal(5,2);

}
