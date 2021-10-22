import { formatDate } from '@angular/common';
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
  deleted: boolean=false;
  d=new Date();
  stringDate =  this.d.getFullYear()+"/"+ this.addZero(this.d.getUTCMonth().toString()) +"/"+ this.addZero(this.d.getDay().toString());
  todoItem: TodoItem = { id: 0,  list_id: "", description: "", date:this.stringDate, status: "todo", order: "1"};

  todoItems$: Subscription = new Subscription();
  postTodoItem$: Subscription = new Subscription();
  deleteTodoItem$: Subscription = new Subscription();
  todoLists$: Subscription = new Subscription();
  postTodoList$: Subscription = new Subscription();
  putTodoList$: Subscription = new Subscription();
  deleteTodoList$: Subscription = new Subscription();

  errorMessage: string = '';

  constructor(private todoService: TodoService ) { }

  ngOnInit(): void {
    this.getTodoItems()
  }
  getTodoItems() {
    this.todoItems$ = this.todoService.getTodoItems().subscribe(result => this.todoItems = result);
  }

  addTodoItem(){
    if(this.todoItem.description.trim()==""){
      this.errorMessage = "description is leeg"
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
  editTodoList(){
    if(this.todoList.name.trim()==""){
      console.log("name can't be empty!")
    }else{
      this.putTodoList$ = this.todoService.putTodoList(this.todoList.id,this.todoList).subscribe(result => {
        console.log(this.todoList)
      },
      error => {
        this.errorMessage = error.message;
      });
    }
  }
  deleteTodoList(id: number) {
    this.todoItems.forEach(element => {
      if(Number(element.list_id)==id){
        this.todoService.deleteTodoItem(element.id).subscribe(result=>{})
      }
    });
    this.deleteTodoList$ = this.todoService.deleteTodoList(id).subscribe(result => {
      this.deleted=true
    }, error => {
      error
      this.errorMessage = error.message;
    });
  }
  deleteRelatedTodoItems(list_id:number){
    this.todoItems.forEach(element => {
      if(Number(element.list_id)==list_id){
        this.todoService.deleteTodoItem(element.id)
      }
    });
  }
  addZero(str:string){
    if (str.length==1) {
      return "0"+str
    }
    return str
  }
  ngOnDestroy(): void {
    this.todoItems$.unsubscribe();
    this.postTodoItem$.unsubscribe();
    this.deleteTodoItem$.unsubscribe();
  }

}
