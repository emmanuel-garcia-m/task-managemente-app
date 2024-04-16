import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '@models/task.model';
import { FormBuilder, Validators } from '@angular/forms';
import { LoadingScreenService } from '@services/loading-screen.service';
import { StatesService } from '@services/states.service';
import Swal from 'sweetalert2';
import { State } from '@models/state.model';
import { TaskService } from '@services/task.service';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})

export class TaskFormComponent implements OnInit { 

  form = this.formBuilder.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    dueDate: [new Date(), [Validators.required]],
    status: ['', [Validators.required]] ,
    notes: this.formBuilder.array([])
  });

  currentStatusList: State[];

  constructor(private dialogRef: MatDialogRef<TaskFormComponent>, 
              private formBuilder: FormBuilder, 
              private loadingScreenService: LoadingScreenService,
              private statesService: StatesService,
              private taskService: TaskService,
              @Inject(MAT_DIALOG_DATA) public data: { task: Task }) { }

  ngOnInit(): void {
    this.loadStatesList();
    if(this.data && this.data.task){
      this.showEditData();
    }
  }
  showEditData() {
    this.form.setValue({
      title: this.data.task.title,
      description: this.data.task.description,
      dueDate: this.data.task.dueDate,
      notes: this.data.task.notes,
      status: ''
      // Establecer más valores según sea necesario
    });   
  }

  loadStatesList(): void {
    this.statesService.getStates().subscribe(
        statuslist => {
          this.currentStatusList = statuslist;          
        },
        error => {
          this.loadingScreenService.stopLoading();     
          Swal.fire({         
          text: 'Ocurrió un error consultando el listado de stados',         
          position: "top-end",
          showConfirmButton: false,
          timer: 2500 });  
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  addNote(): void { 
    if (this.notes.length < 5){
      this.notes.push(this.formBuilder.control(''));
    }     
  }

  removeNote(index: number): void {    
    this.notes.removeAt(index);
  }

  sendTaskForm(){
    if (this.form.valid) {
        this.loadingScreenService.startLoading();
        if(this.data && this.data.task){
          this.editTask(); 
        }
        else{
          this.createNewTask();
        }
    }
    else {
      this.form.markAllAsTouched();
    }
  }

  createNewTask(){
    const taskData = this.form.value;
    const dueDate = taskData.dueDate ? taskData.dueDate : new Date();
    let stateHistory = [];
    stateHistory.push({
      state: 'completed',
      date: new Date()
    });

    let notes: string[] = [];
    if (Array.isArray(taskData.notes)) {
      // Convertir elementos de unknown[] a string[]
      notes = taskData.notes.map((note: any) => note.toString());
    }

    const nuevaTarea: Task = {
      title: this.form.value.title ?? '',
      description: taskData.description ?? '',
      dueDate: dueDate,
      completed: taskData.status == 'closed',
      stateHistory: stateHistory,
      notes: notes,          
    };

    this.taskService.addTask(nuevaTarea);
    this.dialogRef.close();
  }

  editTask(){

  }

  get notes(): any {
    return this.form.get('notes');
  }
}
