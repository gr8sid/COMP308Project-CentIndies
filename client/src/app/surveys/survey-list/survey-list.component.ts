import { User } from 'src/app/models/user';
import { SurveyListService } from './../../services/survey-list.service';
import { Survey } from './../../models/survey';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit {
  user: User;
  surveys: Survey[];
  title: string;
  isMySurvey = false;
  username: string;

  constructor(
    private surveyListService: SurveyListService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    )
    { }

  ngOnInit() {
    this.surveys = new Array<Survey>();
    this.title = this.activatedRoute.snapshot.data.title;
    this.user = JSON.parse(localStorage.getItem('user'));

    if(this.title == 'Take Survey'){
      this.displaySurveyList();
    }
    else{
    if (this.user != null) {
      this.username = this.user.username;
      this.displayMySurveyList(this.username);
    } else{
      this.displaySurveyList();
    }
  }
  }

  displayMySurveyList(username: string): void {
    this.surveyListService.getMySurvey(username).subscribe(data => {
      if (data.success) {
        this.surveys = data.surveyList;
      } else {
        this.flashMessages.show('User must be logged-in', { cssClass: 'alert-danger', timeOut: 3000 });
      }
    });
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
