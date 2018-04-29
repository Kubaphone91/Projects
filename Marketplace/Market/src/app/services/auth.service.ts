import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CookieService } from 'ngx-cookie';

import { User } from '../user';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class AuthService {
    private base = '/auth/';

    constructor(
        private http: Http,
        private cookieService: CookieService,

    ) { }

    login(user: User): Promise<User> {
        console.log("I'm in the auth services - login");
        return this.http.post(this.base + 'login', user)
            .map(response => response.json())
            .toPromise();
    }

    register(user: User): Promise<User> {
        console.log("I'm in the auth services - register");
        return this.http.post(this.base + 'register', user)
            .map(response => response.json())
            .toPromise();
    }

    logout(): Promise<boolean> {
        console.log("I'm in the auth services - logout");
        return this.http.delete(this.base + 'logout')
        .map(response => response.json())
        .toPromise();
    }

    isAuthed(): boolean {
        const expired = parseInt(this.cookieService.get('expiration'), 10);
        const userID = this.cookieService.get('userID');
        const session = this.cookieService.get('cd-session');

        return Boolean(session && userID && expired && expired > Date.now());
    }

    getUserID(): string {
        console.log("I'm in the auth services - get user ID");
        const userID = this.cookieService.get('userID');
        return userID;
    }

    getUser(): Observable<User> {
        console.log("I'm in the auth services - get user");
        const userID = this.cookieService.get('userID');
        return this.http.get(this.base + 'user', userID)
            .map(response => response.json())
    }

    getBikeOwner(_id: string): Observable<User> {
        console.log("I'm in the auth services - get bike owner");
        return this.http.get(`${this.base}${ _id }`)
            .map(response => response.json());
    }

}
