import { DatePipe, formatDate, getLocaleDateFormat } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TodoService } from '../todo.service';
import { TodoItem } from '../todo_item';
import { TodoList } from '../todo_list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @Input() todoList: TodoList = {id: 0, name: "", category: ""};
  @Input() list_id:string="";
  todoItems: TodoItem[] = [];
  todoItem: TodoItem = { id: 0,  list_id: "", description: "", date: new Date(), status: "todo", order: "1"};

  todoItems$: Subscription = new Subscription();
  postTodoItem$: Subscription = new Subscription();
  deleteTodoItem$: Subscription = new Subscription();

  errorMessage: string = '';

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getTodoItems()
  }
  getTodoItems() {
    this.todoItems$ = this.todoService.getTodoItems().subscribe(result => this.todoItems = result);
  }
  addTodoItem(){
    if(this.todoItem.description.trim()==""){
      this.errorMessage = "new todo item required!"
    }else{
      this.errorMessage=""
      this.todoItem.list_id=this.todoList.id.toString()
      this.postTodoItem$ = this.todoService.postTodoItem(this.todoItem).subscribe(result => {
        console.log(this.todoItem)
        this.getTodoItems()
      },
      error => {
        this.errorMessage = error.message;
      });
    }
  }
  deleteTodoItem(id: number) {
    this.deleteTodoItem$ = this.todoService.deleteTodoItem(id).subscribe(result => {
      this.getTodoItems()
    }, error => {
      //error
      this.errorMessage = error.message;
    });
  }
  ngOnDestroy(): void {
    this.todoItems$.unsubscribe();
    this.postTodoItem$.unsubscribe();
    this.deleteTodoItem$.unsubscribe();
  }
}
