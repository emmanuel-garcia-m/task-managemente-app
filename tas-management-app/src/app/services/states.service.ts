import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { State } from '@models/state.model';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatesService {
  private readonly apiUrl = 'assets/db.json';

  private statesSubject = new BehaviorSubject<State[]>([]);
  private statesLoaded = false;

  constructor(private http: HttpClient) {}

  getStates(): Observable<State[]> {
    if (!this.statesLoaded) {
      this.loadStates();
    }
    return this.statesSubject.asObservable();
  }
 
  private loadStates(): void {
    this.http.get<any>(this.apiUrl).pipe(
      map(data => data),
      catchError(error => {          
        return throwError(() => new Error('Error al Consultar el listado de tareas. Por favor, inténtalo de nuevo más tarde.'));
      })
    ).subscribe(states => {
      this.statesSubject.next(states["states"]);
      this.statesLoaded = true;
    });
  }
}
