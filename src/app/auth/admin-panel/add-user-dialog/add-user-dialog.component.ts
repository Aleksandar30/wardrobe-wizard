import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UserService } from '../../users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from '../../user.model';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public userService: UserService,
    private snackBar: MatSnackBar,
  ) { }


  finishEditing(form: NgForm) {
    const { name, lastname, email, password, address, favoriteClothingType } = form.value;

    const user = this.userService.registerUser(name, lastname, address, email, password, favoriteClothingType);

    this.snackBar.open('User saved', 'Dismiss', {
      duration: 3000,
    });


  }


}
