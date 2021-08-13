import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { State } from 'src/app/redux/models/app.state';
import { getUserId } from 'src/app/redux/selectors/user.selectors';
import { UsersCoachService } from '../users-coach.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CoachTestModel } from 'src/app/core/models/coach-test.model';
import { QuestionsLoadingService } from 'src/app/modules/questions-block/questions-loading.service';
import { DomSanitizer } from '@angular/platform-browser';

export class UserAnswerSet {
  'type': number;
  'audioId': null;
  'questionText': string;
  'userAnswer': string;
}

@Component({
  selector: 'app-users-coach',
  templateUrl: './users-coach.component.html',
  styleUrls: ['./users-coach.component.scss'],
  providers: [UsersCoachService],
})
export class UsersCoachComponent implements OnInit {
  usersTests$: CoachTestModel[] = [];
  tests$: CoachTestModel | undefined;

  testId: string = '';

  getUserId$ = this.store.select(getUserId);
  userId: any;

  testsList: CoachTestModel[] = [];
  testsData!: CoachTestModel;

  displayedColumns: string[] = ['date', 'level', 'check'];
  dataSource: CoachTestModel[] = [];

  userLevel: string = '';
  level: string = '';

  userAnswerSet: UserAnswerSet[] = [];
  testResults: CoachTestModel[] = [];

  writingText: string = '';
  blobUrl: any;
  isRecording = false;

  testsModel: CoachTestModel = new CoachTestModel();
  userAnswerSetModel: UserAnswerSet = new UserAnswerSet();

  @ViewChild(MatTable) table!: MatTable<CoachTestModel>;

  testsListMatTabDataSource = new MatTableDataSource<CoachTestModel>(
    this.dataSource
  );

  formValue!: FormGroup;

  constructor(
    private usersCoachService: UsersCoachService,
    private store: Store<State>,
    private formBuilder: FormBuilder,
    private questionsLoadingService: QuestionsLoadingService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getUserId$.pipe(take(1)).subscribe((id) => (this.userId = id));

    this.usersCoachService
      .getAssignedTests(this.userId)
      .subscribe((usersTests$: CoachTestModel[]) => {
        this.testsList = usersTests$;
        this.dataSource = [...this.testsList];
        this.testsListMatTabDataSource.data = this.dataSource;
      });

    this.formValue = this.formBuilder.group({
      date: [''],
      level: [''],
    });
  }

  onCheckTest(test: CoachTestModel) {
    this.testId = test.testId;
    this.testsModel.testId = test.testId;
    this.formValue.controls['date'].setValue(test.examDate);
    this.formValue.controls['level'].setValue(test.englishLevel);

    this.onGetTest();
  }

  onGetTest() {
    this.writingText = '';
    this.usersCoachService
      .getResultsForCoach(this.testId)
      .subscribe((tests$: any) => {
        this.testsData = tests$;
        this.testResults = [this.testsData];
        this.userAnswerSet = [...this.testsData.userAnswerSet];
        for (let i = 0; i < this.userAnswerSet.length; i++) {
          if (this.userAnswerSet[i].type === 2) {
            const writingId = this.userAnswerSet[i].userAnswer;
            this.usersCoachService
              .getWritingText(writingId)
              .subscribe((res: any) => {
                this.writingText = res.writingText;
              });
          }
          if (this.userAnswerSet[i].type === 3) {
            this.blobUrl = '';
            const speakingId = this.userAnswerSet[i].userAnswer;

            this.questionsLoadingService
              .downloadAudio(speakingId)
              .subscribe((res) => {
                this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(
                  URL.createObjectURL(res)
                );
                this.blobUrl =
                  this.blobUrl.changingThisBreaksApplicationSecurity;
              });
          }
        }
      });
  }
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
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

  applyFilter(event: any) {
    const filterValue = event.target.value;
    this.testsListMatTabDataSource.filter = filterValue.trim().toLowerCase();
  }
}
