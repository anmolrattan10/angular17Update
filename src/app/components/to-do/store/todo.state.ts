import { TODOS } from '../models/todo.model';

export interface TodosState {
  todos: TODOS[];
}

export const initialState: TodosState = {
  todos: [],
};
