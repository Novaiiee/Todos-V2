import { FC, FormEvent, useState } from "react";
import DatePicker from "react-datepicker";
import { Tag, WithContext as ReactTags } from "react-tag-input";
import { useCreateTodoMutation } from "../../hooks/api/todoHooks";

const KeyCodes = {
	comma: 188,
	enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export const CreateTodoModal: FC = () => {
	const createTodo = useCreateTodoMutation();

	const [startDate, setStartDate] = useState(new Date());
	const [name, setName] = useState("");
	const [content, setContent] = useState("");
	const [labels, setLabels] = useState<Tag[]>([]);
	const [lists, setLists] = useState<Tag[]>([]);

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		createTodo.mutate({
			name,
			completed: false,
			content,
			dueDate: startDate.toJSON(),
			labels: labels.map((t) => t.text),
			lists: lists.map((t) => t.text),
		});
	};

	return (
		<>
			{/* <Button onClick={onOpen}>Create</Button>
			<Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount isCentered>
				<ModalOverlay />
				<ModalContent maxW="40%" maxH="90%">
					<form onSubmit={onSubmit}>
						<ModalHeader fontWeight="bold" fontSize="2xl">
							Create Todo
						</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<VStack spacing={6} w="full">
								<Box w="full">
									<FormLabel>Name:</FormLabel>
									<Input value={name} onChange={(e) => setName(e.target.value)} />
								</Box>
								<Box w="full">
									<FormLabel>Content:</FormLabel>
									<Textarea value={content} onChange={(e) => setContent(e.target.value)} />
								</Box>
								<HStack spacing={20} w="full" justify="space-between">
									<FormLabel>Due Date:</FormLabel>
									<DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} />
								</HStack>
								<Box w="full">
									<FormLabel>Labels</FormLabel>
									<ReactTags
										tags={labels}
										delimiters={delimiters}
										inputFieldPosition="bottom"
										autocomplete
										handleDelete={(i) => setLabels(labels.filter((_, index) => index !== i))}
										handleAddition={(tag) => setLabels([...labels, tag])}
									/>
								</Box>
								<Box w="full">
									<FormLabel>Lists</FormLabel>
									<ReactTags
										tags={lists}
										delimiters={delimiters}
										inputFieldPosition="bottom"
										autocomplete
										handleDelete={(i) => setLists(lists.filter((_, index) => index !== i))}
										handleAddition={(tag) => setLists([...lists, tag])}
									/>
								</Box>
							</VStack>
						</ModalBody>
						<ModalFooter>
							<Button type="submit">Submit</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal> */}
		</>
	);
};
