import { IsDateString, IsString } from "class-validator";

export class ChangeDueDateDTO {
	@IsDateString({}, { message: "Date is not of IsISO8601 Format" })
	date: string;

	@IsString({ message: "ID not provided" })
	id: string;
}
