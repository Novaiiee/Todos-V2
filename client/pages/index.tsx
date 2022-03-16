import { Input } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { Navbar } from "../components/shared/Navbar";

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>TodosV2</title>
			</Head>
			<div>
				<Navbar />
			</div>
		</>
	);
};

export default Home;
