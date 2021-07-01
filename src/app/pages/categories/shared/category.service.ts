import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

import { Category } from './category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url: string = environment.apiBaseURL;

  private apiPath: string = `${this.url}/api/categories`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Category> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError)
    )
  }

  getById(id: number): Observable<Category> {
    return this.http.get(`${this.apiPath}/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  create(category: Category): Observable<Category> {
    return this.http.post(this.apiPath, category).pipe(
      catchError(this.handleError)
    )
  }

  update(category: Category): Observable<Category> {
    return this.http.put(`${this.apiPath}/${category.id}`, category).pipe(
      catchError(this.handleError)
    )
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiPath}/${id}`).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }

  // Private Methods

  private handleError(error: any): Observable<any> {
    console.log("ERRO NA REQUISIÇÃO => ", error);
    return throwError(error);
  }


}
