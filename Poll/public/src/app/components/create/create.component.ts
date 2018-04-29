import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  newpoll = {
    question: "",
    creator: "",
    optionone: "",
    optiontwo: "",
    optionthree: "",
    optionfour: ""
  };
  name: string;

  constructor(private _dataService: DataService, private _router: Router) { }

  ngOnInit() {
    this.getID();
  }

  getID(){
    this._dataService.getID()
      .then(data => {
        this.name = data.name;
      })
      .catch(err => {
        console.log(err)
        this._router.navigateByUrl('/')
      })
  }

  create(){
    this.newpoll.creator = this.name;
    this._dataService.create(this.newpoll)
      .then(data => {
        this._router.navigateByUrl('/dashboard');
      })
      .catch(err => {
        console.log(err);
      })
  }

}
