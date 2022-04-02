import { Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CurrentUser } from "../auth/decorators/user.decorator";
import { JwtGuard } from "../auth/guards/jwt.guard";
import { UserDocument } from "./user.schema";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
	constructor(private userService: UserService) {}

	@Post("/label/:label")
	@UseGuards(JwtGuard)
	async createLabel(@Param("label") label: string, @CurrentUser() user: UserDocument) {
		return {
			user: await this.userService.createLabel(label, user),
		};
	}

	@Post("/list/:list")
	@UseGuards(JwtGuard)
	async createList(@Param("list") list: string, @CurrentUser() user: UserDocument) {
		return {
			user: await this.userService.createList(list, user),
		};
	}

	@Get("/lists")
	@UseGuards(JwtGuard)
	async getLists(@CurrentUser() user: UserDocument) {
		return {
			list: user.lists,
		};
	}

	@Get("/labels")
	@UseGuards(JwtGuard)
	async getLabels(@CurrentUser() user: UserDocument) {
		return {
			list: user.labels,
		};
	}
}
