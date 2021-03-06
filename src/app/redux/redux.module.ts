import { ProfileResultsEffects } from './effects/profile-results.effect';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  StoreModule,
} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
// import { QuestionEffects } from './effects/questions.effects';
import * as fromQuestions from '../redux/reducers/questions.reducers';
import { authFeatureKey, authReducer } from './reducers/user.reducers';
import { AuthEffects } from './effects/user.effects';
import { State } from 'src/app/redux/models/app.state';
import { localStorageSync } from 'ngrx-store-localstorage';
import * as fromProfileResultSelectors from './selectors/profile-results.selectors';
import * as fromProfileResults from './reducers/profile-results.reducer';
import { testsFeatureKey, testsReducer } from './reducers/tests.reducers';
import { TestsEffects } from './effects/tests.effects';
import { getAllQuestionsEffects } from './effects/get-all-questions.effects';
import { getAllQuestionsFeatureKey, getAllQuestionsReducer } from './reducers/get-all-questions.reducers';

const reducers: ActionReducerMap<State> = {
  auth: authReducer,
  allQuestions: getAllQuestionsReducer,
  tests: testsReducer
};

export function localStorageSyncReducer(
  reducer: ActionReducer<State>
): ActionReducer<State> {
  return localStorageSync({
    keys: ['auth', 'allQuestions', 'tests'],
    rehydrate: true,
  })(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      // QuestionEffects,
      AuthEffects,
      ProfileResultsEffects,
      TestsEffects,
      getAllQuestionsEffects,
    ]),
    StoreModule.forFeature(
      fromProfileResultSelectors.featureKey,
      fromProfileResults.reducer
    ),
    StoreModule.forFeature(
      fromQuestions.questionsFeatureKey,
      fromQuestions.questionListReducer
    ),
    StoreModule.forFeature(authFeatureKey, authReducer),
    StoreModule.forFeature(testsFeatureKey, testsReducer),
    StoreModule.forFeature(getAllQuestionsFeatureKey, getAllQuestionsReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    HttpClientModule,
  ],
})
export class ReduxModule {}
