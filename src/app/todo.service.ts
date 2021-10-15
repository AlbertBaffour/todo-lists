import { Injectable } from '@angular/core';
import { TodoItem } from './todo_item';
import { TodoList } from './todo_list';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

      constructor(private httpClient: HttpClient) {
      }
      getTodoLists(): Observable<TodoList[]> {
        return this.httpClient.get<TodoList[]>("http://localhost:3000/lists");
      }

      getTodoItems(): Observable<TodoItem[]> {
        return this.httpClient.get<TodoItem[]>("http://localhost:3000/items");
      }

      postTodoList(todoList: TodoList) {
        return this.httpClient.post<TodoList>("http://localhost:3000/lists",todoList)
      }
      postTodoItem(todoItem: TodoItem) {
        return this.httpClient.post<TodoItem>("http://localhost:3000/items",todoItem)
      }

      putTodoItem(id:number, todoItem: TodoItem): Observable<TodoItem> {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');

        return this.httpClient.put<TodoItem>("http://localhost:3000/items/" + id, todoItem, {headers: headers});
      }
      putTodoList(id:number, todoList: TodoList): Observable<TodoList> {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');

        return this.httpClient.put<TodoList>("http://localhost:3000/lists/" + id, todoList, {headers: headers});
      }

      deleteTodoItem(id: number) : Observable<TodoItem> {
        return this.httpClient.delete<TodoItem>("http://localhost:3000/items/"+id)
      }
      deleteTodoList(id: number) : Observable<TodoList> {
        return this.httpClient.delete<TodoList>("http://localhost:3000/lists/"+id)
      }

//      checkOrUnCheckTitle($key: string, flag: boolean) {
  //      this.httpClient.update($key, { isChecked: flag });
    //  }

      //removeTitle($key: string) {
        //this.toDoList.remove($key);
      //}
    }

