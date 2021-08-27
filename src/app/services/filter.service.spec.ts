import { TestBed } from '@angular/core/testing';

import { FilterService } from './filter.service';
import { Filter} from 'src/app/Filter';

describe('FilterService', () => {
  let service: FilterService;
  let yearFilter = {hasFilter: true, filter: {start: 2014, end: 2014} as Filter}
  let revenueFilter = {hasFilter: true, filter: {} as Filter}
  let resetFilter = {hasFilter: false, filter: {} as Filter}

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterService);
  });

  it('should apply year filter', () => {
    service.getSubject().subscribe( filter => expect(filter).toEqual(yearFilter), fail);
    service.applyFilters(2014);
  });

  it('should apply revenue filter', () => {
    service.getSubject().subscribe( filter => expect(filter).toEqual(revenueFilter), fail);
    service.applyFilters();
  });
  
  it('should reset filters', () => {
    service.getSubject().subscribe( filter => expect(filter).toEqual(resetFilter), fail);
    service.resetFilters();
  });
});
