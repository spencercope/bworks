import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isAuthenticated = false;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe(auth => {
      this.isAuthenticated = auth;
      console.log(this.isAuthenticated)
    });
  }

  logout() {
    this.authService.clearLocalLogin();
    this.router.navigate(['']);
  }
}
