import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-edit-list',
  templateUrl: 'edit-list.html',
})
export class EditListPage {
  itemEdit: string;
  itemAmountEdit: number;

  constructor(private viewCtrl: ViewController, private navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.itemEdit = this.navParams.get('item.name');
    this.itemAmountEdit = this.navParams.get('item.amount');
  }

  onClose(){
    this.viewCtrl.dismiss();
  }

}
