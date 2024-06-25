export interface TodoType {
    userId: string,
    todo: string,
    priority: "High" | "Medium" | "Low",
    status: "To Do" | "In Progress" | "Completed" | "Blocked",
    notes: string
    dateCreated: Date,
    dateUpdated: Date
}

enum Priority {
    High = "High",
    Medium = "Medium",
    Low = "Low"
}

enum Status {
    To_Do = "To Do",
    In_Progress = "In Progress",
    Completed = "Completed",
    Blocked = "Blocked"
}
