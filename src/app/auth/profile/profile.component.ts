import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UserService } from '../users.service';
import { User } from '../user.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isEditing: boolean = false;
  profileForInput!: User;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private router: Router,
    public userService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  deleteUser() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Are you sure you want to delete profile?',
        buttonText: {
          ok: 'Delete',
          cancel: 'Cancel'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.userService.deleteUser(this.data.user.id);
        if (!this.userService.currentUser) {
          this.router.navigate(["/"]);
        }
      }
    });
  }


  ngOnInit(): void {
    this.profileForInput = {
      id: this.data.user.id,
      name: this.data.user.name,
      lastname: this.data.user.lastname,
      email: this.data.user.email,
      password: this.data.user.password,
      address: this.data.user.address,
      favoriteClothingType: this.data.user.favoriteClothingType,
      role: this.data.user.role


    };
  }

  finishEditing(form: NgForm) {
    this.data.user.name = this.profileForInput.name;
    this.data.user.lastname = this.profileForInput.lastname;
    this.data.user.email = this.profileForInput.email;
    this.data.user.password = this.profileForInput.password;
    this.data.user.address = this.profileForInput.address;
    this.data.user.favoriteClothingType = this.profileForInput.favoriteClothingType;
    this.data.user.role = this.profileForInput.role;

    this.snackBar.open('User saved', 'Dismiss', {
      duration: 3000,
    })
    this.isEditing = false;

  }


  logOut() {
    this.userService.currentUser = undefined;
    this.router.navigate(["/"]);
  }
}
