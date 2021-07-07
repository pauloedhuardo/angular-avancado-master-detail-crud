import {Directive, OnInit } from '@angular/core';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

@Directive()
export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  resources: T[];

  constructor(protected resourceService: BaseResourceService<T>) { }

  ngOnInit(): void {
    this.resourceService.getAll().subscribe(
      resources => this.resources = resources.sort((a,b) => (b.id as number) - (a.id as number)),
      error => alert('Erro ao carregar a lista')
    )
  }

  delete(resource: T) {
    const mustDelete = confirm('Deseja realmente excluir este ítem?');
    if(mustDelete) {
      this.resourceService.delete(resource.id).subscribe(
        () => this.resources = this.resources.filter(element => element != resource),
        () => alert('Erro ao tentar excluir')
      )
    }
  }

}
