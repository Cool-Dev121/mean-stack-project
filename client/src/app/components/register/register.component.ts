import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  username: String;
  email: String;
  password: String;

  constructor(private validateService: ValidateService,
              private authService: AuthService,
              private router: Router,
              private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
      const user=  {
        email: this.email,
        username: this.username,
        password: this.password
      }
    
      if(!this.validateService.validateRegister(user)){
        this.flashMessage.show('Please enter all the fields', {cssClass: 'alert-danger', timeout: 3000});
        return false;
      } 
    
      // Validate Email
      else if(!this.validateService.validateEmail(user.email)){
        this.flashMessage.show('Please enter a valid email', {cssClass: 'alert-danger', timeout: 3000});
        return false;
      } 
      else {
        console.log("user =", user);
      }

      // Register user
      this.authService.registerUser(user).subscribe(data => {
        if(data){
          this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
          this.router.navigate(['/login']);
        }
        else {
          this.flashMessage.show('Couldn\'t register, please try again', {cssClass: 'alert-danger', timeout: 3000});
          this.router.navigate(['/login']);
        }
      });
  }

}
