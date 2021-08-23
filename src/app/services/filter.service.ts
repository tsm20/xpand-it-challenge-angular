import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Filter } from '../Types';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private subject = new Subject<any>();
  private customFilter = {hasFilter: false as boolean, filter: {} as Filter}

  constructor() { }

  applyFilters(year?: number): void {
    if(year){
      this.customFilter.filter.start = year;
      this.customFilter.filter.end = year;
    } else {
      this.customFilter.filter = {};
    }
    this.customFilter.hasFilter = true;
    this.subject.next(this.customFilter);
  }
  resetFilters(): void {
    this.customFilter.filter = {};
    this.customFilter.hasFilter = false;
    this.subject.next(this.customFilter);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
