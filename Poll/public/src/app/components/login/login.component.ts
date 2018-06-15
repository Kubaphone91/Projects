import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    error;
    user = {
      name: ''
    };

  constructor(private _dataService: DataService, private _router: Router) { }

  ngOnInit() {

  }

  login(){
    this._dataService.login(this.user)
      .then(data => {
        console.log(data);
        this._router.navigateByUrl('/dashboard');
      })
      .catch(err => {
        this.error = err;
      })
  }

}
