import { Review, ShopItem } from "./shop-item.model";
import { ClothingSize, Gender, ClothingType } from '../enums';
import { BehaviorSubject } from "rxjs";


export class ShopService {
    deleteShopItem(id: number) {
        this.shopItems = this.shopItems.filter(item => item.id != id);
        this.itemsSubject.next(this.shopItems);
    }



    editShopItem(itemForEdit: ShopItem) {
        this.shopItems.forEach(item => {
            if (item.id == itemForEdit.id) {
                item = itemForEdit;
            }
        });

        this.itemsSubject.next(this.shopItems);
    }


    getItemByID(id: number): any {
        var foundItem!: ShopItem;
        this.shopItems.forEach(item => {
            if (item.id == id) {
                foundItem = item;
            }
        });
        return foundItem;
    }


    addShopItem(values: { [key: string]: any; }) {
        const newItem: ShopItem = {
            id: this.findNextId(),
            name: values['name'],
            type: values['type'],
            gender: values['gender'],
            size: values['size'],
            manufacturer: values['manufacturer'],
            productionDate: values['date'],
            price: values['price'],
            rating: values['rating'],
            userReviews: []
        };



        this.shopItems.push(newItem);
        this.itemsSubject.next(this.shopItems);
        // Add the new item to your data store or make an API call to add it to a database
    }

    findNextId(): number {
        let maxId = 0;
        for (const item of this.shopItems) {
            if (item.id > maxId) {
                maxId = item.id;
            }
        }
        return maxId + 1;
    }

    addReview(item: ShopItem, review: Review) {
        item.userReviews.push(review);
        item.rating = this.calculateAverageScore(item);
    }


    calculateAverageScore(item: ShopItem): number {
        if (item.userReviews.length === 0) {
            return 0;
        }
        const sum = item.userReviews.reduce((a, b) => a + b.score, 0);
        return sum / item.userReviews.length;
    }


    getReviews(item: ShopItem): Review[] {
        return item.userReviews;
    }

