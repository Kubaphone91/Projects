import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { BikeService } from '../../services/bikes.service';
import { Bike } from '../../bike';
import { User } from '../../user';
import { SearchPipe } from '../../search.pipe';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class BikeListComponent implements OnInit {
  bikes: Bike[] = [];
  filteredBikes: Bike[] = [];
  searchTerm: String = '';
  errorMessage: string;
  auth: boolean = false;
  userID: string;
  contactedUser: boolean = false;
  selectedBike: Bike;
  bikeOwnerID;
  bikeOwner: User;


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
      this.userID = this.authService.getUserID()
      this.bikeService.getBikes()
        .subscribe(
          bikes => {
            this.bikes = bikes;

            this.filteredBikes = this.bikes;
          }
        )
    }
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

  searchBikes(event: Event, form: NgForm): void {
    this.searchTerm = form.value.search;
    this.filteredBikes = this.bikes;

    this.filteredBikes = this.filteredBikes.filter(
      bike => bike.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    )
  }
}
