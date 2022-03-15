import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { AuthModule } from "./auth/auth.module";
import { TodoModule } from "./todo/todo.module";
import { UserModule } from "./user/user.module";

@Module({
	imports: [
		AuthModule,
		TodoModule,
		UserModule,
		AuthModule,
		ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
		PassportModule.register({ defaultStrategy: "jwt", session: false }),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get("MONGODB_URI"),
			}),
		}),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get("JWT_ACCESS_SECRET"),
				signOptions: {
					expiresIn: "7d",
				},
			}),
		}),
	],
})
export class AppModule {}
