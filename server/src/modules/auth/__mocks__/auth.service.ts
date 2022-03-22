import { sign } from "jsonwebtoken";
import { testUser } from "./user.mock";

export const AuthService = jest.fn().mockReturnValue({
	generateToken: jest.fn().mockReturnValue(sign({ id: "123456" }, "secret")),
	register: jest.fn().mockResolvedValue(testUser()),
	validateUser: jest.fn().mockResolvedValue(testUser()),
	getUserByID: jest.fn().mockResolvedValue(testUser()),
});
