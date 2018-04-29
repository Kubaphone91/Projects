import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { BikeService } from '../../services/bikes.service';

import { User } from '../../user';
import { Bike } from '../../bike';


@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css']
})
export class BikeRandomComponent implements OnInit {
  bike: Bike;
  auth: boolean = false;
  errorMessage: string;
  contactedUser: boolean = false;
  selectedBike: Bike;
  bikeOwnerID;
  bikeOwner: User;
  userID: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private bikeService: BikeService
  ) { }

  ngOnInit() {
    this.auth = this.authService.isAuthed();
    if (this.auth == false) {
      this.router.navigate(['/']);
    } else {
      this.userID = this.authService.getUserID()

      this.auth = true;
    }

    this.bikeService.getBikes()
      .subscribe(
        allBikes => {
          let min = 0;
          let max = allBikes.length;

          this.bike = allBikes[(Math.floor(Math.random() * (max - min)) + min)];
        }
      )
  }

  contactUser(bike: Bike): void {
    this.contactedUser = true;
    this.selectedBike = bike;
    this.bikeOwnerID = this.selectedBike.user;
    this.authService.getBikeOwner(this.bikeOwnerID)
      .subscribe(
        user => {
          this.bikeOwner = user;
        }, () => {}
      )
  }

  cancelContact(){
    this.contactedUser = false;
    this.selectedBike = null;
  }

}
