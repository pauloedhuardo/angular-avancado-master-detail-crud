import { Injectable, Injector } from '@angular/core';

import { Observable } from 'rxjs';
import { flatMap, catchError, map } from 'rxjs/operators'

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { CategoryService } from '../../categories/shared/category.service';
import { Entry } from './entry.model';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

  apiPath: string = environment.apiBaseURL+"api/entries";

  constructor(protected injector: Injector, private categoryService: CategoryService) {
    super("api/entries", injector);
   }

  create(entry: Entry): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId as number).pipe(
      flatMap(category => {
        entry.category = category;
        return super.create(entry);
      })
    )
  }

  update(entry: Entry): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId as number).pipe(
      flatMap(category => {
        entry.category = category;
        return super.update(entry);
      })
    )
  }

  // Protected Methods

  protected jsonDataToResource(jsonData: any): Entry {
    return Object.assign(new Entry(), jsonData);
  }

}
