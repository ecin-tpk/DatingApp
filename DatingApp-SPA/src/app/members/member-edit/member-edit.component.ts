import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

import { AlertifyService } from '../../_services/alertify.service';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  user: User;

  @ViewChild('editForm', { static: true })
  editForm: NgForm;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private http: HttpClient,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.user = data['user'];
    });
  }

  updateUser() {
    this.userService
      .updateUser(this.authService.decodedToken.nameid, this.user)
      .subscribe(
        (next) => {
          this.alertify.success('Profile updated successfully');
          this.editForm.reset(this.user);
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }
}
