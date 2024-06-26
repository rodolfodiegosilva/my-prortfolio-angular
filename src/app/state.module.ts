import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { languageReducer } from './language.reducer';

@NgModule({
  imports: [
    StoreModule.forRoot({}),
    StoreModule.forFeature('language', languageReducer),
    EffectsModule.forRoot([])
  ]
})
export class StateModule { }
