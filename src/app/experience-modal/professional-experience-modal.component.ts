import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

declare var bootstrap: any;

@Component({
  selector: 'app-professional-experience-modal',
  templateUrl: './professional-experience-modal.component.html',
  styleUrls: ['./professional-experience-modal.component.css'],
  standalone: true,
  imports: [CommonModule, TranslateModule]
})
export class ProfessionalExperienceModalComponent {
  @Input() experience: any;

  closeModal(): void {
    const modalElement = document.getElementById('experienceModal');
    if (modalElement) {
      const bsModal = bootstrap.Modal.getInstance(modalElement);
      bsModal.hide();
    }
  }
}
