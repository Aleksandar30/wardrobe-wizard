import { Order } from "../cart/order.model";
import { ClothingType, OrderStatus } from "../enums";

export interface User {
    id: number;
    name: string;
    lastname: string;
    email: string;
    password: string;
    favoriteClothingType?: ClothingType;
    purchases?: Array<Order>;
    address?: string;
}


// export interface Purchases {
//     id: number;
//     shopItemId: number;
//     date: Date;
//     status: OrderStatus;
//     quantity: number;
//     usersRating: number;
// } 