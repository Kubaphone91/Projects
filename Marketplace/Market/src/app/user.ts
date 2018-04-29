import { Bike } from './bike';

export class User {
    _id: number;
    email: string;
    first_name: string;
    last_name: number;
    password: string;
    confirm: String;
    bikesPosted: Bike[];
}
