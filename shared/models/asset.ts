export class Asset {
  private _id: number;
  private _name: string;
  private _category: string;
  private _dateAcquired: string;
  private _userId: number;

  constructor(
    id: number,
    name: string,
    category: string,
    dateAcquired: string
  ) {
    this._id = id;
    this._name = name;
    this._category = category;
    this._dateAcquired = dateAcquired;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get category(): string {
    return this._category;
  }

  set category(value: string) {
    this._category = value;
  }

  get dateAcquired(): string {
    return this._dateAcquired;
  }

  set dateAcquired(value: string) {
    this._dateAcquired = value;
  }

  get userId(): number {
    return this._userId;
  }

  set userId(value: number) {
    this._userId = value;
  }
}
