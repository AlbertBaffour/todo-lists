import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoService } from '../todo.service';
import { TodoList } from '../todo_list';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  todoLists$: Observable<TodoList[]> = new Observable<TodoList[]>();

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoLists$=this.todoService.getTodoLists()
  }

}
