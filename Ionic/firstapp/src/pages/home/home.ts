import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tappedNumber = 0;
  pressedNumber = 0;

  constructor(public navCtrl: NavController) {

  }

  onDidReset(resetType: string) {
    switch(resetType){
      case 'tap':
        this.tappedNumber = 0;
        break;
      case 'press':
        this.pressedNumber = 0;
        break;
      case 'all':
        this.pressedNumber = 0;
        this.tappedNumber = 0;
    }
  }

  onTap(){
    console.log('tapped');
    this.tappedNumber++;
  }

  onPress(){
    console.log('pressed');
    this.pressedNumber++;
  }

  didWin(){
    return this.tappedNumber == 2 && this.pressedNumber == 4;
  }

}
