import Head from "next/head";
import { Navbar } from "../components/shared/Navbar";
import { CreateTodoModal } from "../components/todos/CreateTodoModal";
import { TodoList } from "../components/todos/TodoList";

export default function TodosPage() {
	return (
		<>
			<Head>
				<title>TodosV2</title>
			</Head>
			<div>
				<Navbar />
				<CreateTodoModal />
				<TodoList />
			</div>
		</>
	);
}
