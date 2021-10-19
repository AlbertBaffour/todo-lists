import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TodoService } from '../todo.service';
import { TodoList } from '../todo_list';
import { ObserverService } from '../observer.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  todoList:TodoList={id:0 ,name: "",category: "#245561"}
  submitted = false;
  errorMessage= "";
  @ViewChild('closebutton') closebutton: any;

  postTodoList$: Subscription = new Subscription();

//Form Validables
createListForm: FormGroup=new FormGroup({
  name: new FormControl(''),
  category:  new FormControl(''),
});;

constructor( private ObserverService: ObserverService,private formBuilder: FormBuilder,private todoService: TodoService){
}
 //form actions
get f() { return this.createListForm.controls; }
onSubmit() {

  this.submitted = true;
  //form is invalid
  if (this.createListForm.invalid) {
      return;
  }
  //all good
  if(this.submitted)
  {
    this.postTodoList$= this.todoService.postTodoList(this.todoList).subscribe(result => {
      //all went well
      //reset params
      this.submitted=false
      this.todoList ={id:0 ,name: "",category: "#245561"}
      //close modal
      this.closebutton.nativeElement.click();
      //update observers
      this.sendMessage();
    },
    error => {
      this.errorMessage = error.message;
    });
  }
}
  ngOnInit() {
 // validations
  this.createListForm = this.formBuilder.group({
  name: ['', [Validators.required]],
  category: ['', [Validators.required]],
  });
}
sendMessage(): void {
  this.ObserverService.sendUpdate('newlist');
}
}
