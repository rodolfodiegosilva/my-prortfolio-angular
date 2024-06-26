import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

declare var bootstrap: any;

interface Project {
  name: string;
  description: string;
  image: string;
  technologies?: string[];
  link?: string;
  frontend?: string;
  backend?: string;
  images?: string[];
}

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.css'],
  standalone: true,
  imports: [CommonModule, TranslateModule],
})
export class ProjectModalComponent implements OnInit {
  @Input() project!: Project; // Use o operador de asserção `!`

  ngOnInit(): void {
    const modalElement = document.getElementById('projectModal');
    if (modalElement) {
      new bootstrap.Modal(modalElement);
    }
  }

  closeModal(): void {
    const modal = document.getElementById('projectModal');
    if (modal) {
      const bsModal = bootstrap.Modal.getInstance(modal);
      bsModal.hide();
    }
  }
}
