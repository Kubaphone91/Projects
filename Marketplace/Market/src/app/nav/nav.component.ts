import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { User } from '../user';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  user = new User();

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  logoff(): void {
    this.auth.logout()
      .then( user => {
        this.router.navigate(['/']);
      })
      .catch(() => {});
  }

}
