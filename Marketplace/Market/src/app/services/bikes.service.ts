import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { BIKES } from '../data/bike-data';
import { Bike } from '../bike';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';


@Injectable()
export class BikeService {
    private base = '/api/bikes';

    constructor(private http: Http) {

    }

    getBikes(): Observable<Bike[]> {
        console.log("I'm in the bikes services - get all");
        return this.http.get(this.base)
            .map(response => response.json());
    }

    getBike(_id: number): Observable<Bike> {
        console.log("I'm in the bikes services - get one");
        return this.http.get(`${this.base}/${ _id }`)
            .map(response => response.json());
    }

    addBike(bike: Bike): Observable<Bike> {
        console.log("I'm in the bikes services - add");
        return this.http.post(this.base, bike)
            .map(response => response.json());
    }

    editBike(bike: Bike): Observable<Bike> {
        console.log("I'm in the bikes services - edit");
        return this.http.put(`${this.base}/${ bike._id }`, bike)
            .map(response => response.json());
    }

    removeBike(_id: number): Observable<Bike> {
        console.log("I'm in the bikes services - remove");
        return this.http.delete(`${ this.base }/${ _id }`)
            .map(response => response.json());
    }

}
