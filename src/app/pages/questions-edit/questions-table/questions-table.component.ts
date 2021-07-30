import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { Question } from 'src/app/core/models/questions.model';
import { QuestionsSyncService } from 'src/app/core/services/questions-sync.service';
import { QuestionsLoadingService } from 'src/app/modules/questions-block/questions-loading.service';
import { getQuestions } from 'src/app/redux/selectors/questions.selectors';
import { MatTable } from '@angular/material/table';
import { QuestionsState } from 'src/app/redux/models/questions.state.model';
export class QuestionModel {
  id: string = '';
  text: string = '';
  type: string = '';
}
@Component({
  selector: 'app-questions-table',
  templateUrl: './questions-table.component.html',
  styleUrls: ['./questions-table.component.scss'],
})
export class QuestionsTableComponent implements OnInit {
  questions$: Observable<Question[]> | undefined;

  questionsList: Question[] = [];
  questionsData: Question[] = [];

  displayedColumns: string[] = ['id', 'text', 'type', 'edit', 'delete'];
  dataSource: Question[] = [];

  questionModel: QuestionModel = new QuestionModel();
  @ViewChild(MatTable) table!: MatTable<QuestionModel>;

  openEdit = false;
  formValue!: FormGroup;
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(
    private questionsLoadingService: QuestionsLoadingService,
    private questionStore: Store<QuestionsState>,
    private formBuilder: FormBuilder,
    private questionsSyncStore: QuestionsSyncService
  ) {}

  ngOnInit() {
    this.questionsSyncStore.init();

    this.questions$ = this.questionStore.select(getQuestions);

    this.questionsLoadingService.getQuestions().subscribe((questions$) => {
      this.questionsList = questions$;
      this.dataSource = [...this.questionsList];
    });

    this.formValue = this.formBuilder.group({
      id: [''],
      text: [''],
      type: [''],
    });
  }

  onAddQuestion() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postQuestionDetails() {
    this.questionModel.id = this.formValue.value.id;
    this.questionModel.text = this.formValue.value.text;
    this.questionModel.type = this.formValue.value.type;

    this.questionsLoadingService.postQuestion(this.questionModel).subscribe(
      (res: QuestionModel) => {
        const ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.closeModal();
      },
      (error) => {
        console.log('Something went wrong.');
      }
    );
  }

  getAllQuestions() {
    this.questionsLoadingService.getQuestions().subscribe((res) => {
      this.questionsData = res;
    });
  }

  onDeleteQuestion(question: QuestionModel) {
    this.questionsLoadingService
      .deleteQuestion(question.id)
      .subscribe((res) => {
        this.getAllQuestions();
      });
  }

  onEditQuestion(question: QuestionModel) {
    this.showAdd = false;
    this.showUpdate = true;

    this.questionModel.id = question.id;
    this.formValue.controls['id'].setValue(question.id);
    this.formValue.controls['text'].setValue(question.text);
    this.formValue.controls['type'].setValue(question.type);
  }

  onUpdateQuestionDetails() {
    this.questionModel.id = this.formValue.value.id;
    this.questionModel.text = this.formValue.value.text;
    this.questionModel.type = this.formValue.value.type;

    this.questionsLoadingService
      .updateQuestion(this.questionModel, this.questionModel.id)
      .subscribe((res) => {
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.closeModal();
      });
  }

  openModal() {
    let modal = document.getElementById('modal');
    modal?.classList.remove('modal-close');
    modal?.classList.add('modal-open');
  }

  closeModal() {
    let modal = document.getElementById('modal');
    modal?.classList.remove('modal-open');
    modal?.classList.add('modal-close');
    this.formValue.reset();
  }

  addData() {
    const randomElementIndex = Math.floor(
      Math.random() * this.questionsList.length
    );
    this.dataSource.push(this.questionsList[randomElementIndex]);
    this.table.renderRows();
  }

  removeData() {
    this.dataSource.pop();
    this.table.renderRows();
  }
}
