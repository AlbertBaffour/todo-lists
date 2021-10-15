import { Component,Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoService } from '../todo.service';
import { TodoItem } from '../todo_item';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todoItem: TodoItem = {id: 0, list_id: "", description: "", date: new Date(), status: "", order: ""};
  @Input() list_id:string="";
  errorMessage: string = "";

  todoItem$: Subscription = new Subscription();
  putTodoItem$: Subscription = new Subscription();

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

  changeStatus() {
    if(this.todoItem.status=="todo"){
      this.todoItem.status="done"
    }else{
      this.todoItem.status="todo"
    }
  }

  ngOnDestroy(): void {
    this.todoItem$.unsubscribe();
    this.putTodoItem$.unsubscribe();
  }
}
