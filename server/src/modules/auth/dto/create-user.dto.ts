import { IsEmail, MinLength } from "class-validator";

export class CreateUserDTO {
	@IsEmail({}, { message: "Email is invalid" })
	email: string;

	@MinLength(6, { message: "Password needs a Minimum of 6 characters" })
	password?: string;
}
