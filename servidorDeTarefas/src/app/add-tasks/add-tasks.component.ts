import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from './task.service';
import { Task } from './task';
import {Router, ActivatedRoute} from '@angular/router'


@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.css']
})
export class AddTasksComponent implements OnInit {

  tasksForm: FormGroup;
  priorityForm: FormGroup;
  tasks = [];
  statusID;
  taskID;
  priorityID;
  inputTask;
  status;
  priority;
  errorMessage;

  displayedColumns = ['task', 'priority', 'status', 'updated', 'delete']

  prioritys= [
    {id:"Alta", name:'Alta'},
    {id:"Média", name:'Média'},
    {id:"Baixa", name:'Baixa'},
  ];

  constructor(private fb:FormBuilder, private taskService:TaskService, private _Activateroute:ActivatedRoute ,private _Router:Router) {}

  ngOnInit(): void {
    this.getAllTask();
    this.tasksForm = this.fb.group({
      task:["", Validators.required],
      priority:[null, Validators.required],
    });

  }

  submit() {
    const task:Task = this.tasksForm.value
    this.taskService.postTask(task)
    .subscribe(
      (response) => {
        console.log(response);

        this.getAllTask();
        this.clearForm();
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    )
  };

  getAllTask() {
    this.taskService.getAllTask()
    .subscribe(
      (response) => {
        this.tasks = response['data'];
      },
      (error) => {
        console.error("Resquest Failed with error");
        this.errorMessage = error;

      }
    )
  };

  updatedTask(row) {
    this._Router.navigate([`updated/${row['id']}`]);
  }

  deleteTask(row){
    this._Router.navigate([`deletetask/${row}`]);
  }

  clearForm() {
    this.tasksForm.reset();
  }

}

