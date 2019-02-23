import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { ApiHelper } from '../services/apiHelper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'BWORKS';

  constructor(private router: Router, private apiHelper: ApiHelper) {
    console.log(environment.envName);
    this.apiHelper.setEnv(environment.envName);
  }


  navToPortal() {
    this.router.navigate(['portal']);
  }
}
