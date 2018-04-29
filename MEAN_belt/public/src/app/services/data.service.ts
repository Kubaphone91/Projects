import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {

  constructor(private _http: Http) {}

  loginUser(login){
    return this._http.post('/api/users/login', login)
      .map(res => res.json())
      .toPromise();
  }

  getCurrentUser(){
    return this._http.get('/api/users/current')
      .map(res => res.json())
      .toPromise();
  }

  logout(){
    return this._http.get('/api/users/logout')
      .map(res => res.json())
      .toPromise();
  }

  getUsers(){
    return this._http.get('/api/users/all')
      .map(res => res.json())
      .toPromise();
  }

  addItem(newItem, creatorName){
    return this._http.post('/api/items/add', {newItem: newItem, creatorName: creatorName})
      .map(res => res.json())
      .toPromise();
  }

  toggleItem(id){
    return this._http.post('/api/items/toggle', {id: id})
      .map(res => res.json())
      .toPromise();
  }

  details(name){
    return this._http.get('/api/users/' + name)
      .map(res => res.json())
      .toPromise();
  }
}
