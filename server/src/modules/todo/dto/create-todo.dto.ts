import { IsArray, IsDateString, IsOptional, IsString } from "class-validator";

export class CreateTodoDTO {
	@IsString()
	name: string;

	@IsArray()
	@IsOptional()
	labels: string[];

	@IsOptional()
	@IsDateString()
	dueDate: string;

	@IsArray()
	@IsOptional()
	lists: string[];

	@IsString()
	@IsOptional()
	content: string;
}
