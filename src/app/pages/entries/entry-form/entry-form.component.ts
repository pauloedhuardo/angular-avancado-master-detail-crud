import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { switchMap } from 'rxjs/operators';

import currencyFormatter from 'currency-formatter';

import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';

import { BaseResourceFormComponent } from '../../../shared/components/base-resource-form/base-resource-form.component';
import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent extends BaseResourceFormComponent<Entry> implements OnInit {

  categories: Array<Category>;

  imaskConfig = {
    mask: Number,
    umask: true,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ',',
    mapToRadix: ['.']
  }
  
  constructor(
    protected entryService: EntryService,
    protected categoryService: CategoryService,
    protected injector: Injector
  ) {
    super(injector, new Entry(), entryService, Entry.fromJson);
   }

   ngOnInit(){
     this.loadCategories();
     super.ngOnInit();
   }

  get typeOptions(): Array<any> {
    return Object.entries(Entry.types).map(
      ([value, text]) => {
        return {
          text: text,
          value: value
        }
      }
    )
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: ['expense', [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [true, [Validators.required]],
      categoryId: [null, [Validators.required]]
    });
  }

  protected loadCategories() {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories
    )
  }

  protected loadResource() {
    if(this.currentAction == 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.resourceService.getById(+params.get('id')!))
      )
      .subscribe(
        (resource) => {
          this.resource = resource;
          this.resourceForm.setValue({'id': resource.id, 'name': resource.name, 'description': resource.description, 'type': resource.type,
                                       'amount': resource.amount as string, 'date': resource.date, 'paid': resource.paid, 'categoryId': resource.category?.id})
        },
        (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
      )
    }
  }

  protected creationPageTitle(): string {
    return 'Cadastro de Novo Lançamento';
  }

  protected editionPageTitle(): string {
    const categoryName = this.resource.name || '';
    return "Editando Lançamento: " + this.resource.name;
  }

}