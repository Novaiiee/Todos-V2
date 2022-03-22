import { sign } from "jsonwebtoken";
import { testTodo } from "./testTodo";

export const TodoService = jest.fn().mockReturnValue({
  create: jest.fn().mockReturnValue(testTodo())
});
