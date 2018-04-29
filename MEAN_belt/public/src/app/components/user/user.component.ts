import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs/subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  sub: Subscription;
  currentUser;
  detailUser;
  done;
  pending;

  constructor(private _route: ActivatedRoute, private _dataService: DataService) {
    this.sub = this._route.params.subscribe(params => {
      this.details(params.name);
    });
    this.getCurrentUser();
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
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

  details(name){
    console.log(name);
    this._dataService.details(name)
      .then(res => {
        this.detailUser = res;
        this.sortItems(this.detailUser.items);
      })
      .catch(err => {
        console.log(err);
      })
  }

  toggleItem(id){
    this._dataService.toggleItem(id)
      .then(res => {
        this.getCurrentUser();
        this.details(this.detailUser.name);
      })
      .catch(err => {
        console.log(err);
      })
  }

  sortItems(items){
    this.done = [];
    this.pending = [];
    for(let item of this.detailUser.items){
      if(item.complete){
        this.done.push(item);
      }
      else{
        this.pending.push(item);
      }
    }
  }

}
