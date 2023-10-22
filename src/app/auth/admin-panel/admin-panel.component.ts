import { Component, OnInit } from '@angular/core';
import { UserService } from '../users.service';
import { User } from '../user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {


  constructor(
    private userService: UserService,
    private router: Router
  ) { }


  ngOnInit(): void {

    if (this.userService.currentUser?.role !== "admin") {
      this.router.navigate(["/login"]);
    }

  }





}
