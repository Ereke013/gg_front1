import { BehaviorSubject } from 'rxjs';
import { StorageSecureEnumStatus } from '@finance-web/models/auth';

export abstract class StorageSecure {

  public secureStorageInitial: BehaviorSubject<string> = new BehaviorSubject<string>(StorageSecureEnumStatus.INIT);

  abstract createSecureStorage(onSuccess?: Function): Promise<void>;

  abstract setItem(key: string, value: string): Promise<string>;

  abstract getItem(key: string): Promise<string>;

  abstract removeItem(key: string): Promise<any>;

  abstract getAllKeys(): Promise<string[]>;

  abstract clear(): Promise<void>;

}
