import { IsEmail, MinLength } from "class-validator";

export class LoginDTO {
	@IsEmail({}, { message: "Email is invalid" })
	email: string;

	@MinLength(6)
	password: string;
}
