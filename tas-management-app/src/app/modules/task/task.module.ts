import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { TaskComponent } from './components/task/task.component';
import { TaskRoutingModule } from './task-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { TaskListHeaderComponent } from './components/task-list-header/task-list-header.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TaskListComponent,
    TaskComponent,
    TaskListHeaderComponent,
    TaskFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TaskRoutingModule,
    ReactiveFormsModule
  ]
})
export class TaskModule { }
