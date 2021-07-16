import { LeftLayoutComponent } from './components/left-layout/left-layout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LanguageSelectComponent } from './components/language-select/language-select.component';
import { SafePipe } from './pipes/safe.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { AuthDirective } from './directives/auth.directive';

import { ButtonComponent } from './components/buttons/button/button.component';
import { ButtonsStylingDirective } from './directives/buttons-styling.directive';
import { TimerComponent } from './components/timer/timer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HeaderComponent } from './components/header/header.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ErrorComponent } from '../pages/error/error.component';
import { RouterModule, Routes } from '@angular/router';
import { GrammarComponent } from '../modules/grammar/grammar.component';
import { ListeningComponent } from '../modules/listening/listening.component';
import { WritingComponent } from '../modules/writing/writing.component';
import { SpeakingComponent } from '../modules/speaking/speaking.component';
import { CountdownModule } from 'ngx-countdown';

const routes: Routes = [
  { path: 'grammar', component: GrammarComponent },
  { path: 'listening', component: ListeningComponent },
  { path: 'writing', component: WritingComponent },
  { path: 'speaking', component: SpeakingComponent },
];

@NgModule({
  declarations: [
    LanguageSelectComponent,
    LeftLayoutComponent,
    SafePipe,
    CapitalizePipe,
    AuthDirective,
    ButtonComponent,
    ButtonsStylingDirective,
    TimerComponent,
    NavigationComponent,
    HeaderComponent,
    ProgressBarComponent,
    FooterComponent,
    ErrorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    CountdownModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ButtonComponent,
    ButtonsStylingDirective,
    TimerComponent,
    HeaderComponent,
    ProgressBarComponent,
    LeftLayoutComponent,
    HeaderComponent,
    FooterComponent,
    ErrorComponent,
  ],
})
export class SharedModule {}
