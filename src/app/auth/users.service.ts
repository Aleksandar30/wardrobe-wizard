import { Order } from "../cart/order.model";
import { ClothingSize, ClothingType, Gender, OrderStatus } from "../enums";
import { ShopItem } from "../shop/shop-item.model";
import { User } from "./user.model";

export class UserService {

    deleteUser(id: number) {
        UserService.dummyUserList = UserService.dummyUserList.filter(user => user.id != id);
        this.currentUser = undefined;
    }
    currentUser: User | undefined;

    checkIfUserLoggedIn() {
        return this.currentUser != undefined;
    }


    getUserById(id: number): User {

        var foundUser!: User;
        UserService.dummyUserList.forEach(user => {
            if (user.id == id) {
                foundUser = user;
            }
        });

        this.currentUser = foundUser;
        return foundUser;
    }

    registerUser(
        name: string,
        lastname: string,
        address: string,
        email: string,
        password: string,
        type: ClothingType): User {
        var maxId: number = 0;
        UserService.dummyUserList.forEach(user => {
            if (maxId < user.id) {
                maxId = user.id;
            }
        })



        var id = ++maxId;

        var user: User = {
            id,
            name,
            lastname,
            address,
            email,
            password,
            favoriteClothingType: type,

        }

        UserService.dummyUserList.push(user);

        this.currentUser = user;


        return user;
    }

    getUser(userEmail: string): User {
        var user = UserService.dummyUserList.find(userToFind => userToFind.email == userEmail)!;
        return user;

    }

    isPasswordCorrect(userEmail: string, password: string): boolean {
        var hasCorrectCredentials: boolean = UserService.dummyUserList.find(userToFind =>
            (userToFind.email == userEmail && userToFind.password == password)) != undefined;
        if (hasCorrectCredentials) {
            this.currentUser = UserService.dummyUserList.find(userToFind => userToFind.email == userEmail)!;
        }
        return hasCorrectCredentials;
    }

    static dummyUserList: User[] = [
        {
            id: 1,
            name: 'John',
            lastname: 'Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            favoriteClothingType: ClothingType.Casual,
            address: '123 Main St, Anytown USA',
        },
        {
            id: 2,
            name: 'Jane',
            lastname: 'Doe',
            email: 'janedoe@example.com',
            password: 'password456',
            favoriteClothingType: ClothingType.SportsWear,

            address: '456 Oak St, Anytown USA',
        },
        {
            id: 3,
            name: 'Bob',
            lastname: 'Smith',
            email: 'bobsmith@example.com',
            password: 'password789',
            favoriteClothingType: ClothingType.SportsWear,
            address: '789 Elm St, Anytown USA',
        },
    ];
}