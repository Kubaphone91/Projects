import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  color: string = 'null';

  currentUser;
  users;
  errors;

  newItem = {
    title: '',
    desc: '',
    tag: ''
  };

  constructor(private _dataService: DataService, private _router: Router) {
    this.getCurrentUser();
    this.getUsers();
   }

  ngOnInit() {
  }

  getCurrentUser(){
    this._dataService.getCurrentUser()
      .then(res => {
        this.currentUser = res;
      })
      .catch(err => {
        console.log(err);
      })
  }

  getUsers(){
    this._dataService.getUsers()
      .then(res => {
        this.users = res;
      })
      .catch(err => {
        console.log(err);
      })
  }

  addItem(formData: NgForm){
    this._dataService.addItem(this.newItem, this.currentUser.name)
      .then(res => {
        console.log(res);
        if(typeof res != 'boolean'){
          this.errors = res;
        }
        else{
          this.errors = null;
        }
        formData.resetForm();
        this.getCurrentUser();
        this.getUsers();
      })
      .catch(err => {
        console.log(err);
      })
  }

  toggleItem(id){
    this._dataService.toggleItem(id)
      .then(res => {
        this.getCurrentUser();
        this.getUsers();
      })
      .catch(err => {
        console.log(err);
      })
  }

}
