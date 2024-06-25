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
        { todo: { $regex: new RegExp(queries.todo, 'gi') } },
        { 'priority.enum': { $regex: new RegExp("(High)|(Medium)|(Low)"), } },
      ],
    */

    const searchQuery = { $or: [] };

    if (queryParams.todo) {
      searchQuery.$or.push({ todo: { $regex: new RegExp(queryParams.todo, 'gi') } });
    };

    if (queryParams.priority) {
      searchQuery.$or.push({ 'priority.enum': { $regex: new RegExp("(High)|(Medium)|(Low)"), } });
    };

    if (queryParams.status) {
      searchQuery.$or.push({ 'status.enum': { $regex: new RegExp("(To Do)|(In Progress)|(Completed)|(Blocked)"), } });
    }

    const todos = await TodoService.queryUserTodos(req.user.id, {});

    // console.log(queries);

    return res.status(200).json({
      message: "Todos Retrieved",
      data: todos,
    });
  } catch (error) {
    return res.status(error?.status || 500).json({
      message: error?.message || "Something Happened",
      data: null,
    });
  }
}

export {
  createTodo,
  getOneTodo,
  getTodos,
}
