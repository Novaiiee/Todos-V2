import { IsBoolean, IsString } from "class-validator";

export class SetStatusDTO {
	@IsBoolean({ message: "Completion status not provided" })
	status: boolean;

	@IsString({ message: "ID not provided" })
	id: string;
}
