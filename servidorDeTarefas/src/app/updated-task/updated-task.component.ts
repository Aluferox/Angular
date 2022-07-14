import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../add-tasks/task.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Task } from '../add-tasks/task';



@Component({
  selector: 'app-updated-task',
  templateUrl: './updated-task.component.html',
  styleUrls: ['./updated-task.component.css']
})
export class UpdatedTaskComponent implements OnInit {

  constructor(private _Activateroute:ActivatedRoute ,private _Router:Router, private taskService:TaskService, private fb: FormBuilder) { }
  sub;
  id:number;
  taskUpdated = [];
  taskUpdatedForm:FormGroup;

  prioritys= [
    {id:"Alta", name:'Alta'},
    {id:"Média", name:'Média'},
    {id:"Baixa", name:'Baixa'},
  ];

  statusTask = [
    {id:'em_andamento', name:'Em Andamento'},
    {id:'pendente', name:'Pendente'},
    {id:'concluída', name:'Concluída'},
  ]
  ngOnInit(): void {
    this._Activateroute.paramMap.subscribe(
      param => {
        this.id = parseInt(param.get('id'));
        this.getTask(this.id);
      }
    )
    this.taskUpdatedForm = this.fb.group({
      task:["", Validators.required],
      priority:[null, Validators.required],
      status:[null, Validators.required]
    })

  }

  getTask(id:number) {
   this.taskService.getTask(id)
    .subscribe(
      (response) => {
        this.taskUpdated = response['data'];

      }
    )
  }

  updatedTask() {
    const updatedTask:Task = this.taskUpdatedForm.value
    console.log(this.taskUpdatedForm.value);


    this.taskService.patchTask(this.id, updatedTask)
    .subscribe(
      (response) =>{
        this._Router.navigate(['add-tasks'])
      }
    )

  }
}




