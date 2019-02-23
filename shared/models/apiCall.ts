export class ApiCall {
  private _url: string;
  private _method: string;
  private _params: any;
  private _data: any;
  private _headers: Headers;
  private _resource: string;

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get method(): string {
    return this._method;
  }

  set method(value: string) {
    this._method = value;
  }

  get params(): any {
    return this._params;
  }

  set params(value: any) {
    this._params = value;
  }

  get data(): any {
    return this._data;
  }

  set data(value: any) {
    this._data = value;
  }

  get headers(): Headers {
    return this._headers;
  }

  set headers(value: Headers) {
    this._headers = value;
  }

  get resource(): string {
    return this._resource;
  }

  set resource(value: string) {
    this._resource = value;
  }
}
