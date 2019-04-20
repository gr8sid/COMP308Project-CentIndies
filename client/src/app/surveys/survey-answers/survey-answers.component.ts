import { Answer } from 'src/app/models/answer';
import { AnswerService } from './../../services/answer.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-survey-answers',
  templateUrl: './survey-answers.component.html',
  styleUrls: ['./survey-answers.component.css']
})
export class SurveyAnswersComponent implements OnInit {
  answers: Answer[];
  title: string;
  constructor(
    private answerService: AnswerService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    )
    { }

  ngOnInit() {
    this.answers = new Array<Answer>();
    this.title = this.activatedRoute.snapshot.data.title;
    this.displayAnswerList();
  }

  private displayAnswerList(): void {
    this.answerService.getAnswerList().subscribe(data => {
      if(data.success) {
        this.answers = data.answerList;
      } else {
                this.flashMessages.show('User must be logged-in!!!', {cssClass: 'alert-danger', timeOut: 3000});
      }
    });
  }

}
