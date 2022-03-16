import * as yup from "yup";

export const AuthSchema = yup.object({
	email: yup.string().email("Not an email").required("Required*"),
	password: yup.string().required("Required*").length(6, "Minimum of 6 Characters"),
});
