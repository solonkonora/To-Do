import { Router } from "express";
import { createTodo, getOneTodo, getTodos } from "../modules/todo/todo.controller.js";
import { userInjector } from "../middlewares/user-injector.js";

const router = Router();

router.get("/", userInjector, getTodos);

router.post("/", userInjector, createTodo);

router.get("/:todoId", userInjector, getOneTodo);

export default router;
