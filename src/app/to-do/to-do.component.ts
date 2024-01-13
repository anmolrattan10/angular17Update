import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.css',
})
export class ToDoComponent implements OnInit {
  todoList: any = [];
  todoForm!: FormGroup;
  isEditing: boolean = false;
  toDoIndex!: number;

  constructor() {}

  ngOnInit(): void {
    this.todoForm = new FormGroup({
      addTodo: new FormControl(''),
    });
  }

  addTodo() {
    this.todoList.push({ item: this.todoForm.value.addTodo, flag: false });
    this.todoForm.reset();
  }

  editTodo(item: string, index: number) {
    this.isEditing = true;
    this.toDoIndex = index;
    this.todoForm.controls['addTodo'].setValue(item);
  }

  done(index: number) {
    this.todoList[index].flag = !this.todoList[index].flag;
  }

  save() {
    this.todoList[this.toDoIndex].item = this.todoForm.value.addTodo;
    this.isEditing = false;
    this.todoForm.reset();
    this.toDoIndex;
  }

  deleteTodo(index: number) {
    this.todoList.splice(index, 1);
  }
}
