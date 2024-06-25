import TodoSchema from "../../db/schemas/todo.js"
import SchemaTransformer from "../../utils/schema-transformer.js";

export const TodoService = {
  priorities: {
    High: "High",
    Medium: "Medium",
    Low: "Low",
  },

  status: {
    To_Do: "To Do",
    In_Progress: "In Progress",
    Completed: "Completed",
    Blocked: "Blocked",
  },

  getUserTodos(userId, todoQuery = {}) {
    let _query = { userId };

    if (todoQuery) _query = { userId, ...todoQuery };

    return TodoSchema.find(_query)
      .then(SchemaTransformer);
  },

  getById(id) {
    return TodoSchema.findById(id)
      .then(SchemaTransformer);
  },

  createTodo(data) {
    return TodoSchema.create({ ...data })
      .then(SchemaTransformer);
  },
}
