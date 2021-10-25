import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TodoService } from '../todo.service';
import { TodoList } from '../todo_list';
import { ObserverService } from '../observer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  messageReceived: any;
  private newListCreated$: Subscription;
  todoLists: TodoList[]=[];
  todoLists$: Subscription = new Subscription();

  constructor(private todoService: TodoService, private ObserverService: ObserverService) {

    this.newListCreated$= this.ObserverService.getUpdate().subscribe
    (message => {
      this.messageReceived = message;
      this.ngOnInit();
    });
   }

  ngOnInit(): void {
    this.todoLists$=this.todoService.getTodoLists().subscribe( todoLists=>
      this.todoLists= todoLists.sort((n1,n2) => n2.id - n1.id)
    )
  }
  ngOnDestroy() {
    this.todoLists$.unsubscribe();
    this.newListCreated$.unsubscribe();
}

}
