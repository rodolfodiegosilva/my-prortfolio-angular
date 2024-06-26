import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-personal-data',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent {

  constructor(private translate: TranslateService) { }
}
