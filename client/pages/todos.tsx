import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { Navbar } from "../components/shared/Navbar";
import { CreateTodoModal } from "../components/todos/CreateTodoModal";
import { TodoList } from "../components/todos/TodoList";

export function getServerSideProps({ req }: GetServerSidePropsContext) {
	if (!req.cookies["JWT_ACCESS_TOKEN"]) {
		return {
			redirect: {
				destination: "/",
			},
		};
	}

	return { props: {} };
}

export default function TodosPage() {
	return (
		<>
			<Head>
				<title>TodosV2</title>
			</Head>
			<>
				<Navbar />
				<CreateTodoModal />
				<TodoList />
			</>
		</>
	);
}
