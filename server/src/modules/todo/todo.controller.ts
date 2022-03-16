import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CurrentUser } from "../auth/decorators/user.decorator";
import { JwtGuard } from "../auth/guards/jwt.guard";
import { UserDocument } from "../user/user.schema";
import { ChangeDueDateDTO } from "./dto/change-date.dto";
import { CreateTodoDTO } from "./dto/create-todo.dto";
import { LabelDTO } from "./dto/label.dto";
import { ListDTO } from "./dto/list.dto";
import { SetStatusDTO } from "./dto/set-status.dto";
import { TodoService } from "./todo.service";

@Controller("todo")
export class TodoController {
	constructor(private todoService: TodoService) {}

	@UseGuards(JwtGuard)
	@Post("/create")
	async create(@Body() data: CreateTodoDTO, @CurrentUser() user: UserDocument) {
		const todo = await this.todoService.create(data, user.id);
		return { todo };
	}

	@UseGuards(JwtGuard)
	@Get("/all")
	async all(@CurrentUser() user: UserDocument) {
		const todos = await this.todoService.findAll(user.id);
		return { todos };
	}

	@UseGuards(JwtGuard)
	@Get("/:id")
	async findOne(@CurrentUser() user: UserDocument, @Param("id") id: string) {
		const todo = await this.todoService.findOne(id, user.id);
		return { todo };
	}

	@UseGuards(JwtGuard)
	@Delete("/:id")
	async deleteOne(@CurrentUser() user: UserDocument, @Param("id") id: string) {
		await this.todoService.delete(id, user.id);
		return true;
	}

	@UseGuards(JwtGuard)
	@Put("/add-label")
	async addLabels(@CurrentUser() user: UserDocument, @Body() data: LabelDTO) {
		const todo = await this.todoService.addLabels(data, user);
		return { todo };
	}

	@UseGuards(JwtGuard)
	@Put("/add-list")
	async addLists(@CurrentUser() user: UserDocument, @Body() data: ListDTO) {
		const todo = await this.todoService.addLists(data, user);
		return { todo };
	}

	@UseGuards(JwtGuard)
	@Put("/remove-list")
	async removeLists(@CurrentUser() user: UserDocument, @Body() data: ListDTO) {
		const todo = await this.todoService.removeLists(data, user);
		return { todo };
	}

	@UseGuards(JwtGuard)
	@Put("/remove-label")
	async removeLabels(@CurrentUser() user: UserDocument, @Body() data: LabelDTO) {
		const todo = await this.todoService.removeLabels(data, user);
		return { todo };
	}

	@UseGuards(JwtGuard)
	@Put("/change-date")
	async changeDueDate(@CurrentUser() user: UserDocument, @Body() data: ChangeDueDateDTO) {
		const todo = await this.todoService.changeDueDate(data, user);
		return { todo };
	}

	@UseGuards(JwtGuard)
	@Put("/set-status")
	async setTodoStatus(@CurrentUser() user: UserDocument, @Body() data: SetStatusDTO) {
		const todo = await this.todoService.setTodoStatus(data, user);
		return { todo };
	}
}
