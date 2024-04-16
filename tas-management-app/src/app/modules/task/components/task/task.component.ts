import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { Task } from '@models/task.model';
import { TaskService } from '@services/task.service';
import Swal from 'sweetalert2';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
 
})
export class TaskComponent implements OnInit{ 
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @Input() task: Task;

  public completed = false;

  constructor(private taskService: TaskService,
              private dialog: MatDialog
  ){

  }
  ngOnInit(): void {
    this.completed =  this.task.completed;
  }

  setAsComplete(completed: boolean){
    this.completed = completed;
  }

  editTask(){
    this.openEditModal(this.task);
  }

  openEditModal(task: Task): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      data: { task: task },
      width: '75%', 
      disableClose: true
    }); 
  }

  deleteTask(){
    Swal.fire({
      title: "Confirmación de eliminación",
      text: "¿Estás seguro de eliminar la tarea seleccionada?",
      showDenyButton: true,      
      confirmButtonText: "Si",      
      denyButtonText: "No"
    }).then((result) => {      
      if (result.isConfirmed) {
        this.taskService.deleteTask(this.task);
      } 
    });    
  }
}
