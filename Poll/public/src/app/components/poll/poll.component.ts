import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit, OnDestroy {

  name;
  subscription;
  options;
  pollId;
  poll: Object;
  voteOption;

  constructor(private _dataService: DataService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.getID();

    this.subscription = this._route.paramMap
      .switchMap(params =>
        this.pollId = params.get('id')
      ).subscribe();

    this.getOptions();
    this.getPoll();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
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

  getPoll(){
    this._dataService.getPoll(this.pollId)
      .then(poll => {
        this.poll = poll;
      })
      .catch(err => {
        console.log(err);
      })
  }

  getOption(id){
    this._dataService.getOption(id)
      .then(data => {
        this.voteOption = data;
        return this.vote()
      })
      .catch(err => {
        console.log(err);
      })
  }

  getOptions(){
    this._dataService.getOptions(this.pollId)
      .then(options => {
        this.options = options;
      })
      .catch(err => {
        console.log(err);
      })
  }

  vote(){
    this._dataService.vote(this.voteOption)
      .then(data => {
        console.log(data);
        this.getOptions();
      })
      .catch(err => {
        console.log(err);
      })
  }

}
