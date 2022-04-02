import { Badge, Button, Divider, Grid, Group, Text } from "@mantine/core";
import { FC } from "react";
import { CheckCircle, Circle, Trash } from "react-feather";
import {
	useAddTodoLabelMutation,
	useAddTodoListMutation,
	useDeleteTodoMutation,
	useRemoveTodoLabelMutation,
	useRemoveTodoListMutation,
	useSetTodoStatusMutation,
} from "../../hooks/api/todoHooks";
import { Todo as TodoType } from "../../types/todo";
import { trim } from "../../utils/stringUtils";

interface TodoProps extends TodoType {}

export const Todo: FC<TodoProps> = ({ name, _id, completed, content, dueDate, labels, lists }) => {
	const setTodoStatus = useSetTodoStatusMutation();
	const addTodoList = useAddTodoListMutation();
	const addTodoLabel = useAddTodoLabelMutation();
	const removeTodoList = useRemoveTodoListMutation();
	const removeTodoLabel = useRemoveTodoLabelMutation();
	const deleteTodo = useDeleteTodoMutation();

	return (
		<Grid
			columns={10}
			px={20}
			py={8}
			sx={(theme) => ({
				borderRadius: "10px",
				border: "solid gray 2px",
				background: theme.black,
				maxWidth: "30vw",
			})}
		>
			<Grid.Col span={1}>
				<Group position="center">
					<Button
						mt={4}
						component={completed ? CheckCircle : Circle}
						p={3}
						variant="subtle"
						color={completed ? "green" : "gray"}
						onClick={() => setTodoStatus.mutate({ id: _id, status: !completed })}
					></Button>
				</Group>
			</Grid.Col>
			<Grid.Col span={9}>
				<Group direction="column" spacing={20} grow>
					<Group position="apart" grow>
						<Text weight={"bold"} color="white" sx={{ textDecoration: completed ? "line-through" : "none" }}>
							{name}
						</Text>
						<>
							<Button px={6} color="red" onClick={() => deleteTodo.mutate(_id)}>
								<Trash />
							</Button>
						</>
					</Group>
					<Group position="apart" grow direction="column">
						{content && (
							<Text sx={{ textDecoration: completed ? "line-through" : "none" }}>
								{trim(content, 20) + "..."}
							</Text>
						)}
						<Group>
							<Text color="white">Lists</Text>
							<Divider my="sm" orientation="horizontal" />
							{lists.map((list) => (
								<Badge color="gray" key={list}>
									{list}
								</Badge>
							))}
						</Group>
						<Group>
							<Text color="white">Labels</Text>
							{labels.map((label) => (
								<Badge color="gray" key={label}>
									{label}
								</Badge>
							))}
						</Group>
						<Group sx={(theme) => ({ color: theme.white })}>
							Complete By: <Text color="gray">{dueDate.split("T")[0]}</Text>
						</Group>
					</Group>
				</Group>
			</Grid.Col>
		</Grid>
	);
};
