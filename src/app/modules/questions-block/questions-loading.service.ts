import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Answer, Question } from 'src/app/core/models/questions.model';
import { QUESTIONS_MOCK } from 'src/app/redux/reducers/questions.reducers';

@Injectable({
  providedIn: 'root',
})
export class QuestionsLoadingService {
  static getQuestions(): Question[] {
    throw new Error('Method not implemented.');
  }
  private questions: Question[] = [];
  private answers: Answer[] = [];

  questionsPath: string = 'assets/questions.json';

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<Question[]> {
    return of(QUESTIONS_MOCK);
  }

  getQuestionById(id: string) {
    return this.questions.find((question: Question) => question.id === id);
  }

  getAnswerById(questionId: string) {
    return this.answers.find(
      (answer: Answer) => answer.questionId === questionId
    );
  }
}