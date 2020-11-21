import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../list-todos/list-todos.component';
import { TodoDataService } from '../service/data/todo-data.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id: number;
  todo: Todo;

  constructor(
    private todoService: TodoDataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.todo = new Todo(this.id, 'sunny', '', false, new Date());
    if (this.id != -1) {
      this.todoService.retriveTodo('sunny', this.id).subscribe(
        data => this.todo = data
      );
    }
  }

  saveTodo() {
    if (this.id == -1) {
      this.todoService.createTodo('sunny', this.todo).subscribe(
        data => {
          this.router.navigate(['todos']);
          console.log(data);
        }
      );
    } else {
      this.todoService.updateTodo('sunny', this.id, this.todo).subscribe(
        data => {
          this.router.navigate(['todos']);
          console.log(data);
        }
      );
    }
  }

}
