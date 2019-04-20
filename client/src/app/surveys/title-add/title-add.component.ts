import { SurveyTitle } from './../../models/surveyTitle';
import { Component, OnInit } from '@angular/core';
import { SurveyListService } from 'src/app/services/survey-list.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';

import { Survey } from 'src/app/models/survey';

@Component({
  selector: 'app-title-add',
  templateUrl: './title-add.component.html',
  styleUrls: ['./title-add.component.css']
})
export class TitleAddComponent implements OnInit {

  surveys: Survey[];
  surveyTitle: SurveyTitle;
  username: string;
  isMySurvey = false;
  title: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private surveyService: SurveyListService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.surveys = new Array<Survey>();
    this.surveyTitle = new SurveyTitle();
    this.title = this.activatedRoute.snapshot.data.title;

    this.activatedRoute.params.subscribe(params => {
      this.username = params.username;
    });

    this.getSurveyTitleList();
    console.log("SUrevy TITEL >>>> "+ this.surveyTitle.surveyName);

    if (this.username != null) {
      this.isMySurvey = true;
      this.displayMySurveyList(this.username);
    } else {
      this.isMySurvey = false;
      this.displaySurveyList();
    }
  }

  getSurveyTitleList(): void{
    this.surveyService.getSurveyTitleList().subscribe(data => {
      if (data.success) {
        this.surveyTitle = data.surveyTitleList;
        console.log("SUrevy TITEL >>>> "+ this.surveyTitle);
      } else {
        this.flashMessage.show('User must be logged-in', { cssClass: 'alert-danger', timeOut: 3000 });
      }
    });
  }
  displaySurveyList(): void {
    this.surveyService.getSurveyList().subscribe(data => {
      if (data.success) {
        this.surveys = data.surveyList;
      } else {
        this.flashMessage.show('User must be logged-in', { cssClass: 'alert-danger', timeOut: 3000 });
      }
    });
  }

  displayMySurveyList(username: string): void {
    this.surveyService.getMySurvey(username).subscribe(data => {
      if (data.success) {
        this.surveys = data.surveyList;
      } else {
        this.flashMessage.show('User must be logged-in', { cssClass: 'alert-danger', timeOut: 3000 });
      }
    });
  }


  onSurveyTitleSubmit(): void {
    switch (this.title) {
      case 'Survey Title Add':
          console.log("My SURVEY TITLE -> "+ this.surveyTitle.surveyName);
          this.surveyService.addSurveyTitle(this.surveyTitle).subscribe(data => {
          if (data.success) {
            this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeOut: 3000});
            this.router.navigate(['/survey-title']);
          } else {
            this.flashMessage.show('Adding Survey Failed', {cssClass: 'alert-danger', timeOut: 3000});
            this.router.navigate(['/survey-title']);
          }
        });
        break;
      }
    }


}
