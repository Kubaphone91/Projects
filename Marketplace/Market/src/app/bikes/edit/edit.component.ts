import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { BikeService } from '../../services/bikes.service';

import { User } from '../../user';
import { Bike } from '../../bike';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class BikeEditComponent implements OnInit {
  bikes: Bike[] = [];
  errorMessage: string;
  auth: boolean = false;
  bike = new Bike();
  user = new User();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private bikeService: BikeService
  ) { }

  ngOnInit() {
    this.auth = this.authService.isAuthed();
    if (this.auth == false) {
      this.router.navigate(['/']);
    } else {
      this.authService.getUser()
        .subscribe( user => {
          this.bikes = user.bikesPosted;
          this.user = user;
        }, (response) => {
          console.log(response);
        })
    }
  }

  editBike(event: Event, bike: Bike): void {
    event.preventDefault();
    this.bike = bike;

    this.bikeService.editBike(this.bike)
      .subscribe( bike => {
          console.log('success')
          this.router.navigate(['/browse']);
        }, (response) => {
          console.log(response);
    });

  }

  addBike(bike: Bike): void {
    this.bikes.push(bike);
  }

  removeBike(bike: Bike): void {
    this.bikeService.removeBike(bike._id)
    .subscribe(
      removedBike => {
        this.bikes.splice(this.bikes.indexOf(bike), 1);
      },
      errorResponse => {
        this.errorMessage = errorResponse.json();
        setTimeout(() => {
          this.errorMessage = null;
        }, 3000);
      }
    )
  }

}
