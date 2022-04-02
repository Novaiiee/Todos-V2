import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { UserDocument } from "../user/user.schema";
import { ChangeDueDateDTO } from "./dto/change-date.dto";
import { CreateTodoDTO } from "./dto/create-todo.dto";
import { LabelDTO } from "./dto/label.dto";
import { ListDTO } from "./dto/list.dto";
import { SetStatusDTO } from "./dto/set-status.dto";
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

	async addLabels(data: LabelDTO, user: UserDocument) {
		const todo = await this.todoModel.findOne({ user: user.id, id: data.id });

		if (!todo) {
			throw new NotFoundException("Todo not found");
		}

		todo.labels = Array.from(new Set([...todo.labels, ...data.labels]));
		return todo.populate("user").then((todo) => todo.save());
	}

	async addLists(data: ListDTO, user: UserDocument) {
		const todo = await this.todoModel.findOne({ user: user.id, id: data.id });

		if (!todo) {
			throw new NotFoundException("Todo not found");
		}

		todo.lists = Array.from(new Set([...todo.lists, ...data.lists]));
		return todo.populate("user").then((todo) => todo.save());
	}

	async removeLists(data: ListDTO, user: UserDocument) {
		const todo = await this.todoModel.findOne({ user: user.id, id: data.id });

		if (!todo) {
			throw new NotFoundException("Todo not found");
		}

		todo.lists = todo.lists.filter((list) => {
			if (!data.lists.includes(list)) return list;
		});

		return todo.populate("user").then((todo) => todo.save());
	}

	async removeLabels(data: LabelDTO, user: UserDocument) {
		const todo = await this.todoModel.findOne({ user: user.id, id: data.id });

		if (!todo) {
			throw new NotFoundException("Todo not found");
		}

		todo.labels = todo.labels.filter((label) => {
			if (!data.labels.includes(label)) return label;
		});

		return todo.populate("user").then((todo) => todo.save());
	}

	async changeDueDate(data: ChangeDueDateDTO, user: UserDocument) {
		const todo = await this.todoModel.findOne({ user: user.id, id: data.id });

		if (!todo) {
			throw new NotFoundException("Todo not found");
		}

		todo.dueDate = data.date;
		return todo.populate("user").then((todo) => todo.save());
	}

	async setTodoStatus(data: SetStatusDTO, user: UserDocument) {
		const todo = await this.todoModel.findOne({ user: user.id, _id: new Types.ObjectId(data.id) });

		if (!todo) {
			throw new NotFoundException("Todo not found");
		}

		todo.completed = data.status;
		return todo.populate("user").then((todo) => todo.save());
	}
}
