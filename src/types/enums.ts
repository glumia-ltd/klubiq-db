export enum TransactionType {
    REVENUE = 'Revenue',
    EXPENSE = 'Expense',
}

export enum PaymentFrequency {
    WEEKLY = 'Weekly',
    BI_WEEKLY = 'Bi-Weekly',
    MONTHLY = 'Monthly',
    ANNUALLY = 'Annually',
    CUSTOM = 'Custom',
}

export enum MaintenanceStatus {
    NEW = 'New',
    IN_PROGRESS = 'In Progress',
    COMPLETED = 'Completed',
    ON_HOLD = 'On Hold',
}

export enum MaintenancePriority {
    LOW = 'Low',
    MEDIUM = 'Medium',
    HIGH = 'High',
    URGENT = 'Urgent',
}

export enum MaintenanceType {
    MAINTENANCE = 'Maintenance',
    SERVICE = 'Service',
    INSPECTION = 'Inspection',
    OTHER = 'Other',
}