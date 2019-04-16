import { ProfileComponent } from './../../pages/profile/profile.component';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements OnInit {
  users: User[];

  constructor(
    private projectListService: ProfileService,
    private flashMessages: FlashMessagesService,
    private router: Router
    )
    { }

  ngOnInit() {
    this.users = new Array<User>();

    this.displayProjectList();
  }

  private displayProjectList(): void {
    this.projectListService.getUserList().subscribe(data => {
      if(data.success) {
        this.users = data.userList;
      } else {
        this.flashMessages.show('User must be logged-in!!!', {cssClass: 'alert-danger', timeOut: 3000});
      }
    });
  }



}
