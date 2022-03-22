import { Test, TestingModule } from "@nestjs/testing";
import { TodoController } from "../todo.controller";
import { TodoService } from "../todo.service";

jest.mock("../todo.service");

describe("AuthController", () => {
	let controller: TodoController;
	let service: TodoService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [TodoController],
			providers: [TodoService],
		}).compile();

		controller = module.get<TodoController>(TodoController);
		service = module.get<TodoService>(TodoService);

		jest.clearAllMocks();
	});

	it("Should be defined", () => {
		expect(controller).toBeDefined();
	});
});
