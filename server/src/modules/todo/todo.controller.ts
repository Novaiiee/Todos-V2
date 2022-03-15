import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CurrentUser } from "../auth/decorators/user.decorator";
import { JwtGuard } from "../auth/guards/jwt.guard";
import { UserDocument } from "../user/user.schema";
import { CreateTodoDTO } from "./dto/create-todo.dto";
import { TodoService } from "./todo.service";

@Controller("todo")
export class TodoController {
	constructor(private todoService: TodoService) {}

	@UseGuards(JwtGuard)
	@Post("/create")
	async create(@Body() data: CreateTodoDTO, @CurrentUser() user: UserDocument) {
		const todo = await this.todoService.create(data, user.id);

		return {
			todo,
		};
	}

	@UseGuards(JwtGuard)
	@Get("/all")
	async all(@CurrentUser() user: UserDocument) {
		const todos = await this.todoService.findAll(user.id);

		return {
			todos,
		};
	}

	@UseGuards(JwtGuard)
	@Get("/:id")
	async findOne(@CurrentUser() user: UserDocument, @Param("id") id: string) {
		const todo = await this.todoService.findOne(id, user.id);

		return {
			todo,
		};
	}

	@UseGuards(JwtGuard)
	@Delete("/:id")
	async deleteOne(@CurrentUser() user: UserDocument, @Param("id") id: string) {
		await this.todoService.delete(id, user.id);
		return true;
	}
}
