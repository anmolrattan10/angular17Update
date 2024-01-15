import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodosState } from './todo.state';

const getTodoState = createFeatureSelector<TodosState>('todos');

export const getTodos = createSelector(getTodoState, (state) => {
  return state.todos;
});

export const getTodoById = (todoId: number) =>
  createSelector(getTodoState, (state) => {
    let editedTodo = state.todos.find((todo) => {
      return todo.todoId == todoId;
    });
    return editedTodo;
  });
