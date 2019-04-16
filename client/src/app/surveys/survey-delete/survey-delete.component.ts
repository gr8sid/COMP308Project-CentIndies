import { Component, OnInit } from '@angular/core';
import { SurveyListService } from 'src/app/services/survey-list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Survey } from 'src/app/models/survey';


@Component({
  selector: 'app-survey-delete',
  templateUrl: './survey-delete.component.html',
  styleUrls: ['./survey-delete.component.css']
})
export class SurveyDeleteComponent implements OnInit {

  title: string;
  survey: Survey;

  constructor(
    private activateRoute: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private surveyListService: SurveyListService,
    private router: Router
  ) { }

  ngOnInit() {
    this.title = this.activateRoute.snapshot.data.title;
    this.survey = new Survey();

    this.activateRoute.params.subscribe(params => {
      this.survey._id = params.id;
    });

    this.deleteSurvey(this.survey);
  }

  deleteSurvey(pro: Survey): void {
    this.surveyListService.deleteSurvey(pro). subscribe(data => {
      if (data.success) {
        this.flashMessage.show(data.msg, {cssClass: 'alert-warning', timeOut: 3000});
        this.router.navigate(['/surveys/survey-list']);
      } else {
        this.flashMessage.show('Delete Survey Failed', {cssClass: 'alert-danger', timeOut: 3000});
        this.router.navigate(['/surveys/survey-list']);
      }
    });
  }

}
