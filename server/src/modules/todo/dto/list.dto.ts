import { IsArray, IsString } from "class-validator";

export class ListDTO {
	@IsArray({ message: "Lists array is not provided" })
	lists: string[];

	@IsString({ message: "ID not provided" })
	id: string;
}
