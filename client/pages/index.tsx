import type { NextPage } from "next";
import Head from "next/head";
import { Navbar } from "../components/shared/Navbar";

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>TodosV2</title>
			</Head>
			<>
				<Navbar />
			</>
		</>
	);
};

export default Home;
