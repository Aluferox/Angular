import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../add-tasks/task.service';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(private _ActivatidRoute:ActivatedRoute, private _Router:Router, private taskService:TaskService) { }

   id;
   taskdelete;
   status;
   priority;

  ngOnInit(): void {
    this._ActivatidRoute.paramMap.subscribe(
      param => {
        this.id = parseInt(param.get('id'));
        this.getTask();

      }
    )
  }

  getTask() {
    this.taskService.getTask(this.id)
    .subscribe(
      (response) => {
        this.taskdelete = response['data'].task;
        this.priority = response['data'].priority
        this.status = response['data'].status
      }
    )
  }

  deleteTask() {
    this.taskService.deleteTask(this.id)
    .subscribe(
      (response) => {
        this._Router.navigate(['add-tasks']);
      }
    )
  }

}
