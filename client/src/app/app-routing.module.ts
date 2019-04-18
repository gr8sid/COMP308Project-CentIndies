
// modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';

import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';

import {AnswerComponent} from './pages/answer/answer.component';


import { ProfileComponent } from './pages/profile/profile.component';
import { SurveyComponent } from './pages/survey/survey.component';
import { SurveyListComponent } from './surveys/survey-list/survey-list.component';
import { SurveyDetailsComponent } from './surveys/survey-details/survey-details.component';
import { SurveyDeleteComponent } from './surveys/survey-delete/survey-delete.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, data: {title: 'Home'}},
  {path: 'about', component: AboutComponent, data: {title: 'About'}},
  {path: 'services', component: ServicesComponent, data: {title: 'Services'}},

  {path: 'profile', component: ProfileComponent, data: {title: 'Profile'}},
  {path: 'profile/profile-edit/edit/:username', component: ProfileEditComponent, data: {title: 'Edit Profile'}, canActivate: [AuthGuard]},

  {path: 'surveys', component: SurveyComponent, data: {title: 'Survey'}},
  {path: 'surveys/survey-list', component: SurveyListComponent, data: {title: 'Add to Survey List'}, canActivate: [AuthGuard]},
  {path: 'surveys/survey-list/add', component: SurveyDetailsComponent, data: {title: 'Add Survey'}, canActivate: [AuthGuard]},
  {path: 'surveys/survey-list/edit/:id', component: SurveyDetailsComponent, data: {title: 'Edit Survey'}, canActivate: [AuthGuard]},
// tslint:disable-next-line: max-line-length
 {path: 'surveys/survey-list/delete/:id', component: SurveyDeleteComponent, data: {title: 'Delete Survey'}, canActivate: [AuthGuard]},

 {path: 'surveys/take-survey', component: SurveyListComponent, data: {title: 'Take Survey'}, canActivate: [AuthGuard]},
  {path: 'surveys/take-survey/add', component: AnswerComponent, data: {title: 'Save Answer'}, canActivate: [AuthGuard]},
// tslint:disable-next-line: max-line-length
  {path: 'surveys/take-survey/add/:id', component: SurveyDetailsComponent, data: {title: 'Survey Answer Details'}, canActivate: [AuthGuard]},


  {path: 'register', component: RegisterComponent, data: {title: 'Register'}},
  {path: 'login', component: LoginComponent, data: {title: 'Login'}},
  {path: 'logout', redirectTo: '/login', pathMatch: 'full'},

  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
