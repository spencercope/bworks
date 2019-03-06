import { Injectable } from '@angular/core';
import { LoginParams, LoginResponseVm, UserClient, UserVm } from '../../app.api';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from '../../services/local-storage.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string;
  currentUser: UserVm;

  private isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private userClient: UserClient, private localStorageService: LocalStorageService) {}

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  login(vm: LoginParams): Observable<LoginResponseVm> {
    return this.userClient.login(vm).pipe(
      tap((response: LoginResponseVm) => {
        this.saveLocalLogin(response);
        this.isAuthenticated.next(true);
      }),
    );
  }

  saveLocalLogin(data: LoginResponseVm) {
    this.localStorageService.setObject('user', data.user);
    this.localStorageService.set('token', data.accessToken);
  }

  checkLocalLogin(): boolean {
    const user: UserVm = this.localStorageService.getObject('user');
    const token = this.localStorageService.get('token');

    if (Object.entries(user).length !== 0) {
      this.token = token;
      this.currentUser = user;
      this.isAuthenticated.next(true);
      return true;
    }
    this.isAuthenticated.next(false);
    return false;
  }

  clearLocalLogin() {
    this.localStorageService.remove('token');
    this.localStorageService.remove('user');
    this.localStorageService.setObject('user', null);
    this.localStorageService.set('token', null);
    this.currentUser = null;
    this.token = null;
    this.localStorageService.clear();
    this.isAuthenticated.next(false);
  }
}
