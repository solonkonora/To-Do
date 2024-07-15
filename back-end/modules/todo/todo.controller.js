import TodoSchema from "../../db/schemas/todo.js";
import { TodoService } from "./todo.service.js"

const createTodo = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({
      message: "You must be logged before creating this todo",
      data: null,
    });

    const newTodo = {
      userId: req.body.userId,
      todo: req.body.todo,
      priority: req.body.priority || TodoService.priorities.Medium,
      status: req.body.status || TodoService.status.In_Progress,
    };

    const prevTodo = await TodoService.queryUserTodo(newTodo.userId, { todo: newTodo.todo });

    if (prevTodo) return res.status(201).json({
      message: "Todo Already Exists",
      data: prevTodo,
    });

    const _newTodo = await TodoService.createTodo(newTodo);

    return res.status(200).json({
      message: "Todo Created",
      data: _newTodo,
    });
  } catch (error) {
    return res.status(error?.status || 500).json({
      message: error?.message || "Something Happened",
      data: null,
    });
  }
}

const editTodo = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({
      message: "You must be logged before editing this todo",
      data: null,
    });

    const todoId = req.params.todoId || "";

    const prevTodo = await TodoService.queryUserTodo(req.user.id, { _id: todoId });

    if (!prevTodo) return res.status(402).json({
      message: "Todo does not exist",
      data: null,
    });

    const update = {};

    const allowedKeys = Object.keys(prevTodo)
      .filter((key) => ["todo", "priority", "status"].includes(key)) // filtering in only keys that should be updated.

    allowedKeys.forEach(key => {
      if (req.body[key]) {
        update[key] = req.body[key];
      }
    });

    if (!Object.keys(update).length) return res.status(401).json({
      message: "No matching keys found to use as updates",
      data: null,
    });

    return res.status(200).json({
      message: "Todo Updated",
      data: (await TodoService.updateTodo(todoId, update)),
    });
  } catch (error) {
    return res.status(error?.status || 500).json({
      message: error?.message || "Something Happened",
      data: null,
    });
  }
}

const getOneTodo = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({
      message: "You must be logged before accessing this todo",
      data: null,
    });

    const todoId = req.params.todoId;

    const user = req.user;

    const todo = await TodoService.queryUserTodo(user.id, { _id: todoId });

    return res.status(200).json({
      message: "Todo Retrieved",
      data: todo,
    });
  } catch (error) {
    return res.status(error?.status || 500).json({
      message: error?.message || "Something Happened",
      data: null,
    });
  }
}

const getTodos = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({
      message: "You must be logged before accessing todos",
      data: null,
    });

    const queryParams = req.query || {};

    /* 
      search query should be like
      $or: [
        { todo: queries.todo },
        { priority: queries.priority },
      ],
    */

    const searchQuery = { $or: [] };

    if (queryParams.todo) {
      searchQuery.$or.push({ todo: { $regex: new RegExp(queryParams.todo, "gi") } });
    };

    if (["High", "Medium", "Low"].includes(queryParams.priority)) {
      searchQuery.$or.push({ priority: queryParams.priority });
    };

    if (["In Progress", "Completed", "Blocked"].includes(queryParams.status)) {
      searchQuery.$or.push({ status: queryParams.status });
    }

    if (!searchQuery.$or.length) {
      // meaning no matching query was added.
      // deleting because $and/$or/$nor must be a nonempty array
      delete searchQuery.$or;
    }

    const todos = await TodoService.queryUserTodos(req.user.id, searchQuery);

    return res.status(200).json({
      message: "Todos Retrieved",
      data: todos,
    });
  } catch (error) {
    return res.status(error?.status || 500).json({
      message: error?.message || "Something Went Wrong",
      data: null,
    });
  }
};

const deleteOneTodo = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({
      message: "You must be logged before deleting this todo",
      data: null,
    });

    const todoId = req.params.todoId;

    await TodoService.deletedTodo(todoId);

    return res.status(200).json({
      message: "Todo Deleted Successfully",
      data: null,
    });
  } catch (error) {
    return res.status(error?.status || 500).json({
      message: error?.message || "Something Happened",
      data: null,
    });
  }
};

export {
  createTodo,
  editTodo,
  getOneTodo,
  getTodos,
  deleteOneTodo,
}
