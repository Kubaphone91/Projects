import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController, LoadingController, AlertController } from 'ionic-angular';

import { ShoppingListService } from './../../services/shopping-list.service';
import { Ingredient } from '../../models/ingredient';
import { EditListPage } from './../edit-list/edit-list';
import { DBOptionsPage } from '../db-options/db-options';

import { AuthService } from './../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  listItems: Ingredient[];
  ingredient: Ingredient;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private shoppingService: ShoppingListService,
              private modalCtrl: ModalController,
              private popoverCtrl: PopoverController,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
  }

  private loadItems(){
    this.listItems = this.shoppingService.getItems();
  }

  ionViewWillEnter(){
    this.loadItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingListPage');
  }

  onAddItem(form: NgForm){
    this.shoppingService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  onViewItem(item: Ingredient){
    const modal = this.modalCtrl.create(EditListPage, item);
    modal.present();
  }

  deleteItem(index: number){
    this.shoppingService.removeItem(index);
    this.loadItems();
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
            this.shoppingService.fetchList(token)
              .subscribe((list: Ingredient[]) => {
                loading.dismiss();
                if(list) {
                  this.listItems = list;
                }
                else {
                  this.listItems = [];
                }
                console.log('Fetched list');
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
            this.shoppingService.storeList(token)
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
