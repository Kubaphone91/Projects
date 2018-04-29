import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Recipe } from '../models/recipe';
import { Ingredient } from '../models/ingredient';
import { AuthService } from './auth.service';

import { map } from 'rxjs/operators';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [];

  constructor(private http: HttpClient,
              private authService: AuthService) {}

  addRecipe(title: string,
            instructions: string,
            difficulty: string,
            ingredients: Ingredient[]) {
      this.recipes.push(new Recipe(title, instructions, difficulty, ingredients));
  }

  getRecipes(){
    return this.recipes.slice();
  }

  updateRecipe(index: number,
              title: string,
              instructions: string,
              difficulty: string,
              ingredients: Ingredient[]){
    this.recipes[index] = new Recipe(title, instructions, difficulty, ingredients);
  }

  removeRecipe(index: number){
    this.recipes.splice(index, 1);
  }

  storeList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.put('https://ionic-recipebook-b6b0e.firebaseio.com/' + userId + '/recipes.json?auth=' + token, this.recipes); //map is taken care of by HttpClient (observable)
  }

  fetchList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.get<Recipe[]>('https://ionic-recipebook-b6b0e.firebaseio.com/' + userId + '/recipes.json?auth=' + token).pipe( //map is taken care of by HttpClient (observable)
      map(data => {
        if(data instanceof Array){
          const mappedRecipe: Recipe[] = data ? data : [];
          for(let item of mappedRecipe) {
            if(!item.hasOwnProperty('ingredients')) {
              item.ingredients = [];
            }
          }
          this.recipes = mappedRecipe;
          return mappedRecipe;
        } else {
          this.recipes = [];
        }
      })
    );
  }
}
