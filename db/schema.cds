namespace com.expense.tracker;

using {cuid} from '@sap/cds/common';

// User Entity
entity User : cuid {
    name         : String(100)  @mandatory;
    email        : String(255)  @mandatory  @assert.unique;
    passwordHash : String(255);
}

// Category Entity
entity Category : cuid {
    categoryName : String(100) @mandatory;
}

// Expense Entity
entity Expense : cuid {
    description   : String(500)    @mandatory;
    amount        : Decimal(10, 2) @mandatory;
    date          : Date           @mandatory;
    category      : Association to Category;
    user          : Association to User;
    paymentMethod : Association to PaymentGateway;
}

// Budget Entity
entity Budget : cuid {
    amount    : Decimal(10, 2) @mandatory;
    startDate : Date           @mandatory;
    endDate   : Date           @mandatory;
    user      : Association to User;
    category  : Association to Category;
}

// Notification Entity
entity Notification : cuid {
    message   : String(1000) @mandatory;
    timeStamp : DateTime;
    status    : String(50) default 'UNREAD';
    user      : Association to User;
}

// Payment Gateway
entity PaymentGateway : cuid {
    methodName : String(100) @mandatory;
    details    : String(500);
    user       : Association to User;
}

// Recurring Expense
entity RecurringExpense : cuid {
    description : String(500)    @mandatory;
    amount      : Decimal(10, 2) @mandatory;
    frequency   : String(50)     @mandatory; // DAILY, WEEKLY, MONTHLY, YEARLY
    startDate   : Date           @mandatory;
    endDate     : Date;
    user        : Association to User;
}

// Goal Entity
entity Goal : cuid {
    goalName      : String(200)    @mandatory;
    targetAmount  : Decimal(10, 2) @mandatory;
    currentAmount : Decimal(10, 2) default 0;
    deadline      : Date;
    user          : Association to User;
}

// AI Insight Entity
entity AIInsight : cuid {
    insightType   : String(100) @mandatory;
    generatedDate : DateTime;
    expense       : Association to Expense;
    user          : Association to User; // direct link for efficient per-user queries
}
