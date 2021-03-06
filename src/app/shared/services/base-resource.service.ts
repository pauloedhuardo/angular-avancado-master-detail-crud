import { BaseResourceModel } from "../models/base-resource.model";

import { Injector } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

export abstract class BaseResourceService<T extends BaseResourceModel> {

    urlApi: string;

    protected http: HttpClient;

    constructor(
        protected urlApiResource: string, 
        protected injector: Injector, 
        protected jsonDataToResourceFn: (jsonData: any) => T
    ) 
    { 
        this.http = injector.get(HttpClient);
        this.urlApi = environment.apiBaseURL+this.urlApiResource;
    }

    getAll(): Observable<T[]> {
        return this.http.get<T[]>(this.urlApi);
    }
    
    getById(id: number): Observable<T> {
        return this.http.get(`${this.urlApi}/${id}`).pipe(
            map( response => { return this.jsonDataToResource(response) }),
            catchError(this.handleError)
        )
    }
    
    create(resource: T): Observable<T> {
        return this.http.post(this.urlApi, resource).pipe(
            map( response => { return this.jsonDataToResource(response) }),
            catchError(this.handleError)
        )
    }

    update(resource: T): Observable<T> {
        return this.http.put(`${this.urlApi}/${resource.id}`, resource).pipe(
            map( response => { return this.jsonDataToResource(response) }),
            catchError(this.handleError)
        )
    }

    delete(id: any): Observable<any> {
        return this.http.delete(`${this.urlApi}/${id}`).pipe(
            map(() => null),
            catchError(this.handleError)
        )
    }

    // Protected Methods

    protected jsonDataToResource(jsonData: any): T {
        return this.jsonDataToResourceFn(jsonData);
    }

    protected handleError(error: any): Observable<any> {
        console.log('ERRO NA REQUISIÇÃO => ', error);
        return throwError(error);
    }

}