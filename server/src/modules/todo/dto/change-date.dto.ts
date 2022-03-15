import { IsDate, IsDateString, IsString } from "class-validator";

export class ChangeDueDateDTO {
	@IsDateString()
	date: string;

	@IsString()
	id: string;
}