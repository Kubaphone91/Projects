import { User } from './user';

export class Bike {
    _id: number;
    title: string;
    descriptiom: string;
    price: number;
    location: string;
    img_url: string;
    user: User;
}
