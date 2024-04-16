import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Task } from '@models/task.model';
import { LoadingScreenService } from '@services/loading-screen.service';
import { TaskService } from '@services/task.service';
import Swal from 'sweetalert2';
import { TaskFormComponent } from '../../components/task-form/task-form.component';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']  
})
export class TaskListComponent implements OnInit {
  
  public tasks: Task[];
  public visibleTasks: Task[];

  length: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;
  pageSizeOptions = [5];
  
  hidePageSize: boolean = false;
  showPageSizeOptions: boolean = true;
  showFirstLastButtons: boolean = false;
  disabled: boolean = false;

  constructor(private taskService: TaskService,
    private loadingScreenService: LoadingScreenService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
     this.loadTasks();   
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(
        tasks => {
          this.tasks = tasks;
          this.visibleTasks = this.paginate(this.pageSize, this.pageIndex);
          this.length = tasks.length;
        },
        error => {
          this.loadingScreenService.stopLoading();     
          Swal.fire({         
          text: 'Ocurrió un error consultando el listado de tareas',         
          position: "top-end",
          showConfirmButton: false,
          timer: 2500 });  
    });
  }

  paginate(pageSize: number, pageIndex: number) {    
    return this.tasks.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
  }

  handlePageEvent(e: PageEvent) {    
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.visibleTasks = this.paginate(this.pageSize, this.pageIndex);
  }

  createNewTaskEvent(){
    this.openAddTaskModal();
  }

  openAddTaskModal(): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '75%', 
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(newTask => {
      if (newTask) {        
      }
    });
  }
}
