import { User } from "../../user/user.schema";

export const testUser = (): User & { id: string } => ({
	email: "example@gmail.com",
	id: "123456",
	labels: [],
	lists: [],
	password: "twilight123",
});
