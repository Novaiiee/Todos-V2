import Cookies from "js-cookie";
import { useMutation, useQuery } from "react-query";
import { fetchLogin, fetchLoginWithGoogle, fetchRegister, fetchUser } from "../../services/auth";
import { client } from "../../services/react-query";

export function useLoginMutation() {
	return useMutation({
		mutationFn: fetchLogin,
		onError: (err) => {
			console.log(err);
		},
		onSuccess: (data) => {
			Cookies.set("JWT_ACCESS_TOKEN", data.token);
			client.setQueryData("user", data.user);
		},
	});
}

export function useLoginWithGoogleMutation() {
	return useMutation({
		mutationFn: fetchLoginWithGoogle,
		onError: (err) => {
			console.log(err);
		},
		onSuccess: (data) => {
			Cookies.set("JWT_ACCESS_TOKEN", data.token);
			client.setQueryData("user", data.user);
		},
	});
}

export function useRegisterMutation() {
	return useMutation({
		mutationFn: fetchRegister,
		onError: (err) => {
			console.log(err);
		},
		onSuccess: (data) => {
			Cookies.set("JWT_ACCESS_TOKEN", data.token);
			client.setQueryData("user", data.user);
		},
	});
}

export function useUserQuery() {
	return useQuery(["user"], {
		queryFn: (a) => fetchUser(),
	});
}
