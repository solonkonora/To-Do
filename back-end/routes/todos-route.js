import { Router } from "express";
import { createTodo, getOneTodo, getTodos } from "../modules/todo/todo.controller.js";

const router = Router();

router.get("/", getTodos);

router.post("/", createTodo);

router.get("/:todoId", getOneTodo);

export default router;
