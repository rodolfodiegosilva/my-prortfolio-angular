import { Component, Output, EventEmitter, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setLanguage } from '../language.actions';
import { selectLanguage } from '../language.selectors';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './app-toggle-button.component.html',
  styleUrls: ['./app-toggle-button.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class AppToggleButtonComponent {
  @Output() languageChanged = new EventEmitter<boolean>();
  isEnglish: boolean = true;
  language$: Observable<string>;

  constructor(private store: Store, private ngZone: NgZone) {
    this.language$ = this.store.select(selectLanguage);
    this.language$.subscribe((language) => {
      this.ngZone.run(() => {
        this.isEnglish = language === 'en';
      });
    });
  }

  toggleLanguage() {
    this.ngZone.run(() => {
      this.isEnglish = !this.isEnglish;
      const lang = this.isEnglish ? 'en' : 'pt';
      this.store.dispatch(setLanguage({ language: lang }));
      this.languageChanged.emit(this.isEnglish);
    });
  }
}
