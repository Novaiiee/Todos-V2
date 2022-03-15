import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { TodoController } from "./todo.controller";
import { Todo, TodoSchema } from "./todo.schema";
import { TodoService } from "./todo.service";

@Module({
  imports: [MongooseModule.forFeature([{schema: TodoSchema, name: Todo.name}])],
  providers: [TodoService],
  controllers: [TodoController]
})
export class TodoModule {}
