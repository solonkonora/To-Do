import HTTPCLIENT from "@/lib/http-client";
import { Todo } from "./type";

const httpClient = new HTTPCLIENT("/todos");

/**
 * User must be logged in to access todos
*/
const getUserTodos = () => {
  return httpClient.GET<Todo[]>();
};

/**
 * User must be logged in to access todos
*/
const getSingleTodo = (todoId: string) => {
  return httpClient.GET(`/${todoId}`);
}

export {
  getUserTodos,
  getSingleTodo,
}
