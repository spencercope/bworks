import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {LoginParams} from "../../../app.api";
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private authService: AuthService,
              private router: Router,
              private messageSerivce: MessageService,) {
  }

  ngOnInit() {
  }


  login() {
    if (!this.username || !this.password) {
      this.messageSerivce.add({severity:'error', summary: 'Error', detail:'Enter username and password'})
      return;
    }

    const params = new LoginParams();
    params.username = this.username;
    params.password = this.password;

    this.authService.login(params)
      .subscribe(_ => {
        this.router.navigate(['portal']);
      },(error)=>{
        this.messageSerivce.add({severity:'error', summary: 'Error', detail:'Invalid username or password'})
      });
  }
}
