import { testUser } from "../../auth/__mocks__/user.mock";
import { Todo } from "../todo.schema";

export const testTodo = (): Todo => ({
	completed: false,
	content: "hello",
	name: "hello",
	dueDate: new Date().toJSON(),
	labels: [],
	lists: [],
	user: testUser(),
});
