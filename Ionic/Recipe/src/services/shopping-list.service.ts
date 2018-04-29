import { AuthService } from '../services/auth.service';
import { Ingredient } from '../models/ingredient';
import { HttpClient } from '@angular/common/http';
//import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class ShoppingListService {
  constructor(private http: HttpClient,
              private authService: AuthService) {}

  private ingredients: Ingredient[] = [];

  addItem(name: string, amount: number) {
    this.ingredients.push(new Ingredient(name, amount));
  }

  addItems(items: Ingredient[]){
    this.ingredients.push(...items);
  }

  getItems(){
    return this.ingredients.slice();
  }
  getItem(index: number){
    return this.ingredients.slice(index);
  }

  removeItem(index: number){
    this.ingredients.splice(index, 1);
  }

  storeList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.put('https://ionic-recipebook-b6b0e.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token, this.ingredients) //map is taken care of by HttpClient (observable)
  }

  fetchList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.get<Ingredient[]>('https://ionic-recipebook-b6b0e.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token).pipe(
      map(data => {
        if(data instanceof Array) {
          this.ingredients = data;
          return data;
        } else {
          this.ingredients = [];
        }
      })
    ) //map is taken care of by HttpClient (observable)
  }
}
