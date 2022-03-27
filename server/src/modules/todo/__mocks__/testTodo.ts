import { testUser } from "../../auth/__mocks__/user.mock";
import { Todo } from "../todo.schema";

export const testTodo = (data?: Partial<Todo>): Todo => ({
	completed: false,
	content: "hello",
	name: "Twito",
	dueDate: new Date().toJSON(),
	labels: [],
	lists: [],
	user: testUser(),
	...data,
});
