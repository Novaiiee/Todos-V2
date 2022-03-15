import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { User } from "../user/user.schema";

@Schema()
export class Todo {
	@Prop({ default: "" })
	name: string;

	@Prop({ default: "" })
	content: string;

	@Prop({ default: "" })
	dueDate: string;

	@Prop({ default: [], type: () => [String] })
	labels: string[];

	@Prop({ default: [], type: () => [String] })
	lists: string;

	@Prop({ type: MongooseSchema.Types.ObjectId, ref: "User" })
	user: User;
}

export type TodoDocument = Todo & Document;
export const TodoSchema = SchemaFactory.createForClass(Todo);
