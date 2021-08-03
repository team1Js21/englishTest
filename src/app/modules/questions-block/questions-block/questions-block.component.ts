import {
  LISTENING_PATH,
  QUESTION_LISTENING_PATH,
  WRITING_PATH,
} from 'src/app/app-routing.constants';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Question } from '../../../core/models/questions.model';
import { QuestionsLoadingService } from '../questions-loading.service';
import { getQuestions } from 'src/app/redux/selectors/questions.selectors';
import {
  GRAMMAR_PATH,
  QUESTION_GRAMMAR_PATH,
} from '../../../app-routing.constants';
import { QuestionsSyncService } from 'src/app/core/services/questions-sync.service';

import { QueryHandler } from 'src/app/core/models/query-handler.model';
import { QuestionsState } from 'src/app/redux/models/questions.state.model';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
@Component({
  selector: 'app-questions-block',
  templateUrl: './questions-block.component.html',
  styleUrls: ['./questions-block.component.scss'],
  providers: [QuestionsLoadingService, QuestionsSyncService],
})
export class QuestionsBlockComponent implements OnInit {
  question: Question[] = [];

  questionsList: Question[] = [];
  questions$: Observable<Question[]> | undefined;

  index = 0;
  navigateTo = '';

  listeningBlockIsActive: boolean = false;

  constructor(
    private questionsLoadingService: QuestionsLoadingService,
    private router: Router,
    private questionStore: Store<QuestionsState>,
    private questionsSyncStore: QuestionsSyncService
  ) {}

  ngOnInit() {
    this.questionsSyncStore.init();

    this.questions$ = this.questionStore.select(getQuestions);
    const currentRoute = this.router.url;

    if (currentRoute.includes(GRAMMAR_PATH)) {
      this.listeningBlockIsActive = false;
      this.navigateTo = `${GRAMMAR_PATH}/${QUESTION_GRAMMAR_PATH}`;
    } else if (currentRoute.includes(LISTENING_PATH)) {
      this.listeningBlockIsActive = true;
      this.navigateTo = `${LISTENING_PATH}/${QUESTION_LISTENING_PATH}`;
    }

    this.router.navigate([this.navigateTo], {
      queryParams: { index: this.index },
    });
    this.questionsLoadingService.getQuestions().subscribe((questions$) => {
      this.questionsList = questions$;
      this.question.push(this.questionsList[this.index]);
    });
  }

  navigateToQuestion(index: number) {
    this.router.navigate([this.navigateTo], {
      queryParams: { index: index },
    });
    this.question.push(this.questionsList[this.index]);
  }

  setIndex(event: StepperSelectionEvent) {
    this.index = event.selectedIndex;
    this.navigateToQuestion(this.index);
  }

  nextSection() {
    if (
      this.index + 1 === this.questionsList.length &&
      this.navigateTo.includes(LISTENING_PATH)
    ) {
      this.router.navigate([WRITING_PATH]);
    } else if (this.index + 1 === this.questionsList.length) {
      this.router.navigate([LISTENING_PATH]);
    }
  }

  // getTestQuestions(handler: QueryHandler): void {
  //   const testType = ['1', '2', '3', '4'];

  //   for (const type of testType) {
  //     console.log(`${type}`);

  //     const result = handler.handle(type);
  //     if (result) {
  //       console.log(`${result}`);
  //     } else {
  //       console.log(`${type} was left untouched.`);
  //     }
  //   }
  // }
}
