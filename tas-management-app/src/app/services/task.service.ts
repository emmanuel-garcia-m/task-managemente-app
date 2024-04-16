import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { State } from '@models/state.model';
import { Task } from '@models/task.model';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly apiUrl = 'assets/db.json'; 
  
  private tasksSubject$ = new BehaviorSubject<Task[]>([]); 

  constructor(private http: HttpClient) {
    this.loadTasks();   
  }

  getTasks(): Observable<Task[]> {
    return this.tasksSubject$.asObservable();
  }

  // Método para cargar las tareas desde el archivo JSON
  loadTasks(): void {
    this.http.get<any>(this.apiUrl).pipe(
      map(data => data),
      catchError(error => {       
        return throwError(() => new Error('Error al Consultar el listado de tareas. Por favor, inténtalo de nuevo más tarde.'));
      })   
    ).subscribe(tasks => {
      this.tasksSubject$.next(tasks['tasks']);
    });
  }

  // Método para agregar una nueva tarea
  addTask(newTask: Task): void {
    const tasks = this.tasksSubject$.getValue();
    tasks.push(newTask);
    this.tasksSubject$.next(tasks);
    this.saveTasksToDb(tasks);
  }

  // Método para eliminar una tarea
  deleteTask(taskToDelete: Task): void {
    const tasks = this.tasksSubject$.getValue().filter(task => task !== taskToDelete);
    this.tasksSubject$.next(tasks);
    this.saveTasksToDb(tasks);
  }

  // Método para actualizar una tarea
  updateTask(updatedTask: Task): void {
    const tasks = this.tasksSubject$.getValue().map(task => task.title === updatedTask.title ? updatedTask : task);
    this.tasksSubject$.next(tasks);
    this.saveTasksToDb(tasks);
  }

  // Aqui debería sobreescribir el archivo o enviar a guardar en el backend
  private saveTasksToDb(tasks: Task[]): void {
   
  }
}
