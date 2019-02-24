import {Injectable} from '@angular/core';

enum StorageType {
  Session = 'sessionStorage',
  Local = 'localStorage'
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  storage: any;
  storageType: StorageType = StorageType.Local;
  storageEnabled = false;

  constructor() {
    if (!window.localStorage && !window.sessionStorage) {
      this.storageEnabled = false;
      return;
    }

    if (this.storageType === StorageType.Session && !window.sessionStorage) {
      this.storageEnabled = false;
      return;
    }

    if (this.storageType === StorageType.Local && !window.localStorage) {
      this.storageEnabled = false;
      return;
    }

    this.storageEnabled = true;
    this.setStorage();
  }

  useLocalStorage() {
    this.storageType = StorageType.Local;
    this.setStorage();
  }

  setStorage() {
    this.storage = this.storageType === StorageType.Session ? window.sessionStorage : window.localStorage;
  }

  set(key: string, value: string): void {
    if (this.storageEnabled) {
      this.storage[key] = value;
    }
  }

  get(key: string): string {
    if (!this.storageEnabled) {
      return '';
    }

    return this.storage[key] || false;
  }

  setObject(key: string, value: any): void {
    if (!this.storageEnabled) {
      return;
    }

    if (!value) {
      return;
    }

    this.storage[key] = JSON.stringify(value);
  }

  getObject(key: string): any {
    if (!this.storageEnabled) {
      return null;
    }
    return JSON.parse(this.storage[key] || '{}');
  }

  getValue<TType>(key: string): TType {
    if (!this.storageEnabled) {
      return null;
    }
    const obj = JSON.parse(this.storage[key] || null);
    return <TType>obj || null;
  }

  remove(key: string): any {
    if (!this.storageEnabled) {
      return null;
    }
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }
}
