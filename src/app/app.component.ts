import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setLanguage } from './language.actions';
import { selectLanguage } from './language.selectors';
import { PersonalDataComponent } from './personal-data/personal-data.component';
import { ProfileComponent } from './profile/profile.component';
import { SkillsComponent } from './skills/skills.component';
import { EducationComponent } from './education/education.component';
import { ProjectsComponent } from './projects/projects.component';
import { GithubDashboardComponent } from './github-dashboard/github-dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { ProfessionalExperiencesComponent } from './rofessional-experiences/professional-experiences.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TranslateModule,
    PersonalDataComponent,
    ProfileComponent,
    SkillsComponent,
    EducationComponent,
    ProjectsComponent,
    GithubDashboardComponent,
    NavbarComponent,
    FooterComponent,
    ProfessionalExperiencesComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  language$: Observable<string>;

  constructor(
    private store: Store,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) {
    this.language$ = this.store.select(selectLanguage);
  }

  ngOnInit() {
    this.language$.subscribe((language) => {
      this.translate.use(language);
      this.cdr.detectChanges(); // Forçar detecção de mudanças
    });
  }

  changeLanguage(language: string) {
    this.store.dispatch(setLanguage({ language }));
  }
}
