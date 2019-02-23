export class Constants {
  public static API = {
    ENDPOINTS: {
      LOCAL: 'http://192.81.219.113:3000/api/',
      PROD: 'http://192.81.219.113:3000/api/',
    },
    VERBS: {
      GET: 'GET',
      PUT: 'PUT',
      POST: 'POST',
    },
    RESOURCES: {
      ASSETS: 'assets',
      LOGIN: 'users/login',
      SESSION: 'session',
      USERS: 'users',
      DONORS: 'donors',
      ITEM: 'item',
    },
  };

  public static ASSET_CATEGORIES = [
    {
      value: 'housing',
      viewValue: 'Housing',
    },
    {
      value: 'stock',
      viewValue: 'Stock',
    },
    {
      value: 'other',
      viewValue: 'Other',
    },
  ];

  public static STATES = [
    {
      value: 'Missouri',
      viewValue: 'Missouri',
    },
    {
      value: 'Iowa',
      viewValue: 'Iowa',
    },
    {
      value: 'Illinois',
      viewValue: 'Illinois',
    },
  ];
}
