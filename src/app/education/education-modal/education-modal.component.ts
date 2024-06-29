import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

declare var bootstrap: any;

interface Education {
  degree: string;
  institution: string;
  year: string;
  description?: string;
}

@Component({
  selector: 'app-education-modal',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './education-modal.component.html',
  styleUrls: ['./education-modal.component.css'],
})
export class EducationModalComponent {
  @Input() education?: Education;

  closeModal() {
    const modalElement = document.getElementById('educationModal');
    if (modalElement) {
      const bsModal = bootstrap.Modal.getInstance(modalElement);
      bsModal.hide();
    }
  }
}
