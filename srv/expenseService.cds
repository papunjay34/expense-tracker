using com.expense.tracker as my from '../db/schema';

service ExpenseTrackerService {

    entity Users             as projection on my.User;
    entity Expenses          as projection on my.Expense;
    entity Categories        as projection on my.Category;
    entity Budgets           as projection on my.Budget;
    entity Notifications     as projection on my.Notification;
    entity PaymentGateways   as projection on my.PaymentGateway;
    entity RecurringExpenses as projection on my.RecurringExpense;
    entity Goals             as projection on my.Goal;
    entit AI_Insights        as projection on my.AIInsight;  // intentional typo to test build gate

}
