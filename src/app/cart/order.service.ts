import { Injectable } from "@angular/core";
import { Order } from "./order.model";
import { ClothingSize, ClothingType, Gender, OrderStatus } from "../enums";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class OrderService {


    isBuyer(id: number, itemId: number): boolean {
        return this.orders.some(order => order.userId === id && order.shopItem.id === itemId);
    }
    private orders: Order[] = [
        {
            id: 1,
            userId: 1,
            shopItem: {
                id: 1,
                name: 'Nike Air Max 90',
                type: ClothingType.SportsWear,
                gender: Gender.Male,
                size: ClothingSize.M,
                manufacturer: 'Nike',
                productionDate: new Date(2021, 5, 1),
                price: 129.99,
                rating: 4.5,
                userReviews: [
                    {
                        text: 'Great shoes!',
                        score: 4.5
                    },
                    {
                        text: 'I love them!',
                        score: 5
                    }
                ]
            },
            amount: 5,
            price: 129.99,
            status: OrderStatus.Delivered
        },
        {
            id: 2,
            userId: 1,
            shopItem: {
                id: 2,
                name: 'Adidas Ultraboost 21',
                type: ClothingType.SportsWear,
                gender: Gender.Male,
                size: ClothingSize.L,
                manufacturer: 'Adidas',
                productionDate: new Date(2021, 4, 1),
                price: 179.99,
                rating: 4.8,
                userReviews: [
                    {
                        text: 'Amazing shoes!',
                        score: 5
                    },
                    {
                        text: 'So comfortable!',
                        score: 4.5
                    }
                ]
            },
            amount: 2,
            price: 359.98,
            status: OrderStatus.InProgress
        },
        {
            id: 3,
            userId: 1,
            shopItem: {
                id: 3,
                name: 'Puma RS-X3 Puzzle',
                type: ClothingType.Casual,
                gender: Gender.Female,
                size: ClothingSize.S,
                manufacturer: 'Puma',
                productionDate: new Date(2021, 6, 1),
                price: 99.99,
                rating: 4.2,
                userReviews: [
                    {
                        text: 'Nice design!',
                        score: 4
                    },
                    {
                        text: 'A bit tight for me',
                        score: 3.5
                    }
                ]
            },
            amount: 1,
            price: 99.99,
            status: OrderStatus.Delivered
        },
        {
            id: 4,
            userId: 2,
            shopItem: {
                id: 4,
                name: 'New Balance Fresh Foam 1080v11',
                type: ClothingType.SportsWear,
                gender: Gender.Female,
                size: ClothingSize.M,
                manufacturer: 'New Balance',
                productionDate: new Date(2021, 7, 1),
                price: 149.99,
                rating: 4.6,
                userReviews: [
                    {
                        text: 'Great running shoes!',
                        score: 4.5
                    },
                    {
                        text: 'Very comfortable!',
                        score: 5
                    }
                ]
            },
            amount: 1,
            price: 149.99,
            status: OrderStatus.InProgress
        },
        {
            id: 5,
            userId: 2,
            shopItem: {
                id: 5,
                name: 'Under Armour HOVR Phantom Connected',
                type: ClothingType.SportsWear,
                gender: Gender.Male,
                size: ClothingSize.XL,
                manufacturer: 'Under Armour',
                productionDate: new Date(2021, 6, 1),
                price: 159.99,
                rating: 4.4,
                userReviews: [
                    {
                        text: 'Good shoes for running!',
                        score: 4
                    },
                    {
                        text: 'Not very durable',
                        score: 3
                    }
                ]
            },
            amount: 1,
            price: 159.99,
            status: OrderStatus.Canceled
        },
        {
            id: 6,
            userId: 2,
            shopItem: {
                id: 6,
                name: 'Reebok Classic Leather',
                type: ClothingType.Casual,
                gender: Gender.Male,
                size: ClothingSize.L,
                manufacturer: 'Reebok',
                productionDate: new Date(2021, 5, 1),
                price: 79.99,
                rating: 4.1,
                userReviews: [
                    {
                        text: 'Nice shoes!',
                        score: 4
                    },
                    {
                        text: 'A bit heavy',
                        score: 3.5
                    }
                ]
            },
            amount: 1,
            price: 79.99,
            status: OrderStatus.Delivered
        },
        {
            id: 7,
            userId: 2,
            shopItem: {
                id: 7,
                name: 'Vans Old Skool',
                type: ClothingType.Casual,
                gender: Gender.Female,
                size: ClothingSize.S,
                manufacturer: 'Vans',
                productionDate: new Date(2021, 4, 1),
                price: 59.99,
                rating: 4.3,
                userReviews: [
                    {
                        text: 'Classic shoes!',
                        score: 4.5
                    },
                    {
                        text: 'A bit narrow for me',
                        score: 3.5
                    }
                ]
            },
            amount: 1,
            price: 59.99,
            status: OrderStatus.InProgress
        },
        {
            id: 8,
            userId: 1,
            shopItem: {
                id: 8,
                name: 'ASICS GEL-Kayano 28',
                type: ClothingType.SportsWear,
                gender: Gender.Male,
                size: ClothingSize.M,
                manufacturer: 'ASICS',
                productionDate: new Date(2021, 7, 1),
                price: 179.99,
                rating: 4.7,
                userReviews: [
                    {
                        text: 'Great running shoes!',
                        score: 5
                    },
                    {
                        text: 'Very comfortable!',
                        score: 4.5
                    }
                ]
            },
            amount: 1,
            price: 179.99,
            status: OrderStatus.Delivered
        },
        {
            id: 9,
            userId: 1,
            shopItem: {
                id: 9,
                name: 'Brooks Ghost 14',
                type: ClothingType.SportsWear,
                gender: Gender.Female,
                size: ClothingSize.L,
                manufacturer: 'Brooks',
                productionDate: new Date(2021, 6, 1),
                price: 129.99,
                rating: 4.4,
                userReviews: [
                    {
                        text: 'Good shoes for running!',
                        score: 4
                    },
                    {
                        text: 'A bit tight for me',
                        score: 3.5
                    }
                ]
            },
            amount: 1,
            price: 129.99,
            status: OrderStatus.Canceled
        },
        {
            id: 10,
            userId: 3,
            shopItem: {
                id: 10,
                name: 'Converse Chuck Taylor All Star',
                type: ClothingType.Casual,
                gender: Gender.Female,
                size: ClothingSize.M,
                manufacturer: 'Converse',
                productionDate: new Date(2021, 7, 1),
                price: 59.99,
                rating: 4.0,
                userReviews: [
                    {
                        text: 'Classic shoes!',
                        score: 4
                    },
                    {
                        text: 'A bit narrow for me',
                        score: 3.5
                    }
                ]
            },
            amount: 1,
            price: 59.99,
            status: OrderStatus.InProgress
        }
    ];
    private ordersSubject = new BehaviorSubject<Order[]>(this.orders);

    getOrders() {
        return this.ordersSubject.asObservable();
    }

    removeOrder(order: Order) {
        const index = this.orders.indexOf(order);
        if (index > -1) {
            this.orders.splice(index, 1);
            this.ordersSubject.next(this.orders);
        }

    }

    changeOrderStatus(order: Order, status: OrderStatus) {
        const index = this.orders.indexOf(order);
        if (index > -1) {
            this.orders[index].status = status;
            this.ordersSubject.next(this.orders);
        }
    }

    addOrders(newOrders: Order[]) {
        this.orders = this.orders.concat(newOrders);
        this.ordersSubject.next(this.orders);
    }











}