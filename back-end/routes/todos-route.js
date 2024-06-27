import { Router } from "express";
import {
  createTodo,
  deleteOneTodo,
  editTodo,
  getOneTodo,
  getTodos
} from "../modules/todo/todo.controller.js";
import { userInjector } from "../middlewares/user-injector.js";

const router = Router();

router.get("/", userInjector, getTodos);

router.post("/", userInjector, createTodo);

router.put("/:todoId", userInjector, editTodo);

router.get("/:todoId", userInjector, getOneTodo);

router.delete("/:todoId", userInjector, deleteOneTodo);


export default router;
