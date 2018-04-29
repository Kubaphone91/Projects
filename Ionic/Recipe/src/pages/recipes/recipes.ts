import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, AlertController } from 'ionic-angular';

import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { Recipe } from '../../models/recipe';
import { RecipePage } from '../recipe/recipe';
import { DBOptionsPage } from './../db-options/db-options';

import { AuthService } from './../../services/auth.service';
import { RecipeService } from './../../services/recipe.service';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  recipes: Recipe[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private recipeService: RecipeService,
              private popoverCtrl: PopoverController,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private authService: AuthService) {
  }

  onNewRecipe(){
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }

  onLoadRecipe(recipe: Recipe, index: number) {
    this.navCtrl.push(RecipePage, {recipe: recipe, index: index});
  }

  ionViewWillEnter(){
    this.recipes = this.recipeService.getRecipes();
  }

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'Error occured!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }

  onShowOptions() {
    const loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    const popover = this.popoverCtrl.create(DBOptionsPage);
    popover.present();
    popover.onDidDismiss(data => {
      if(!data) {
        return;
      }
      else if(data.action == 'load'){
        loading.present();
        this.authService.getActiveUser().getIdToken()
          .then((token: string) => {
            this.recipeService.fetchList(token)
              .subscribe((list: Recipe[]) => {
                loading.dismiss();
                if(list) {
                  this.recipes = list;
                }
                else {
                  this.recipes = [];
                }
                console.log('Fetched recipes');
              },
              error => {
                loading.dismiss();
                this.handleError(error.message);
              })
          })
      } else if(data.action == 'store') {
        loading.present();
        this.authService.getActiveUser().getIdToken()
          .then((token: string) => {
            this.recipeService.storeList(token)
              .subscribe(() => {
                loading.dismiss();
                console.log('Success!');
              }, error => {
                loading.dismiss();
                this.handleError(error.message);
              })
          });
        }
    });
  }

}
