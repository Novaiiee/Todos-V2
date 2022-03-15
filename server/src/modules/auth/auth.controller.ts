import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { UserDocument } from "../user/user.schema";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./decorators/user.decorator";
import { CreateUserDTO } from "./dto/create-user.dto";
import { JwtGuard } from "./guards/jwt.guard";
import { LocalGuard } from "./guards/local.guard";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post("/register")
	async register(@Body() data: CreateUserDTO) {
		const user = await this.authService.register(data);
		const token = await this.authService.generateToken(user.id);

		return { user, token };
	}

	@Post("/login")
	@UseGuards(LocalGuard)
	async login(@CurrentUser() user: UserDocument) {
		const token = await this.authService.generateToken(user.id);
		return { user, token };
	}

	@Post("/login-google")
	async loginWithGoogle(@Query("access_token") accessToken: string) {
		const user = await this.authService.loginWithGoogle(accessToken);
		const token = await this.authService.generateToken(user.id);

		return { user, token };
	}

	@Get("/user")
	@UseGuards(JwtGuard)
	async currentUser(@CurrentUser() user: UserDocument) {
		return { user };
	}
}
