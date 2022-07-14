import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTasksComponent } from './add-tasks/add-tasks.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import {LoginComponent } from './login/login.component';
import { UpdatedTaskComponent } from './updated-task/updated-task.component';
import { DeleteComponent } from './delete/delete.component';


const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'add-tasks', component:AddTasksComponent},
  {path:'login', component:LoginComponent},
  {path:'updated/:id',component:UpdatedTaskComponent},
  {path:'deletetask/:id',component:DeleteComponent},
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'**', component:ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
