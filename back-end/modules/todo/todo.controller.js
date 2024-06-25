import { TodoService } from "./todo.service.js"

const createTodo = async (req, res) => {
  try {
    const newTodo = {
      userId: req.body.userId,
      todo: req.body.todo,
      priority: req.body.priority || TodoService.priorities.Medium,
      status: req.body.status || TodoService.status.In_Progress,
    };

    const _newTodo = await TodoService.createTodo(newTodo);

    return res.status(200).json({
      message: "Todo Created",
      data: _newTodo,
    });
  } catch (error) {
    return res.status(error?.status || 500).json({
      message: error?.message || "Something Happened",
      data: null,
    })
  }
}

const getOneTodo = (req, res) => {
  //
}

const getTodos = (req, res) => {
  return res.status(200).json("getting all todos")
}

export {
  createTodo,
  getOneTodo,
  getTodos,
}
