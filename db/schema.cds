namespace com.expense.tracker;
using { cuid } from '@sap/cds/common';
// User Entity
entity User : cuid {
    name:String;
    email:String;
    passwordHash:String;
}

// Category Entity
entity Category :cuid{
    categoryName:String;
}

// Expense Entity
entity Expense:cuid{
    description:String;
    amount:Decimal(10,2);
    date:Date;
    category:Association to Category; // One expense belongs to one category
    user:Association to User;
    paymentMethod:Association to PaymentGateway;
}

// Budget Entity
entity Budget : cuid {
    amount:Decimal(10,2);
    startDate:Date;
    endDate:Date;
    user:Association to User;
    category:Association to Category;
}

// Notification Entity 
entity Notification:cuid{
    message:String;
    timeStamp:DateTime;
    status:String;
    user:Association to User;
}

// Payment Gateway 
entity PaymentGateway:cuid{
    methodName:String;
    details:String;
    user:Association to User;
}

// Recurring Expense
entity RecurringExpense:cuid{
    description:String;
    amount:Decimal(10,2);
    frequency:String;
    startDate:Date;
    endDate:Date;
    user:Association to User;
}

// Goal Entity 

entity Goal : cuid{
    goalName:String;
    targetAmount:Decimal(10,2);
    currentAmount:Decimal(10,2);
    deadline:Date;
    user:Association to User;
}

// AI insight
entity AIInsight : cuid{
    insightType:String;
    generatedDate:DateTime;
    expense:Association to Expense;
}