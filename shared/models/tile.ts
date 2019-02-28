export class Tile {
  private _title: string;
  private _description: string;
  private _route: string;
  private _urlImage: string;

  constructor(
    title: string,
    description: string,
    route: string,
    urlImage: string,
  ) {
    this._title = title;
    this._description = description;
    this._route = route;
    this._urlImage = urlImage;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get route(): string {
    return this._route;
  }

  set route(value: string) {
    this._route = value;
  }

  get urlImage(): string {
    return this._urlImage;
  }

  set urlImage(value: string) {
    this._urlImage = value;
  }

}
