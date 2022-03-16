import Cookies from "js-cookie";
import { useMutation, useQuery } from "react-query";
import { fetchLogin, fetchLoginWithGoogle, fetchRegister } from "../../services/auth";

export function useLoginMutation() {
	return useMutation({
		mutationFn: fetchLogin,
		onError: (err) => {
			console.log(err);
		},
		onSuccess: (data) => {
			Cookies.set("JWT_ACCESS_TOKEN", data.token);
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
      console.log(data);
      
			Cookies.set("JWT_ACCESS_TOKEN", data.token);
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
		},
	});
}

export function useUserQuery() {
	return useQuery(["user", ""], {
		queryFn: (a) => fetchLoginWithGoogle(a.queryKey[0]),
	});
}
