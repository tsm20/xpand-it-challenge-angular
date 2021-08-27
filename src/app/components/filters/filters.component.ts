import { Component, OnInit } from '@angular/core';
import { FilterService } from 'src/app/services/filter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  filter: boolean = false;
  allTime: boolean = false;
  year: number = 0;
  allTimeButtonText: string = 'Top 10 Revenue';
  yearButtonText: string = "Top 10 Revenue per Year";
  subscription: Subscription;
  list: Array<number> = [];

  constructor(private filterService: FilterService) {
    this.subscription = this.filterService
      .getSubject()
      .subscribe((filter) => (this.filter = filter.hasFilter));
    
    for (let index = 2016; index >= 2000; index--) {
     this.list.push(index);
    }
   }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  onApplyAllTime() {
    this.allTime = true;
    this.year = 0;
    this.yearButtonText = `Top 10 Revenue per Year`
    this.filterService.applyFilters();
  }
  onApplyPerYear(year: number) {
    this.allTime = false;
    this.filterService.applyFilters(year);
    this.yearButtonText = `Top 10 Revenue ${year}`
    this.year = year;
  }
  
  onResetFilter() {
    this.allTime = false;
    this.year = 0;
    this.yearButtonText = `Top 10 Revenue per Year`
    this.filterService.resetFilters();
  }

}
