import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ProjectModalComponent implements OnInit {
  @Input() project: any;

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
