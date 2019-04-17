import { Component, OnInit } from '@angular/core';
import { SurveyListService } from 'src/app/services/survey-list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Survey } from 'src/app/models/survey';
import { User } from 'src/app/models/user';
import { Answer } from 'src/app/models/answer';

@Component({
  selector: 'app-survey-details',
  templateUrl: './survey-details.component.html',
  styleUrls: ['./survey-details.component.css']
})
export class SurveyDetailsComponent implements OnInit {
  user: User;
  title: string;
  survey: Survey;
  answer: Answer;

  constructor(
    private surveyListService: SurveyListService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.title = this.activatedRoute.snapshot.data.title;
    this.survey = new Survey();
   // this.user = new User();
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user.username);

    // fills in the contact._id property from the url
    this.activatedRoute.params.subscribe(params => {
      this.survey._id = params.id;
    });

    if (this.title === 'Edit Survey' || this.title === 'Survey Answer Details' ) {
      this.getSurvey(this.survey);
    }

  }

  getSurvey(survey: Survey): void {
    this.surveyListService.getSurvey(survey).subscribe(data => {

      this.survey = data.survey;
    });
  }

  onSurveyDetailsSubmit(): void {
    switch (this.title) {
      case 'Add Survey':
        this.surveyListService.addSurvey(this.survey).subscribe(data => {
          if (data.success) {
            this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeOut: 3000});
            this.router.navigate(['/surveys/survey-list']);
          } else {
            this.flashMessage.show('Adding Survey Failed', {cssClass: 'alert-danger', timeOut: 3000});
            this.router.navigate(['/surveys/survey-list']);
          }
        });
        break;
      case 'Edit Survey':
        this.surveyListService.editSurvey(this.survey).subscribe(data => {
          console.log(data.survey);
          if (data.success) {
            this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeOut: 3000});
            this.router.navigate(['/surveys/survey-list']);
          } else {
            this.flashMessage.show('Edit Survey Failed', {cssClass: 'alert-danger', timeOut: 3000});
            this.router.navigate(['/surveys/survey-list']);
          }
        });
        break;
    }
  }


  onAnswerSubmit(): void {
    switch (this.title) {
      case 'Survey Answer Details':
        this.surveyListService.addAnswer(this.answer).subscribe(data => {
          if (data.success) {
            this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeOut: 3000});
            this.router.navigate(['/surveys/take-survey']);
          } else {
            this.flashMessage.show('Saving Answer  Failed', {cssClass: 'alert-danger', timeOut: 3000});
            this.router.navigate(['/surveys/take-survey']);
          }
        });
        break;
    }

  }

}
