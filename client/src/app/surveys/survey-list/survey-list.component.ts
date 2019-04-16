import { SurveyListService } from './../../services/survey-list.service';
import { Survey } from './../../models/survey';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit {
  surveys: Survey[];

  constructor(
    private surveyListService: SurveyListService,
    private flashMessages: FlashMessagesService,
    private router: Router
    )
    { }

  ngOnInit() {
    this.surveys = new Array<Survey>();

    this.displaySurveyList();
  }

  private displaySurveyList(): void {
    this.surveyListService.getSurveyList().subscribe(data => {
      if(data.success) {
        this.surveys = data.surveyList;
      } else {
        this.flashMessages.show('User must be logged-in!!!', {cssClass: 'alert-danger', timeOut: 3000});
      }
    });
  }

  private onDeleteClick(): void {
    if(!confirm('Are You Sure?')) {
      this.router.navigate(['/surveys/survey-list']);
    }
  }

}
