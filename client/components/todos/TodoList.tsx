import { Group } from "@mantine/core";
import { FC } from "react";
import { useAllTodosQuery } from "../../hooks/api/todoHooks";
import { Todo } from "./Todo";

interface TodoListProps {}

export const TodoList: FC<TodoListProps> = ({}) => {
	const { data: todos } = useAllTodosQuery();

	return (
		<Group spacing={20} grow direction="column">
			{todos?.map((todo) => {
				return <Todo key={todo._id} {...todo} />;
			})}
		</Group>
	);
};
