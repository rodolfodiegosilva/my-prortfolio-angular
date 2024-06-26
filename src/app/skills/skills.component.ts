import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLanguage } from '../language.selectors';

interface Skill {
  name: string;
  description: string;
  level: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  language$: Observable<string>;
  skills: Skill[] = [];

  constructor(private store: Store, private translate: TranslateService, private cdr: ChangeDetectorRef) {
    this.language$ = this.store.select(selectLanguage);
  }

  ngOnInit() {
    this.language$.subscribe(language => {
      this.translate.use(language);
      this.loadSkills(); // Carregar habilidades quando o idioma mudar
      this.cdr.detectChanges(); // Forçar detecção de mudanças
    });
  }

  loadSkills() {
    this.translate.get('skills.list').subscribe((res: any) => {
      this.skills = res.map((skill: any) => ({
        name: skill.name,
        description: skill.description,
        level: skill.level
      }));
    });
  }
}
