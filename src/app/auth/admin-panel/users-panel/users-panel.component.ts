import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../user.model';
import { UserService } from '../../users.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProfileComponent } from '../../profile/profile.component';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';

@Component({
  selector: 'app-users-panel',
  templateUrl: './users-panel.component.html',
  styleUrls: ['./users-panel.component.css']
})
export class UsersPanelComponent implements OnInit, AfterViewInit {
  doFilter(filterValue: string) {
    this.users.filter = filterValue.trim().toLowerCase();
  }

  users = new MatTableDataSource<User>();

  // displayedColumns: string[] = ['id', 'role', 'name', 'lastname', 'email', 'password', 'favoriteClothingType', 'address'];
  displayedColumns: string[] = ['id', 'role', 'name', 'lastname', 'email', 'favoriteClothingType', 'address'];
  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator


  constructor(public userService: UserService, private dialog: MatDialog) { }


  ngOnInit() {
    this.userService.getUsers().subscribe((users) => {
      this.users.data = users;
    });
  }

  ngAfterViewInit(): void {
    this.users.sort = this.sort;
    this.users.paginator = this.paginator;
  }


  openProfile(userId: number) {
    const profileDialog = this.dialog.open(ProfileComponent, {
      disableClose: true,
      width: "40vw",
      data: { user: this.userService.getUserById(userId) }
    });

    profileDialog.afterClosed().subscribe(result => {

    })

  }


  openAddUserDialog() {
    const addUserDialog = this.dialog.open(AddUserDialogComponent, {
      disableClose: false,
      width: "40vw",
    });

    addUserDialog.afterClosed().subscribe(result => {

    })

  }



  addUser() {
    this.openAddUserDialog();
  }


  onRowClick(user: User) {
    this.openProfile(user.id);
  }

}
