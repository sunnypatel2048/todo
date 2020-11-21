import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { $ } from 'protractor';
import { stringify } from 'querystring';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { TodoDataService } from '../service/data/todo-data.service';

export class Todo {
  constructor(
    public id: number,
    public username: string,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ) { }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  // todos = [
  //   new Todo(1, 'sunny', 'Do task A', false, new Date()),
  //   new Todo(2, 'sunny', 'Do task B', true, new Date()),
  //   new Todo(3, 'sunny', 'Do task C', false, new Date()),
  //   new Todo(4, 'sunny', 'Do task D', true, new Date()),
  //   new Todo(5, 'sunny', 'Do task E', false, new Date()),
  //   new Todo(6, 'sunny', 'Do task F', false, new Date()),
  //   new Todo(7, 'sunny', 'Do task G', false, new Date()),
  // ]

  todos: Todo[];
  message: string;

  constructor(
    private todoService: TodoDataService,
    private router: Router,
    private basicAuthenticationService: BasicAuthenticationService
  ) { }

  ngOnInit(): void {
    this.refreshTodos();
  }

  refreshTodos() {
    let username = this.basicAuthenticationService.getAuthenticatedUser();
    this.todoService.retriveAllTodos(username).subscribe(
      response => {
        this.todos = response;
      }
    );
  }

  deleteTodo(id) {
    let username = this.basicAuthenticationService.getAuthenticatedUser();
    this.todoService.deleteTodo(username, id).subscribe(
      response => {
        this.refreshTodos();
        this.message = 'Todo item successfully deleted!';
        console.log(response);
      }
    )
  }

  updateTodo(id) {
    this.router.navigate(['todos', id]);
  }

  addTodo() {
    this.router.navigate(['todos', -1]);
  }

}