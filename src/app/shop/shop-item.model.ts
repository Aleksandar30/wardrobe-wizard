import { ClothingSize, ClothingType, Gender, OrderStatus } from "../enums";


export interface ShopItem {
    id: number;
    name: string;
    type: ClothingType;
    gender: Gender;
    size: ClothingSize;
    manufacturer: string;
    productionDate: Date;
    price: number;
    rating: number;
    userReviews: Review[];
}



export interface Review {
    text: string;
    score: number;
}


