export class Task {
  constructor(taskID:number, task:string, priority:string, status:string) {
    this.id = taskID;
    this.task = task;
    this.priority = priority;
    this.status = status
  }
  id:number;
  task:string;
  priority:string;
  status :string;
}