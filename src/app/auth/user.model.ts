import { Order } from "../cart/order.model";
import { ClothingType, OrderStatus } from "../enums";

export interface User {
    id: number;
    role?: string;
    name: string;
    lastname: string;
    email: string;
    password: string;
    favoriteClothingType?: ClothingType;
    address?: string;
}


