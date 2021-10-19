
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
  @Input() todoItem: TodoItem = {id: 0, list_id: "", description: "", date: "", status: "", order: ""};
  @Input() list_id:string="";
  errorMessage: string = "";

  todoItem$: Subscription = new Subscription();
  putTodoItem$: Subscription = new Subscription();

  constructor(private todoService: TodoService) {
   }

  ngOnInit(): void {

  }

  changeStatus() {
    if(this.todoItem.status=="todo"){
      this.todoItem.status="done"
    }else{
      this.todoItem.status="todo"
    }
    this.editTodoItem()
  }

  editTodoItem(){
    if(this.todoItem.description.trim()==""){
      this.errorMessage = "description cant be empty!"
    }else{
      this.errorMessage=""
      this.putTodoItem$ = this.todoService.putTodoItem(this.todoItem.id,this.todoItem).subscribe(result => {
        console.log(this.todoItem)
      },
      error => {
        this.errorMessage = error.message;
      });
    }
  }
  editTodoItemDate(){
      this.putTodoItem$ = this.todoService.putTodoItem(this.todoItem.id,this.todoItem).subscribe(result => {
        console.log(this.todoItem)
      },
      error => {
        console.log(error.message);
      });
  }
  ngOnDestroy(): void {
    this.todoItem$.unsubscribe();
    this.putTodoItem$.unsubscribe();
  }

}
