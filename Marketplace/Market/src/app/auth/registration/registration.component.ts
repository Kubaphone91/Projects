import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../user';

import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user = new User();
  errorMessage: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
  ) { }

  ngOnInit() {
  }

  newRegistration(event: Event, form: NgForm): void {
    event.preventDefault();

    this.auth.register(this.user)
      .then( user => {
        this.router.navigate(['/browse']);
      })
      .catch( errorResponse => {
        this.errorMessage = errorResponse.json();
      });
  }
}
