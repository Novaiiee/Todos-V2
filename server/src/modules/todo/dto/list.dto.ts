import { IsArray, IsString } from "class-validator";

export class ListDTO {
	@IsArray()
	lists: string[];

	@IsString()
	id: string;
}
