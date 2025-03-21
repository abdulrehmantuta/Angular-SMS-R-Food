import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationServiceService {

  private selectedTabSubject = new BehaviorSubject<number>(1);
  selectedTab$ = this.selectedTabSubject.asObservable();

  setSelectedTab(index: number): void {
    this.selectedTabSubject.next(index);
  }
}
