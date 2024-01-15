import { Action, createReducer, on } from '@ngrx/store';

import { TodosState, initialState } from './todo.state';
import { addTodo, deleteTodo, editTodo, markTodoDone } from './todo.action';

const _todoReducer = createReducer(
  initialState,
  on(addTodo, (state, action) => {
    let todo = { ...action.todo };
    todo.todoId = state.todos.length + 1;
    return {
      ...state,
      todos: [...state.todos, todo],
    };
  }),

  on(editTodo, (state, action) => {
    const updatedTodo = state.todos.map((todo) => {
      return action.todo.todoId === todo.todoId ? action.todo : todo;
    });
    return {
      ...state,
      todos: updatedTodo,
    };
  }),

  on(deleteTodo, (state, { todoId }) => {
    const updatedTodo = state.todos.filter((todo) => {
      return todo.todoId !== todoId;
    });
    return {
      ...state,
      todos: updatedTodo,
    };
  }),

  on(markTodoDone, (state, action) => {
    const updatedTodo = state.todos.map((todo) => {
      return action.todo.todoId === todo.todoId ? action.todo : todo;
    });
    return {
      ...state,
      todos: updatedTodo,
    };
  })
);

export function todosReducer(state: TodosState | undefined, action: Action) {
  return _todoReducer(state, action);
}
