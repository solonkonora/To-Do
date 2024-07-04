const Priority = {
  High: "High",
  Medium: "Medium",
  Low: "Low",
} as const;

const Status = {
  "In Progress": "In Progress",
  Completed: "Completed",
  Blocked: "Blocked",
} as const;

interface Todo {
  id: string;
  userId: string;
  todo: string;
  priority: keyof typeof Priority;
  status: keyof typeof Status;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export { Priority, Status };

export type { Todo };
