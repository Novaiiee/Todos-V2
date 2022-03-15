import { IsArray, IsString } from "class-validator";

export class LabelDTO {
  @IsArray()
  labels: string[];

  @IsString()
  id: string;
}