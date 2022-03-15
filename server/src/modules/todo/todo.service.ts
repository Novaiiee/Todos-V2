import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateTodoDTO } from "./dto/create-todo.dto";
import { Todo, TodoDocument } from "./todo.schema";

@Injectable()
export class TodoService {
	constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

	async create(data: CreateTodoDTO, userID: string) {
		const todo = await (await this.todoModel.create({ ...data, user: userID })).populate("user");
		return todo;
	}

	async findAll(userID: string) {
		const todos = await this.todoModel.find({ user: userID }).populate("user");
		return todos;
	}

	async findOne(todoID: string, userID: string) {
		const todos = await this.todoModel.findById(todoID).populate("user");
		return todos;
	}

	async delete(todoID: string, userID: string) {
		await this.todoModel.deleteOne({ id: todoID, user: userID });
	}
}
