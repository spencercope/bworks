import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {LoginParams} from "../../../app.api";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }


  login() {
    if (!this.username || !this.password) {
      return;
    }

    const params = new LoginParams();
    params.username = this.username;
    params.password = this.password;

    this.authService.login(params)
      .subscribe(_ => {
        this.router.navigate(['portal']);
      });
  }
}
