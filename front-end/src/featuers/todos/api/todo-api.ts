import HTTPCLIENT from "@/lib/http-client";
import { Todo } from "./type";

const httpClient = new HTTPCLIENT("/todos");

/**
 * User must be logged in to access todos
 * @argument query_str? either "todo", "priority" or "status".
 * the query_srt should be used for implementing searching
 */
const getUserTodos = (query_str = "") => {
  return httpClient.GET<Todo[]>(`/?${query_str}`);
};

/**
 * User must be logged in to access todos
 */
const getSingleTodo = (todoId: string) => {
  return httpClient.GET<Todo>(`/${todoId}`);
};

const deleteTodo = (todoId: string) => {
  return httpClient.DELETE(`/${todoId}`);
};

// TODO MUTATIONS

const createTodo = (todo: Partial<Todo>) => {
  return httpClient.POST<Todo>("/", todo);
};

const editTodo = (todoId: string, update: Partial<Todo>) => {
  return httpClient.PUT<Todo>(`/${todoId}`, update);
};

export {
  getUserTodos,
  getSingleTodo,
  deleteTodo,

  // TODO MUTATIONS
  createTodo,
  editTodo,
};
