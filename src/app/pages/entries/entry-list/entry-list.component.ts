import { Component, OnInit } from '@angular/core';
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  entries: Entry[];

  constructor(private service: EntryService) { }

  ngOnInit(): void {
    this.service.getAll().subscribe(
      entries => this.entries = entries,
      error => alert('Erro ao carregar a lista')
    )
  }

  delete(entry: Entry) {
    const mustDelete = confirm('Deseja realmente excluir este ítem?');
    if(mustDelete) {
      this.service.delete(entry.id).subscribe(
        () => this.entries = this.entries.filter(element => element != entry),
        () => alert('Erro ao tentar excluir')
      )
    }
  }

}
