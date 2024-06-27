import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ProfessionalExperienceModalComponent } from '../experience-modal/professional-experience-modal.component';
import { selectLanguage } from '../../language.selectors';

declare var bootstrap: any;

@Component({
  selector: 'app-professional-experiences',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatCardModule, MatButtonModule, ProfessionalExperienceModalComponent],
  templateUrl: './professional-experiences.component.html',
  styleUrls: ['./professional-experiences.component.css']
})
export class ProfessionalExperiencesComponent implements OnInit {
  language$: Observable<string>;
  experiences: any[] = [];
  selectedExperience?: any;
  experienceModal: any;

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
      this.loadExperiences(); // Carregar experiências quando o idioma mudar
      this.cdr.detectChanges(); // Forçar detecção de mudanças
    });
  }

  loadExperiences() {
    this.translate.get('professionalExperiences.experiences').subscribe((res: any[]) => {
      this.experiences = res.map((experience: any) => ({
        position: experience.position,
        company: experience.company,
        period: experience.period,
        responsibilities: experience.responsibilities,
        environment: experience.environment
      }));
    });
  }

  openModal(experience: any) {
    this.selectedExperience = experience;
    const modalElement = document.getElementById('experienceModal');
    if (modalElement) {
      this.experienceModal = new bootstrap.Modal(modalElement);
      this.experienceModal.show();
    }
  }

  closeModal() {
    this.selectedExperience = null;
    if (this.experienceModal) {
      this.experienceModal.hide();
    }
    this.cdr.detectChanges(); // Força a detecção de mudanças
  }
}
