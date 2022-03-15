import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { compare, hash } from "bcrypt";
import { google } from "googleapis";
import { UserService } from "../user/user.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { LoginDTO } from "./dto/login.dto";

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private userService: UserService,
		private configService: ConfigService
	) {}

	async generateToken(id: string) {
		return this.jwtService.sign({ id });
	}

	async register(data: CreateUserDTO) {
		const user = await this.userService.doesUserExist(data.email);

		if (user) {
			const user = await this.userService.findByEmail(data.email);

			if (!user.password) {
				throw new UnauthorizedException("Logged in with Google");
			}

			const isPasswordValid = await compare(data.password, user.password);

			if (isPasswordValid) return user;
			throw new UnauthorizedException("User exists");
		}

		const hashedPassword = await hash(data.password, 10);
		const createdUser = await this.userService.create({
			email: data.email,
			password: hashedPassword,
		});

		return createdUser;
	}

	async validateUser(data: LoginDTO) {
		try {
			const user = await this.userService.findByEmail(data.email);

			if (await compare(data.password, user.password)) {
				return user;
			}

			throw new UnauthorizedException("Password is Invalid");
		} catch (err: any) {
			if (err.status !== HttpStatus.NOT_FOUND) {
				throw new HttpException(err, HttpStatus.UNAUTHORIZED);
			}

			const hashedPassword = await hash(data.password, 10);
			const createdUser = await this.userService.create({
				email: data.email,
				password: hashedPassword,
			});

			return createdUser;
		}
	}

	async getUserByID(id: string) {
		return this.userService.findByID(id);
	}

	async loginWithGoogle(accessToken: string) {
		const clientID = this.configService.get("GOOGLE_CLIENT_ID");
		const clientSecret = this.configService.get("GOOGLE_CLIENT_SECRET");

		const client = new google.auth.OAuth2({ clientId: clientID, clientSecret });
		client.setCredentials({ access_token: accessToken });

		const { email } = await client.getTokenInfo(accessToken);

		try {
			const user = await this.userService.findByEmail(email);
			return user;
		} catch (err) {
			if (err.status !== HttpStatus.NOT_FOUND) {
				throw new HttpException(err, HttpStatus.UNAUTHORIZED);
			}

			const user = this.userService.create({
				email,
				password: "",
			});

			return user;
		}
	}
}
