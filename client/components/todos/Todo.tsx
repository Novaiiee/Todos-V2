import { Badge, Button, Group, Text } from "@mantine/core";
import { FC } from "react";
import { Trash } from "react-feather";
import {
	useAddTodoLabelMutation,
	useAddTodoListMutation,
	useDeleteTodoMutation,
	useRemoveTodoLabelMutation,
	useRemoveTodoListMutation,
	useSetTodoStatusMutation,
} from "../../hooks/api/todoHooks";
import { Todo as TodoType } from "../../types/todo";

interface TodoProps extends TodoType {}

const firstCharToUpper = (str: string) => str[0].toUpperCase() + str.substring(1, str.length);

export const Todo: FC<TodoProps> = ({ name, _id, completed, content, dueDate, labels, lists }) => {
	const setTodoStatus = useSetTodoStatusMutation();
	const addTodoList = useAddTodoListMutation();
	const addTodoLabel = useAddTodoLabelMutation();
	const removeTodoList = useRemoveTodoListMutation();
	const removeTodoLabel = useRemoveTodoLabelMutation();
	const deleteTodo = useDeleteTodoMutation();

	return (
		<Group
			position="apart"
			px={20}
			py={8}
			sx={(theme) => ({
				borderRadius: "5px",
				border: "solid gray",
			})}
		>
			<Text weight={"bold"}>{name}</Text>
			<Button color="red" onClick={() => deleteTodo.mutate(_id)}>
				<Trash />
			</Button>
			<Group>
				<Text>Lists</Text>
				{lists.map((list) => (
					<Badge key={list}>{list}</Badge>
				))}
			</Group>
			<Group>
				<Text>Labels</Text>
				{labels.map((label) => (
					<Badge key={label}>{label}</Badge>
				))}
			</Group>
		</Group>
	);
};
