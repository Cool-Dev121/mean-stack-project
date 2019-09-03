import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  
  constructor(private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user= {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe((data: {success: boolean, token: string, msg: string}) => {
      if(data.success){
        console.log('data : ',data);
        this.authService.storeUserData(data.token,  user);
       // this.flashMessage.showFlashMessage(FlashMessage: 'You are now logged in');
        this.router.navigate(['/dashboard']);
      }
      else {
     //   this.flashMessage.showFlashMessage('Couldn\'t login, please try again', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/login']);
      }
    });
  }

}
