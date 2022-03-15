import { IsArray, IsString } from "class-validator";

export class LabelDTO {
	@IsArray({ message: "Labels array is not provided" })
	labels: string[];

	@IsString({ message: "ID not provided" })
	id: string;
}
