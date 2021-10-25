import { Injectable } from '@angular/core';
import { TodoItem } from './todo_item';
import { TodoList } from './todo_list';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
      baseUrl:string ="http://localhost:3000";
      constructor(private httpClient: HttpClient) {
      }
      getTodoLists() {
        return this.httpClient.get<TodoList[]>(this.baseUrl+"/lists");
      }

      getTodoItems(): Observable<TodoItem[]> {
        return this.httpClient.get<TodoItem[]>(this.baseUrl+"/items");
      }
      getTodoItemsByList(id: number): Observable<TodoItem[]> {
        return this.httpClient.get<TodoItem[]>(this.baseUrl+"/items?list_id="+id);
      }

      postTodoList(todoList: TodoList) {
        return this.httpClient.post<TodoList>(this.baseUrl+"/lists",todoList)
      }
      postTodoItem(todoItem: TodoItem) {
        return this.httpClient.post<TodoItem>(this.baseUrl+"/items",todoItem)
      }

      putTodoItem(id:number, todoItem: TodoItem): Observable<TodoItem> {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');

        return this.httpClient.put<TodoItem>(this.baseUrl+"/items/" + id, todoItem, {headers: headers});
      }
      async putTodoItemAsync(id:number, todoItem: TodoItem) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');

        this.httpClient.put<TodoItem>(this.baseUrl+"/items/" + id, todoItem, {headers: headers});
      }
      //putTodoItems(todoItems: TodoItem[]): Observable<TodoItem[]>{
        //let headers = new HttpHeaders();
        //var results: any[]= [] ;
        //headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        //todoItems.forEach(todoItem => {
          //results.push(this.httpClient.put<TodoItem>(this.baseUrl+"/items/" + todoItem.id, todoItem, {headers: headers}))
        //});
        //return of(results);
      //}
      putTodoList(id:number, todoList: TodoList): Observable<TodoList> {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');

        return this.httpClient.put<TodoList>(this.baseUrl+"/lists/" + id, todoList, {headers: headers});
      }

      deleteTodoItem(id: number) : Observable<TodoItem> {
        return this.httpClient.delete<TodoItem>(this.baseUrl+"/items/"+id)
      }
      deleteTodoList(id: number) : Observable<TodoList> {
        return this.httpClient.delete<TodoList>(this.baseUrl+"/lists/"+id)
      }
    }

