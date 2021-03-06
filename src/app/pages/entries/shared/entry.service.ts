import { Injectable, Injector } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators'

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { CategoryService } from '../../categories/shared/category.service';
import { Entry } from './entry.model';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

  apiPath: string = environment.apiBaseURL+"api/entries";

  constructor(protected injector: Injector, private categoryService: CategoryService, protected http: HttpClient) {
    super("api/entries", injector, Entry.fromJson);
   }

  create(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToServer(entry, super.create.bind(this));
  }

  update(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToServer(entry, super.update.bind(this));
  }

  getByMonthAndYear(month: number, year: number): Observable<Entry[]> {
    return this.http.get<Entry[]>(`${this.apiPath}/${month}/${year}`);
  }

  private setCategoryAndSendToServer(entry: Entry, sendFn: any): Observable<any> {
    return this.categoryService.getById(entry.categoryId as number).pipe(
      mergeMap(category => {
        entry.category = category;
        return sendFn(entry);
      }),
      catchError(this.handleError)
    )
  }

  

}
