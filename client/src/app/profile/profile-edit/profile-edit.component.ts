import { User } from 'src/app/models/user';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ProfileService } from 'src/app/services/profile.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  title: string;
  user: User;

  constructor(
    private flashMessage: FlashMessagesService,
    private profileSevice: ProfileService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.title = this.activatedRoute.snapshot.data.title;
    this.user = new User();

    // fills in the contact._id property from the url
    this.activatedRoute.params.subscribe(params => {
      this.user.username = params.username;
    });
    console.log(this.title);
    if (this.title === 'Edit Profile') {
      this.getUser(this.user);
      console.log(this.user.username);
    }

  }

  getUser(user: User): void {
    this.profileSevice.getUser(user).subscribe(data => {
      console.log("NEWWWWW DATA " + data);
      this.user = data.user;
    });
  }

  onProfileEdit(): void {
        this.profileSevice.editUser(this.user).subscribe(data => {
          if (data.success) {
            this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeOut: 3000});
            this.router.navigate(['/profile/profile-edit']);
          } else {
            this.flashMessage.show('Edit Project Failed', {cssClass: 'alert-danger', timeOut: 3000});
            this.router.navigate(['/profile/profile-edit']);
          }
        });
  }
  }

  /*
// Update an existing User profile in the users collection
module.exports.UpdateProfile = (req, res) => {
  // get a reference to the id from the url
  let id = req.user._id;

  let updatedProfile = User({
    "_id": id,
    "email": req.body.email,
    "username": req.body.username,
    "displayName": req.body.displayName
  });
  //  req.body.password,

  User.update({
    _id: id
  }, updatedProfile, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the survey List
      res.redirect('/surveys/mySurveys');
    }
  });

  */
