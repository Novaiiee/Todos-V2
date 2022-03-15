import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDTO } from "../auth/dto/create-user.dto";
import { User, UserDocument } from "./user.schema";

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	async findByEmail(email: string) {
		const user = await this.userModel.findOne({ email });

		if (!user) {
			throw new HttpException("User not found", HttpStatus.NOT_FOUND);
		}

		return user;
	}

	async findByID(id: string) {
		const user = await this.userModel.findById(id);

		if (!user) {
			throw new HttpException("User not found", HttpStatus.NOT_FOUND);
		}

		return user;
	}

	async doesUserExist(email: string) {
		const user = await this.userModel.findOne({ email });
		return user ? true : false;
	}

	async create(data: CreateUserDTO) {
		return this.userModel.create(data);
	}
}
