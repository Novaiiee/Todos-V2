import { IsArray, IsDateString, IsOptional, IsString } from "class-validator";

export class CreateTodoDTO {
	@IsString({ message: "Todo name not provided" })
	name: string;

	@IsArray({ message: "Todo labels is not an Array" })
	@IsOptional()
	labels: string[];

	@IsOptional()
	@IsDateString({}, { message: "Date is not of IsISO8601 Format" })
	dueDate: string;

	@IsArray({ message: "Todo lists is not an Array" })
	@IsOptional()
	lists: string[];

	@IsString({ message: "Todo content is not a string" })
	@IsOptional()
	content: string;
}
