import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  name: String;
  polls: Array<any>;
  searchText: String;

  constructor(private _dataService: DataService, private _router: Router) { }

  ngOnInit() {
    this.getID();
    this.displayPolls();
  }

  getID(){
    this._dataService.getID()
      .then(data => {
        this.name = data.name;
      })
      .catch(err => {
        console.log(err);
        this._router.navigateByUrl('/');
      })
  }

  displayPolls(){
    this._dataService.displayAll()
      .then(data => {
        this.polls = data;
      })
      .catch(err => {
        console.log(err);
      })
  }

  deletePoll(id){
    this._dataService.deletePoll(id)
      .then(data => {
        this._router.navigateByUrl('/create');
      })
      .catch(err => {
        console.log(err);
      })
  }

  logout(){
    this._dataService.logout()
      .then(data => {
        this._router.navigateByUrl('/');
      })
      .catch(err => {
        console.log(err);
      })
  }

  onEvent(event: Event): void {
    event.stopPropagation();
    console.log('eventing');
  }
}
