import { BehaviorSubject } from "rxjs";
import { ClothingType } from "../enums";
import { User } from "./user.model";

export class UserService {


    getUsers() {
        return this.usersSubjects.asObservable();
    }

    deleteUser(id: number) {
        this.dummyUserList = this.dummyUserList.filter(user => user.id != id);
        if (this.currentUser?.id == id) {
            this.currentUser = undefined;
        }
        this.usersSubjects.next(this.dummyUserList);
    }
    currentUser: User | undefined;

    checkIfUserLoggedIn() {
        return this.currentUser != undefined;
    }


    getUserById(id: number): User {

        var foundUser!: User;
        this.dummyUserList.forEach(user => {
            if (user.id == id) {
                foundUser = user;
            }
        });
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
        this.dummyUserList.forEach(user => {
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

        this.dummyUserList.push(user);

        if (this.currentUser == undefined) {
            this.currentUser = user;
        }

        this.usersSubjects.next(this.dummyUserList);


        return user;
    }

    getUser(userEmail: string): User {
        var user = this.dummyUserList.find(userToFind => userToFind.email == userEmail)!;
        return user;

    }




    isPasswordCorrect(userEmail: string, password: string): boolean {
        var hasCorrectCredentials: boolean = this.dummyUserList.find(userToFind =>
            (userToFind.email == userEmail && userToFind.password == password)) != undefined;
        if (hasCorrectCredentials) {
            this.currentUser = this.dummyUserList.find(userToFind => userToFind.email == userEmail)!;
        }
        return hasCorrectCredentials;
    }

    private dummyUserList: User[] = [
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
        {
            id: 4,
            name: 'Admin',
            role: 'admin',
            lastname: 'Admin',
            email: 'admin@mail.com',
            password: 'password789',
            favoriteClothingType: ClothingType.SportsWear,
            address: '789 Elm St, Anytown USA',
        },
    ];

    private usersSubjects = new BehaviorSubject<User[]>(this.dummyUserList);
}