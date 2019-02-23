export class Constants {
  public static API = {
    ENDPOINTS: {
      LOCAL: 'http://localhost:3000/',
      PROD: 'http://192.81.219.113:3007/',
    },
    VERBS: {
      GET: 'GET',
      PUT: 'PUT',
      POST: 'POST',
    },
    RESOURCES: {
      ASSETS: 'assets',
      LOGIN: 'login',
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
