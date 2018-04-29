import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import { User } from '../../user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = new User();
  errorMessage: string;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  newLogin(event: Event, form: NgForm): void {
    event.preventDefault();

    this.auth.login(this.user)
      .then( user => {
        this.router.navigate(['/browse']);
      })
      .catch( errorResponse => {
        this.errorMessage = errorResponse.json();
      });
  }
}
