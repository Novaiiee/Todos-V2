import { MutationFunction, useMutation, useQuery } from "react-query";
import { client } from "../../services/react-query";
import {
	fetchAddLabel,
	fetchAddList,
	fetchAllTodos,
	fetchCreateTodo,
	fetchDeleteTodo,
	fetchRemoveLabel,
	fetchRemoveList,
	fetchSetStatus,
	fetchTodo,
} from "../../services/todo";
import { LabelDTO, ListDTO, SetStatusDTO, Todo } from "../../types/todo";

export function useCreateTodoMutation() {
	return useMutation({
		mutationFn: fetchCreateTodo,
		onError: (err) => {
			console.log(err);
		},
		onSuccess: (data) => {
			console.log(data);
			
			client.setQueryData<Todo[]>("todos", (todos) => {
				if (todos) return [...todos, data];
				return [data];
			});
		},
	});
}

export function useDeleteTodoMutation() {
	return useMutation({
		mutationFn: fetchDeleteTodo,
		onError: (err) => {
			console.log(err);
		},
		onSuccess: (data, id) => {
			client.setQueryData<Todo[]>("todos", (todos) => {
				if (!todos) return [];
				return todos.filter((todo) => todo._id !== id);
			});
		},
	});
}

export function useAllTodosQuery() {
	return useQuery(["todos"], {
		queryFn: fetchAllTodos,
	});
}

export function useTodoQuery(id: string) {
	return useQuery(["todo", id], {
		queryFn: (ctx) => fetchTodo(ctx.queryKey[1]),
	});
}

function createTodoHook<V>(mutationFn: MutationFunction<Todo, V>) {
	return () => {
		return useMutation({
			mutationFn,
			onError: (err) => {
				console.log(err);
			},
			onSuccess: (data) => {
				client.setQueryData<Todo[]>("todos", (todos) => {
					if (!todos) return [];

					return todos.map((todo) => {
						if (todo._id === data._id) {
							return data;
						}

						return todo;
					});
				});
			},
		});
	};
}

export const useAddTodoLabelMutation = createTodoHook<LabelDTO>(fetchAddLabel);
export const useRemoveTodoLabelMutation = createTodoHook<LabelDTO>(fetchRemoveLabel);
export const useAddTodoListMutation = createTodoHook<ListDTO>(fetchAddList);
export const useRemoveTodoListMutation = createTodoHook<LabelDTO>(fetchRemoveList);
export const useSetTodoStatusMutation = createTodoHook<SetStatusDTO>(fetchSetStatus);

// export function useAddTodoLabelMutation() {
// 	return useMutation({
// 		mutationFn: fetchAddLabel,
// 		onError: (err) => {
// 			console.log(err);
// 		},
// 		onSuccess: (data) => {
// 			client.setQueryData<Todo[]>("todos", (todos) => {
// 				if (!todos) return [];

// 				return todos.map((todo) => {
// 					if (todo._id === data._id) {
// 						return data;
// 					}

// 					return todo;
// 				});
// 			});
// 		},
// 	});
// }

// export function useRemoveTodoLabelMutation() {
// 	return useMutation({
// 		mutationFn: fetchRemoveLabel,
// 		onError: (err) => {
// 			console.log(err);
// 		},
// 		onSuccess: (data) => {
// 			client.setQueryData<Todo[]>("todos", (todos) => {
// 				if (!todos) return [];

// 				return todos.map((todo) => {
// 					if (todo._id === data._id) {
// 						return data;
// 					}

// 					return todo;
// 				});
// 			});
// 		},
// 	});
// }
// export function useRemoveTodoListMutation() {
// 	return useMutation({
// 		mutationFn: fetchRemoveLabel,
// 		onError: (err) => {
// 			console.log(err);
// 		},
// 		onSuccess: (data) => {
// 			client.setQueryData<Todo[]>("todos", (todos) => {
// 				if (!todos) return [];

// 				return todos.map((todo) => {
// 					if (todo._id === data._id) {
// 						return data;
// 					}

// 					return todo;
// 				});
// 			});
// 		},
// 	});
// }
// export function useUserQuery() {
// 	return useQuery(["user"], {
// 		queryFn: (a) => fetchUser(),
// 	});
// }
