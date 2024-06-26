import { createReducer, on, Action } from '@ngrx/store';
import { setLanguage } from './language.actions';

export interface LanguageState {
  language: string;
}

export const initialState: LanguageState = {
  language: 'en',
};

const _languageReducer = createReducer(
  initialState,
  on(setLanguage, (state, { language }) => ({ ...state, language }))
);

export function languageReducer(state: LanguageState | undefined, action: Action) {
  return _languageReducer(state, action);
}