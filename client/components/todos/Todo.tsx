import { FC } from 'react';
import { Todo as TodoType } from "../../types/todo";

interface TodoProps extends TodoType {

}

export const Todo: FC<TodoProps> = ({ name }) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}