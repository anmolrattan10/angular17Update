import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';

import {
  addTodo,
  deleteTodo,
  editTodo,
  markTodoDone,
} from './store/todo.action';
import { TODOS } from './models/todo.model';
import { getTodoById, getTodos } from './store/todo.selector';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.css',
})
export class ToDoComponent implements OnInit, OnDestroy {
  //Todos
  todoList!: Observable<TODOS[]>;
  //Todo Form
  todoForm!: FormGroup;
  //Edit Todo Flag
  isEditting: boolean = false;
  //Selected Todo Index
  toDoIndex!: number;
  //Selected Todo
  edittingTodo: any = {};
  //Get Todo by Id subscription
  editedTodoSubscription!: Subscription;

  constructor(private store: Store<{ todo: TODOS }>) {}

  /**
   * @function that runs when component is initialized
   * @returns void
   */
  ngOnInit(): void {
    this.getTodos();
    this.createAddTodoForm();
  }

  /**
   * @function to create todo input form
   * @returns void
   */
  createAddTodoForm(): void {
    this.todoForm = new FormGroup({
      addTodo: new FormControl(''),
    });
  }

  /**
   * @function to get todos from state
   * @returns void
   */
  getTodos(): void {
    this.todoList = this.store.select(getTodos);
  }

  /**
   * @function to add a todo
   * @returns void
   */
  addTodo(): void {
    const todo = {
      item: this.todoForm.value.addTodo,
      flag: false,
    };
    this.store.dispatch(addTodo({ todo }));
    this.todoForm.reset();
  }

  /**
   * @function to edit a todo
   * @param item
   * @param index
   * @returns void
   */
  editTodo(item: string, index: number): void {
    this.isEditting = true;
    this.toDoIndex = index;
    this.todoForm.controls['addTodo'].setValue(item);
    this.editedTodoSubscription = this.store
      .select(getTodoById(this.toDoIndex + 1))
      .subscribe((data) => {
        this.edittingTodo = data;
      });
  }

  /**
   * @function to mark a todo done or undone
   * @param index
   * @returns void
   */
  markDone(index: number): void {
    this.editedTodoSubscription = this.store
      .select(getTodoById(index + 1))
      .subscribe((data) => {
        this.edittingTodo = data;
      });

    const todo = {
      item: this.edittingTodo.item,
      flag: !this.edittingTodo.flag,
      todoId: this.edittingTodo.todoId,
    };

    this.store.dispatch(markTodoDone({ todo }));
  }

  /**
   * @function to save a todo after editting
   * @returns void
   */
  saveTodo(): void {
    const todo: TODOS = {
      todoId: this.toDoIndex + 1,
      item: this.todoForm.value.addTodo,
      flag: false,
    };
    this.store.dispatch(editTodo({ todo }));
    this.isEditting = false;
    this.todoForm.reset();
  }

  /**
   * @function to delete a todo
   * @param todoId
   * @returns void
   */
  deleteTodo(todoId: number | undefined): void {
    this.store.dispatch(deleteTodo({ todoId }));
  }

  /**
   * @function that runs when component is destroyed
   * @returns void
   */
  ngOnDestroy(): void {
    this.editedTodoSubscription.unsubscribe();
  }
}
