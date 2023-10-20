import { OrderStatus } from "../enums";
import { ShopItem } from "../shop/shop-item.model";

export interface Order {
    id: number;
    shopItem: ShopItem;
    amount: number;
    price: number;
    status: OrderStatus;
}