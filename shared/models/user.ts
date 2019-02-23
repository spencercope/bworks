export class User {
  private _id: number;
  private _username: string;
  private _password?: string;
  private _accessToken: string;

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get accessToken() {
    return this._accessToken;
  }

  set accessToken(value: string) {
    this._accessToken = value;
  }
}
