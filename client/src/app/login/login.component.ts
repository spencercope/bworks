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
  model: User;

  constructor(private router: Router, private authService: AuthService) {
    this.model = new User();
  }

  ngOnInit() {}

  private navTo(route: string): void {
    this.router.navigate([route]);
  }

  public login(): void {
    console.log(this.model);
    this.authService
      .login(this.model.username, this.model.password)
      .subscribe(data => {
        this.router.navigate(['portal']);
      });
  }
}
