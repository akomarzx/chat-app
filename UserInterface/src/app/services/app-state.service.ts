import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  constructor() { 
    this.hasError = new BehaviorSubject<boolean>(false);
  }

  hasError : BehaviorSubject<boolean>;
}
