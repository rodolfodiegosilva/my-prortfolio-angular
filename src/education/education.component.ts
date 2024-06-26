import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLanguage } from '../language.selectors';

interface Education {
  degree: string;
  institution: string;
  year: string;
}

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  language$: Observable<string>;
  education: Education[] = [];

  constructor(private store: Store, private translate: TranslateService, private cdr: ChangeDetectorRef) {
    this.language$ = this.store.select(selectLanguage);
  }

  ngOnInit() {
    this.language$.subscribe(language => {
      this.translate.use(language);
      this.loadEducation(); // Carregar dados de educação quando o idioma mudar
      this.cdr.detectChanges(); // Forçar detecção de mudanças
    });
  }

  loadEducation() {
    this.translate.get('education.list').subscribe((res: any) => {
      this.education = res.map((edu: any) => ({
        degree: edu.degree,
        institution: edu.institution,
        year: edu.year
      }));
    });
  }
}
