import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { testUser } from "../../auth/__mocks__/user.mock";
import { UserDocument } from "../../user/user.schema";
import { ChangeDueDateDTO } from "../dto/change-date.dto";
import { CreateTodoDTO } from "../dto/create-todo.dto";
import { LabelDTO } from "../dto/label.dto";
import { ListDTO } from "../dto/list.dto";
import { SetStatusDTO } from "../dto/set-status.dto";
import { TodoController } from "../todo.controller";
import { Todo } from "../todo.schema";
import { TodoService } from "../todo.service";
import { testTodo } from "../__mocks__/testTodo";

const todoModel = jest.fn(() => ({
	findOne: jest.fn(() => testTodo()),
	find: jest.fn(() => [testTodo()]),
	findById: jest.fn(() => testTodo()),
	deleteOne: jest.fn(),
	populate: jest.fn(() => testTodo()),
}));

describe("TodoController", () => {
	let controller: TodoController;
	let service: TodoService;

	beforeEach(async () => {
		jest.clearAllMocks();

		const module: TestingModule = await Test.createTestingModule({
			controllers: [TodoController],
			providers: [
				{
					provide: getModelToken(Todo.name),
					useValue: todoModel,
				},
				{
					provide: TodoService,
					useFactory: jest.fn(() => ({
						create: jest.fn((todo: Partial<Todo>) => testTodo(todo)),
						findAll: jest.fn(() => [testTodo(), testTodo()]),
						findOne: jest.fn(() => testTodo()),
						delete: jest.fn(),
						addLabels: jest.fn((_: any, data: LabelDTO) => ({ labels: data.labels })),
						addLists: jest.fn((_: any, data: ListDTO) => ({ labels: data.lists })),
						removeLabels: jest.fn((_: any, data: ListDTO) => ({ lists: Array.from(new Set(data.lists)) })),
						removeLists: jest.fn((_: any, data: ListDTO) => ({ lists: Array.from(new Set(data.lists)) })),
						changeDueDate: jest.fn((_: any, data: ChangeDueDateDTO) => ({ dueDate: data.date })),
						setTodoStatus: jest.fn((_: any, data: SetStatusDTO) => ({ completed: false })),
					})),
				},
			],
		}).compile();

		controller = module.get<TodoController>(TodoController);
		service = module.get<TodoService>(TodoService);
	});

	it("Should be defined", () => {
		expect(controller).toBeDefined();
	});

	it("Should create a todo", async () => {
		const data: CreateTodoDTO = testTodo();
		const res = await controller.create(data, testUser() as UserDocument);

		expect(service.create).toBeCalled();
		expect(res.todo).toBeDefined();
		expect(res.todo.name).toBe(data.name);
	});

	it("Should find all Todos", async () => {
		const res = await controller.all(testUser() as UserDocument);

		expect(service.findAll).toBeCalled();
		expect(res.todos).toBeDefined();
	});

	it("Should find one Todo", async () => {
		const res = await controller.findOne(testUser() as UserDocument, "123456");

		expect(service.findOne).toBeCalled();
		expect(res.todo).toBeDefined();
	});

	it("Should delete a Todo", async () => {
		const res = await controller.deleteOne(testUser() as UserDocument, "123456");
		expect(service.delete).toBeCalled();
	});

	it("Should add a Label", async () => {
		const data: LabelDTO = { id: "123456", labels: ["working"] };
		const res = await controller.addLabels(testUser() as UserDocument, data);

		expect(service.addLabels).toBeCalled();
		expect(res.todo).toBeDefined();
		expect(res.todo.labels).toMatchObject(["working"]);
	});

	it("Should add a List", async () => {
		const data: ListDTO = { id: "123456", lists: ["home"] };
		const res = await controller.addLists(testUser() as UserDocument, data);

		expect(service.addLists).toBeCalled();
		expect(res.todo).toBeDefined();
		expect(res.todo.lists).toMatchObject(["home"]);
	});

	it("Should add then remove a Label", async () => {
		const data: LabelDTO = { id: "123456", labels: ["working"] };
		const res = await controller.addLabels(testUser() as UserDocument, data);

		expect(service.addLabels).toBeCalled();
		expect(res.todo).toBeDefined();
		expect(res.todo.labels).toMatchObject(["working"]);

		const secondRes = await controller.removeLabels(testUser() as UserDocument, data);

		expect(service.removeLabels).toBeCalled();
		expect(secondRes.todo).toBeDefined();
		expect(secondRes.todo.labels).toMatchObject([]);
	});

	it("Should add then remove a list", async () => {
		const data: ListDTO = { id: "123456", lists: ["home"] };
		const res = await controller.addLists(testUser() as UserDocument, data);

		expect(service.addLists).toBeCalled();
		expect(res.todo).toBeDefined();
		expect(res.todo.lists).toMatchObject(["home"]);

		const secondRes = await controller.removeLists(testUser() as UserDocument, data);

		expect(service.removeLists).toBeCalled();
		expect(secondRes.todo).toBeDefined();
		expect(secondRes.todo.lists).toMatchObject([]);
	});

	it("Should change the due date", async () => {
		const date = new Date().toJSON();

		const data: ChangeDueDateDTO = { id: "123456", date };
		const res = await controller.changeDueDate(testUser() as UserDocument, data);

		expect(service.changeDueDate).toBeCalled();
		expect(res.todo).toBeDefined();
		expect(res.todo.dueDate).toMatchObject(date);
	});

	it("Should set a todo status to true", async () => {
		const data: SetStatusDTO = { id: "123456", status: true };
		const res = await controller.setTodoStatus(testUser() as UserDocument, data);

		expect(service.setTodoStatus).toBeCalled();
		expect(res.todo).toBeDefined();
		expect(res.todo.completed).toBe(true);
	});
});
