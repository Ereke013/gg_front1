export interface Auth {
  token: string;
}

export enum StorageSecureKeyEnum {
  USERNAME = 'username',
  TOKEN = 'token',
  LANGUAGE_CODE = 'languageCode',
}

export enum StorageSecureEnumStatus {
  SUCCESS = 'success',
  REJECT = 'reject',
  INIT = 'init',
}
