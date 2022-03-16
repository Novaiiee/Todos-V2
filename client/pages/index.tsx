import type { NextPage } from "next";
import Head from "next/head";
import { GoogleLoginResponse, GoogleLoginResponseOffline, useGoogleLogin } from "react-google-login";
import { useLoginWithGoogleMutation } from "../hooks/api/authHooks";

const Home: NextPage = () => {
	const loginWithGoogle = useLoginWithGoogleMutation();

	const { signIn } = useGoogleLogin({
		clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
		onSuccess: async (r: GoogleLoginResponse | GoogleLoginResponseOffline) => {
			const response = r as GoogleLoginResponse;
			loginWithGoogle.mutate(response.accessToken);
		},
	});

	return (
		<>
			<Head>
				<title>TodosV2</title>
			</Head>
			<div>
				<button onClick={() => signIn()}>Login with Google</button>
			</div>
		</>
	);
};

export default Home;
