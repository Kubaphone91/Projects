import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  login = { name: ''};
  errors;

  constructor(private _dataService: DataService, private _router: Router) {
    this.logout();
  }

  ngOnInit() {
  }

  loginUser(){
    this._dataService.loginUser(this.login)
      .then(res => {
        console.log(res);
        if(typeof res != 'boolean'){
          this.errors = res;
        }
        else{
          this.errors = null;
          this._router.navigate(['dashboard']);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  logout(){
    this._dataService.logout()
      .then(res => {
        this._router.navigate(['/']);
      })
      .catch(err => {
        console.log(err);
      })
  }

}
