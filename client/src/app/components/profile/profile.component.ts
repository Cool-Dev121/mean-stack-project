import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  user: object;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.authService.getProfile().subscribe((profile : {status: boolean, user: object})=> {
      this.user = profile.user;
      console.log('profile: ', profile);
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
