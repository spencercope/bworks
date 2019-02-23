import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { ApiHelper } from '../services/apiHelper';
import { AuthService } from 'src/services/auth-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent { 
  isLogedin: Boolean =  false;

  constructor(private router: Router, private apiHelper: ApiHelper,  private authService: AuthService) {
    console.log(environment.envName);
    this.apiHelper.setEnv(environment.envName);
  }

  ngDoCheck(): void {
    console.log("TEST:::::");
    const jwtToken = sessionStorage.getItem("jwt");
    this.isLogedin = !this.authService.checkSession(jwtToken);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const jwtToken = sessionStorage.getItem("jwt");
    this.isLogedin = !this.authService.checkSession(jwtToken);
    if(this.isLogedin){
      this.router.navigate(['portal']);
    }else{
      this.router.navigate(['login']);
    }
  }


  navToPortal() {
    if(this.isLogedin){
      sessionStorage.clear()
      this.isLogedin = false
      this.router.navigate(['login']);
    }else{
      this.router.navigate(['login']);
    }
  }
}
