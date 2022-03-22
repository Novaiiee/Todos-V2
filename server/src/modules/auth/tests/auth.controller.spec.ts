import { Test, TestingModule } from "@nestjs/testing";
import { UserDocument } from "../../user/user.schema";
import { AuthController } from "../auth.controller";
import { AuthService } from "../auth.service";
import { testUser } from "../__mocks__/user.mock";

jest.mock("../auth.service");

describe("AuthController", () => {
	let controller: AuthController;
	let service: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [AuthService],
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
