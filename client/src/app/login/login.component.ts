import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { User } from '../../../../shared/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: User;
  isLogedin : Boolean = false;


  constructor(private router: Router, private authService: AuthService) {
    this.user = new User();
  }

  ngOnInit() {}

  private navTo(route: string): void {
    this.router.navigate([route]);
  }

  public login(): void {
    console.log(this.user);
    this.authService
      .login(this.user.username, this.user.password)
      .subscribe(data => {
        this.router.navigate(['portal']);
      });
  }
}
