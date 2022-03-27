import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { sign } from "jsonwebtoken";
import { User, UserDocument } from "../../user/user.schema";
import { AuthController } from "../auth.controller";
import { AuthService } from "../auth.service";
import { testUser } from "../__mocks__/user.mock";

const userModel = jest.fn(() => ({
	findOne: jest.fn(() => testUser()),
	find: jest.fn(() => [testUser()]),
	findById: jest.fn(() => testUser()),
	deleteOne: jest.fn(),
	populate: jest.fn(() => testUser()),
}));

describe("AuthController", () => {
	let controller: AuthController;
	let service: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [
				{ provide: getModelToken(User.name), useValue: userModel },
				{
					provide: AuthService,
					useFactory: jest.fn().mockReturnValue({
						generateToken: jest.fn().mockReturnValue(sign({ id: "123456" }, "secret")),
						register: jest.fn().mockResolvedValue(testUser()),
						validateUser: jest.fn().mockResolvedValue(testUser()),
						getUserByID: jest.fn().mockResolvedValue(testUser()),
					}),
				},
			],
		}).compile();

		controller = module.get<AuthController>(AuthController);
		service = module.get<AuthService>(AuthService);

		jest.clearAllMocks();
	});

	it("Should be defined", () => {
		expect(controller).toBeDefined();
	});

	it("Should register a user", async () => {
		const data = { email: "test@test.com", password: "123456" };
		const res = await controller.register(data);

		expect(service.register).toHaveBeenCalledWith(data);
		expect(res.token).toBeDefined();
		expect(res.user).toBeDefined();
	});

	it("Should validate a user and login", async () => {
		const user = testUser() as UserDocument;
		const res = await service.validateUser(user);

		expect(service.validateUser).toHaveBeenCalledWith(user);
		expect(res).toBeDefined();
	});
});
