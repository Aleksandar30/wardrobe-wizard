import { Component } from '@angular/core';
import { UserService } from '../users.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ClothingType } from 'src/app/enums';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  errorExists!: boolean;
  errorText = "";

  types = Object.values(ClothingType);

  constructor(private userService: UserService, private router: Router) { }

  private mapStatusToEnum(status: string): ClothingType {
    switch (status) {
      case 'casual':
        return ClothingType.Casual;
      case 'sports wear':
        return ClothingType.SportsWear;
      case 'official':
        return ClothingType.Official;
      default:
        throw new Error(`Invalid status: ${status}`);
    }
  }


  onSubmit(form: NgForm) {
    if (!this.userService.getUser(form.value.email)) {
      this.errorExists = false;
      var newUser = this.userService.registerUser(
        form.value.name,
        form.value.lastname,
        form.value.address,
        form.value.email,
        form.value.password,
        this.mapStatusToEnum(form.value.type)
      );
      this.router.navigate(['']);
    } else {
      this.errorExists = true;
      this.errorText = "User with this email already exists."
    }
  }


}
