import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { BikeService } from '../../services/bikes.service';

import { User } from '../../user';
import { Bike } from '../../bike';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class BikeNewComponent implements OnInit {
  bike = new Bike();
  user = new User();

  @Output()
  newBike = new EventEmitter<Bike>();

  constructor(
    private authService: AuthService,
    private bikeService: BikeService
  ) { }

  ngOnInit() {
    this.authService.getUser()
      .subscribe( user => {
        this.user = user
      }, (response) => {
        console.log(response);
      })
  }

  addNewBike(event: Event, form: NgForm): void {
    event.preventDefault();

    this.bike = form.value;
    this.bike.user = this.user;

    this.bikeService.addBike(this.bike)
      .subscribe( bike => {
          console.log('successful', bike);
          this.newBike.emit(bike);
          this.bike = new Bike();
          form.reset();
        }, (response) => {
          console.log('response',response);
      });
  }

}
