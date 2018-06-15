import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {

  constructor(private _http: Http) {}

  login(user){
    return this._http.post('/api/users', user)
      .map((response: Response) => response.json())
      .toPromise();
  }

  getID(){
    return this._http.get('/api/users/current')
      .map((response: Response) => response.json())
      .toPromise();
  }

  logout(){
    return this._http.get('/api/users/logout')
      .map((response: Response) => response.json())
      .toPromise();
  }

  create(info){
    return this._http.post('/api/polls', info)
      .map((response: Response) => response.json())
      .toPromise();
  }

  displayAll(){
    return this._http.get('/api/polls')
      .map((response: Response) => response.json())
      .toPromise();
  }

  deletePoll(id){
    return this._http.delete(`/api/polls/${id}`)
      .map((response: Response) => response.json())
      .toPromise();
  }

  getOption(id){
    return this._http.get(`/api/options/one/${id}`)
      .map((response: Response) => response.json())
      .toPromise();
  }

  getOptions(id){
    return this._http.get(`/api/options/${id}`)
      .map((response: Response) => response.json())
      .toPromise();
  }

  getPoll(id){
    return this._http.get(`/api/polls/${id}`)
      .map((response: Response) => response.json())
      .toPromise();
  }

  vote(id){
    return this._http.put(`/api/options`, id)
      .map((response: Response) => response.json())
      .toPromise();
  }
}
