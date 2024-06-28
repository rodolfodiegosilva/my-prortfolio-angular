import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

declare var bootstrap: any;

interface Course {
  name: string;
  provider: string;
  issued: string;
  credentialUrl?: string;
  skills: string[];
}

interface Technology {
  name: string;
  courses: Course[];
}

@Component({
  selector: 'app-technology-modal',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './technology-modal.component.html',
  styleUrls: ['./technology-modal.component.css'],
})
export class TechnologyModalComponent {
  @Input() technology?: Technology;

  closeModal() {
    const modalElement = document.getElementById('technologyModal');
    if (modalElement) {
      const bsModal = bootstrap.Modal.getInstance(modalElement);
      bsModal.hide();
    }
  }
}
