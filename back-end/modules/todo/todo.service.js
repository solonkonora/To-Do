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

  createTodo(data) {
    return TodoSchema.create({ ...data })
      .then(SchemaTransformer);
  },

  getById(id) {
    return TodoSchema.findById(id)
      .then(SchemaTransformer);
  },

  queryUserTodo(userId, todoQuery = {}) {
    let _query = { userId };

    if (todoQuery) _query = { userId, ...todoQuery };

    return TodoSchema.findOne(_query)
      .then(SchemaTransformer);
  },

  queryUserTodos(userId, todoQuery = {}) {
    let _query = { userId };

    if (todoQuery) _query = { userId, ...todoQuery };

    return TodoSchema.find(_query)
      .then(SchemaTransformer);
  },
}
