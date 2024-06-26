enum Priority {
    High = "High",
    Medium = "Medium",
    Low = "Low"
}

enum Status {
    "In Progress" = "In Progress",
    Completed = "Completed",
    Blocked = "Blocked"
}

interface Todo {
    id: string;
    userId: string,
    todo: string,
    priority: keyof typeof Priority,
    status: keyof typeof Status,
    notes: string
    dateCreated: Date,
    dateUpdated: Date
}

export {
    Priority,
    Status,
}

export type {
    Todo,
}