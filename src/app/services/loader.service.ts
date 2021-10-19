import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LoaderService {
  private _loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  get loading(): Observable<boolean> {
    return this._loading.asObservable();
  }

  constructor() {}

  show(): void {
    this._loading.next(true);
  }

  hide(): void {
    this._loading.next(false);
  }
}
