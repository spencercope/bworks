import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'bworks-client';

  constructor(private authService: AuthService, private router: Router) {
     if( !this.authService.checkLocalLogin()){
      this.router.navigate(['/auth/login']);
     };
  }
}
