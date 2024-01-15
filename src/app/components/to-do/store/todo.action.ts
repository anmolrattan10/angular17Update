import { createAction, props } from '@ngrx/store';

import { TODOS } from '../models/todo.model';

export const ADD_TODO_ACTION = '[todo page] add todo';
export const EDIT_TODO_ACTION = '[todo page] edit todo';
export const DELETE_TODO_ACTION = '[todo page] delete todo';
export const Mark_TODO_DONE_ACTION = '[todo page] mark todo done';

export const addTodo = createAction(ADD_TODO_ACTION, props<{ todo: TODOS }>());

export const editTodo = createAction(
  EDIT_TODO_ACTION,
  props<{ todo: TODOS }>()
);

export const deleteTodo = createAction(
  DELETE_TODO_ACTION,
  props<{ todoId: number | undefined }>()
);

export const markTodoDone = createAction(
  Mark_TODO_DONE_ACTION,
  props<{ todo: TODOS }>()
);
