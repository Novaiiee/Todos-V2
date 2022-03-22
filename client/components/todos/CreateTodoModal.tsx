import { Button, Group, Modal, MultiSelect, SelectItem, Textarea, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useDisclosure, useInputState } from "@mantine/hooks";
import { FC, FormEvent } from "react";
import { useUserQuery } from "../../hooks/api/authHooks";
import { useCreateTodoMutation } from "../../hooks/api/todoHooks";
import { useCreateLabelMutation, useCreateListMutation } from "../../hooks/api/userHooks";
import { useAppStore } from "../../stores/useAppStore";

const firstCharToUpper = (str: string) => str[0].toUpperCase() + str.substring(1, str.length);

const mapSelectItems = (array: string[]): SelectItem[] => {
	return array.map((value) => ({ value, label: firstCharToUpper(value) }));
};

export const CreateTodoModal: FC = () => {
	const toggleCreateTodoModal = useAppStore((state) => state.toggleCreateTodoModal);
	const isCreateTodoModalOpen = useAppStore((state) => state.isCreateTodoModalOpen);

	const { data: user } = useUserQuery(true);

	const [opened, handlers] = useDisclosure(false, {
		onOpen: toggleCreateTodoModal,
		onClose: toggleCreateTodoModal,
	});

	const [name, setName] = useInputState("");
	const [content, setContent] = useInputState("");
	const [dueDate, setDueDate] = useInputState(new Date());
	const [labels, setLabels] = useInputState<SelectItem[]>(mapSelectItems(user?.labels ?? []));
	const [lists, setLists] = useInputState<SelectItem[]>(mapSelectItems(user?.labels ?? []));

	const createTodo = useCreateTodoMutation();
	const createLabel = useCreateLabelMutation();
	const createList = useCreateListMutation();

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		createTodo.mutate({
			name,
			completed: false,
			content,
			dueDate: dueDate.toJSON(),
			labels: labels.map((t) => t.label!),
			lists: lists.map((t) => t.label!),
		});
	};

	const onLabelCreation = (label: string) => {
		setLabels([...labels, { value: label, label: firstCharToUpper(label) }]);
		createLabel.mutate(label);
	};

	const onListCreation = (list: string) => {
		setLists([...lists, { value: list, label: firstCharToUpper(list) }]);
		createList.mutate(list);
	};

	return (
		<>
			<Modal opened={isCreateTodoModalOpen} onClose={handlers.close} title="Create a Todo">
				<form onSubmit={onSubmit}>
					<Group grow direction="column" spacing={35}>
						<Group spacing={10} grow>
							<TextInput required value={name} onChange={setName} label="Name:" />
							<DatePicker value={dueDate} onChange={setDueDate} label="Due Date:" />
						</Group>
						<Group grow>
							<Textarea autosize maxRows={13} value={content} onChange={setContent} label="Content:" />
						</Group>
						<Group spacing={10} direction="column" grow>
							<MultiSelect
								label="Labels"
								placeholder="Type a label to create it"
								data={labels}
								searchable
								nothingFound="Nothing found"
								creatable
								getCreateLabel={(query) => `+ Create ${query}`}
								onCreate={onLabelCreation}
							/>
							<MultiSelect
								label="Lists"
								placeholder="Type a list name to create it"
								data={lists}
								searchable
								nothingFound="Nothing found"
								creatable
								getCreateLabel={(query) => `+ Create ${query}`}
								onCreate={onListCreation}
							/>
						</Group>
						<Group grow>
							<Button type="submit">Create</Button>
						</Group>
					</Group>
				</form>
			</Modal>
			<Group position="center">
				<Button onClick={handlers.toggle}>Open Modal</Button>
			</Group>
		</>
	);
};