    private shopItems: ShopItem[] = [
        {
            id: 1,
            name: 'Nike Air Max 90',
            type: ClothingType.SportsWear,
            gender: Gender.Male,
            size: ClothingSize.M,
            manufacturer: 'Nike',
            productionDate: new Date(2021, 5, 1),
            price: 129.99,
            rating: 2.5,
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
        {
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
        {
            id: 3,
            name: 'Under Armour HOVR Phantom Connected',
            type: ClothingType.SportsWear,
            gender: Gender.Male,
            size: ClothingSize.XL,
            manufacturer: 'Under Armour',
            productionDate: new Date(2021, 6, 1),
            price: 149.99,
            rating: 1.2,
            userReviews: [
                {
                    text: 'Good shoes, but not great',
                    score: 3.5
                },
                {
                    text: 'A bit heavy for me',
                    score: 3
                }
            ]
        },
        {
            id: 4,
            name: 'New Balance Fresh Foam 1080v11',
            type: ClothingType.SportsWear,
            gender: Gender.Male,
            size: ClothingSize.M,
            manufacturer: 'New Balance',
            productionDate: new Date(2021, 3, 1),
            price: 149.99,
            rating: 3.6,
            userReviews: [
                {
                    text: 'Great shoes for running!',
                    score: 5
                },
                {
                    text: 'Very comfortable',
                    score: 4.5
                }
            ]
        },
        {
            id: 5,
            name: 'Brooks Ghost 13',
            type: ClothingType.SportsWear,
            gender: Gender.Male,
            size: ClothingSize.L,
            manufacturer: 'Brooks',
            productionDate: new Date(2021, 2, 1),
            price: 129.99,
            rating: 2.4,
            userReviews: [
                {
                    text: 'Good shoes, but not great',
                    score: 3.5
                },
                {
                    text: 'A bit tight for me',
                    score: 3
                }
            ]
        },
        {
            id: 6,
            name: 'Asics Gel-Kayano 28',
            type: ClothingType.SportsWear,
            gender: Gender.Male,
            size: ClothingSize.XL,
            manufacturer: 'Asics',
            productionDate: new Date(2021, 1, 1),
            price: 159.99,
            rating: 4.7,
            userReviews: [
                {
                    text: 'Great shoes for running!',
                    score: 5
                },
                {
                    text: 'Very comfortable',
                    score: 4.5
                }
            ]
        },
        {
            id: 7,
            name: 'Reebok Nano X1',
            type: ClothingType.SportsWear,
            gender: Gender.Male,
            size: ClothingSize.M,
            manufacturer: 'Reebok',
            productionDate: new Date(2021, 0, 1),
            price: 119.99,
            rating: 4.3,
            userReviews: [
                {
                    text: 'Good shoes, but not great',
                    score: 3.5
                },
                {
                    text: 'A bit heavy for me',
                    score: 3
                }
            ]
        },
        {
            id: 8,
            name: 'Nike Air Zoom Pegasus 38',
            type: ClothingType.SportsWear,
            gender: Gender.Female,
            size: ClothingSize.S,
            manufacturer: 'Nike',
            productionDate: new Date(2021, 7, 1),
            price: 119.99,
            rating: 4.5,
            userReviews: [
                {
                    text: 'Great shoes for running!',
                    score: 5
                },
                {
                    text: 'Very comfortable',
                    score: 4.5
                }
            ]
        },
        {
            id: 9,
            name: 'Adidas Ultraboost 21',
            type: ClothingType.SportsWear,
            gender: Gender.Female,
            size: ClothingSize.M,
            manufacturer: 'Adidas',
            productionDate: new Date(2021, 6, 1),
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
        {
            id: 10,
            name: 'Under Armour HOVR Phantom Connected',
            type: ClothingType.SportsWear,
            gender: Gender.Female,
            size: ClothingSize.L,
            manufacturer: 'Under Armour',
            productionDate: new Date(2021, 5, 1),
            price: 149.99,
            rating: 4.2,
            userReviews: [
                {
                    text: 'Good shoes, but not great',
                    score: 3.5
                },
                {
                    text: 'A bit heavy for me',
                    score: 3
                }
            ]
        },
        {
            id: 11,
            name: 'New Balance Fresh Foam 1080v11',
            type: ClothingType.SportsWear,
            gender: Gender.Female,
            size: ClothingSize.S,
            manufacturer: 'New Balance',
            productionDate: new Date(2021, 4, 1),
            price: 149.99,
            rating: 4.6,
            userReviews: [
                {
                    text: 'Great shoes for running!',
                    score: 5
                },
                {
                    text: 'Very comfortable',
                    score: 4.5
                }
            ]
        },
        {
            id: 12,
            name: 'Brooks Ghost 13',
            type: ClothingType.SportsWear,
            gender: Gender.Female,
            size: ClothingSize.M,
            manufacturer: 'Brooks',
            productionDate: new Date(2021, 3, 1),
            price: 129.99,
            rating: 4.4,
            userReviews: [
                {
                    text: 'Good shoes, but not great',
                    score: 3.5
                },
                {
                    text: 'A bit tight for me',
                    score: 3
                }
            ]
        },
        {
            id: 13,
            name: 'Asics Gel-Kayano 28',
            type: ClothingType.SportsWear,
            gender: Gender.Female,
            size: ClothingSize.L,
            manufacturer: 'Asics',
            productionDate: new Date(2021, 2, 1),
            price: 159.99,
            rating: 4.7,
            userReviews: [
                {
                    text: 'Great shoes for running!',
                    score: 5
                },
                {
                    text: 'Very comfortable',
                    score: 4.5
                }
            ]
        },
        {
            id: 14,
            name: 'Reebok Nano X1',
            type: ClothingType.SportsWear,
            gender: Gender.Female,
            size: ClothingSize.S,
            manufacturer: 'Reebok',
            productionDate: new Date(2021, 1, 1),
            price: 119.99,
            rating: 4.3,
            userReviews: [
                {
                    text: 'Good shoes, but not great',
                    score: 3.5
                },
                {
                    text: 'A bit heavy for me',
                    score: 3
                }
            ]
        },
        {
            id: 15,
            name: 'Nike Air Max 2090',
            type: ClothingType.Casual,
            gender: Gender.Male,
            size: ClothingSize.M,
            manufacturer: 'Nike',
            productionDate: new Date(2021, 0, 1),
            price: 149.99,
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
        {
            id: 16,
            name: 'Adidas Superstar',
            type: ClothingType.Casual,
            gender: Gender.Male,
            size: ClothingSize.L,
            manufacturer: 'Adidas',
            productionDate: new Date(2021, 1, 1),
            price: 99.99,
            rating: 4.7,
            userReviews: [
                {
                    text: 'Classic shoes!',
                    score: 5
                },
                {
                    text: 'Very stylish',
                    score: 4.5
                }
            ]
        },
        {
            id: 17,
            name: 'Converse Chuck Taylor All Star',
            type: ClothingType.Casual,
            gender: Gender.Male,
            size: ClothingSize.XL,
            manufacturer: 'Converse',
            productionDate: new Date(2021, 2, 1),
            price: 79.99,
            rating: 4.2,
            userReviews: [
                {
                    text: 'Good shoes, but not great',
                    score: 3.5
                },
                {
                    text: 'A bit tight for me',
                    score: 3
                }
            ]
        },
        {
            id: 18,
            name: 'Vans Old Skool',
            type: ClothingType.Casual,
            gender: Gender.Male,
            size: ClothingSize.M,
            manufacturer: 'Vans',
            productionDate: new Date(2021, 3, 1),
            price: 89.99,
            rating: 4.4,
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
        {
            id: 19,
            name: 'Timberland 6-Inch Premium Waterproof Boots',
            type: ClothingType.Casual,
            gender: Gender.Male,
            size: ClothingSize.L,
            manufacturer: 'Timberland',
            productionDate: new Date(2021, 4, 1),
            price: 179.99,
            rating: 4.8,
            userReviews: [
                {
                    text: 'Amazing boots!',
                    score: 5
                },
                {
                    text: 'Very comfortable',
                    score: 4.5
                }
            ]
        },
        {
            id: 20,
            name: 'Dr. Martens 1460',
            type: ClothingType.Casual,
            gender: Gender.Male,
            size: ClothingSize.XL,
            manufacturer: 'Dr. Martens',
            productionDate: new Date(2021, 5, 1),
            price: 149.99,
            rating: 4.2,
            userReviews: [
                {
                    text: 'Nice boots!',
                    score: 4
                },
                {
                    text: 'A bit tight for me',
                    score: 3.5
                }
            ]
        }
    ];

    constructor() { }

    private itemsSubject = new BehaviorSubject<ShopItem[]>(this.shopItems);

    getShopItems() {
        return this.itemsSubject.asObservable();
    }
    getShopItemsC() {
        return this.shopItems;
    }
}