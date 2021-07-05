import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'finansys';

  constructor(private config: PrimeNGConfig, private translateService: TranslateService) {}

  ngOnInit() {
      this.translateService.setDefaultLang('ptBR');
  }

  translate(lang: string) {
      this.translateService.use(lang);
      this.translateService.get('primeng').subscribe(res => this.config.setTranslation(res));
  }

}
