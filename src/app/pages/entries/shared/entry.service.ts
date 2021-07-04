import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

import { Entry } from './entry.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  url: string = environment.apiBaseURL;

  private apiPath: string = `${this.url}/api/entries`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Entry[]> {
    return this.http.get<Entry[]>(this.apiPath);

  }

  getById(id: number): Observable<Entry> {
    return this.http.get(`${this.apiPath}/${id}`).pipe(
      catchError(this.handleError),
      map( response => {return response})
    )
  }

  create(entry: Entry): Observable<Entry> {
    return this.http.post(this.apiPath, entry).pipe(
      catchError(this.handleError),
      map( response => {return response})
    )
  }

  update(entry: Entry): Observable<Entry> {
    return this.http.put(`${this.apiPath}/${entry.id}`, entry).pipe(
      catchError(this.handleError),
      map( response => {return response})
    )
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.apiPath}/${id}`).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }

  // Private Methods

  private handleError(error: any): Observable<any> {
    console.log('ERRO NA REQUISIÇÃO => ', error);
    return throwError(error);
  }


}
