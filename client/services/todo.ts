import { CreateTodoDTO, LabelDTO, SetStatusDTO, Todo } from "../types/todo";
import { axios } from "./axios";

interface TodoResponse {
	todo: Todo;
}

interface AllTodosResponse {
	todos: Todo[];
}

export const fetchCreateTodo = async (data: CreateTodoDTO) => {
	const res = await axios.post<TodoResponse>("/todo/create", data);
	return res.data.todo;
};

export const fetchAllTodos = async () => {
	const res = await axios.get<AllTodosResponse>("/todo/all");
	return res.data.todos;
};

export const fetchDeleteTodo = async (id: string) => {
	await axios.delete<TodoResponse>(`/todo/${id}`);
};

export const fetchTodo = async (id: string) => {
	const res = await axios.get<TodoResponse>(`/todo/${id}`);
	return res.data.todo;
};

export const fetchAddLabel = async (data: LabelDTO) => {
	const res = await axios.put<TodoResponse>(`/todo/add-label`, data);
	return res.data.todo;
};

export const fetchRemoveLabel = async (data: LabelDTO) => {
	const res = await axios.put<TodoResponse>(`/todo/remove-label`, data);
	return res.data.todo;
};

export const fetchAddList = async (data: LabelDTO) => {
	const res = await axios.put<TodoResponse>(`/todo/add-list`, data);
	return res.data.todo;
};

export const fetchRemoveList = async (data: LabelDTO) => {
	const res = await axios.put<TodoResponse>(`/todo/remove-list`, data);
	return res.data.todo;
};

export const fetchSetStatus = async (data: SetStatusDTO) => {
	const res = await axios.put<TodoResponse>(`/todo/set-status`, data);
	return res.data.todo;
};

export {};
