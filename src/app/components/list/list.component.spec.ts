import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieService } from 'src/app/services/movie.service';
import { FilterService } from 'src/app/services/filter.service';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { HarnessLoader } from '@angular/cdk/testing';
import { HttpClient} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
 
import { ListComponent } from './list.component';
import { Movie } from 'src/app/Movie';
import { Filter } from 'src/app/Filter';
import { By } from '@angular/platform-browser';


describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let filterService = jasmine.createSpyObj('FilterService', ['getSubject']);
  const moviesMock = [
    {id: "6019683cf29db7802550f198", title: "Guardians of the Galaxy", year: 2014, rank: 1,revenue: 333.13},
    {id: "6019683cf29db7802550f18c", title: "Prometheus", year: 2012, rank: 2, revenue: 126.46},
    {id: "6019683cf29db7802550f192", title: "Split", year: 2016, rank: 3, revenue: 138.12},
    {id: "6019683cf29db7802550f197", title: "Sing", year: 2016, rank: 4, revenue: 270.32},
    {id: "6019683cf29db7802550f18d", title: "Suicide Squad", year: 2016, rank: 5, revenue: 325.02},
    {id: "6019683cf29db7802550f18e", title: "The Great Wall", year: 2016, rank: 6, revenue: 45.13},
    {id: "6019683cf29db7802550f18f", title: "La La Land", year: 2016, rank: 7, revenue: 151.06},
    {id: "6019683cf29db7802550f190", title: "Mindhorn", year: 2016, rank: 8, revenue: null},
    {id: "6019683cf29db7802550f191", title: "The Lost City of Z", year: 2016, rank: 9, revenue: 8.01},
    {id: "6019683cf29db7802550f193", title: "Passengers", year: 2016, rank: 10, revenue: 100.01},
    {id: "6019683cf29db7802550f194", title: "Fantastic Beasts and Where to Find Them", year: 2016, revenue: 234.02},
    {id: "6019683cf29db7802550f196", title: "Hidden Figures", year: 2016, rank: 12, revenue: 169.27},
    {id: "6019683cf29db7802550f195", title: "Rogue One", year: 2016, rank: 13, revenue: 532.17},
    {id: "6019683cf29db7802550f199", title: "Moana", year: 2016, rank: 14, revenue: 248.75},
    {id: "6019683cf29db7802550f19a", title: "Colossal", year: 2016, rank: 15, revenue: 2.87}       
   ] as Movie[];
   let yearMockFilter = {hasFilter: true, filter: {start: 2014, end: 2014} as Filter}
   let revenueMockFilter = {hasFilter: true, filter: {} as Filter}
   let resetMockFilter = {hasFilter: false, filter: {} as Filter}
   let getMoviesSpy = null;

  beforeEach(async () => {
    const movieService = jasmine.createSpyObj('MovieService', ['getMovies']);
    getMoviesSpy = movieService.getMovies.and.returnValue(of(moviesMock))
    // const filterService = jasmine.createSpyObj('FilterService', ['getSubject']);
    // const getSubjectSpy = filterService.getSubject.and.returnValue()

    await TestBed.configureTestingModule({
      imports: [MatTableModule, MatDialogModule, HttpClientTestingModule ],
      declarations: [ ListComponent ],
      providers: [ 
        { provide: MovieService, useValue: movieService }, 
        // {provide: FilterService, useValue: filterService} 
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init movies List', () => {
    // component.ngOnInit();
    // fixture.detectChanges();
    expect(component.movies).toBe(moviesMock);
  });

  it('should scrollDown and increment movies list', () => {
    // expect(component.movies.length).toBe(15);
    component.onScrollDown(new Event('scrolled'));
    fixture.detectChanges();
    console.log(component.movies.length);
    expect(component.movies.length).toBe(30);
  });

  it('should apply top 10 filter', () => {
    component.applyOrResetFilters(revenueMockFilter)
    fixture.detectChanges();
    expect(component.movies.length).toBe(10);
    const firstRow = fixture.nativeElement.querySelector('.mat-row')
    const rows = fixture.debugElement.queryAll(By.css('.mat-row'))
    // console.log(rows[0])
    // console.log(rows[1])
    //TODO
  });
  it('should apply top 10 per year filter', () => {
    component.applyOrResetFilters(yearMockFilter)
    fixture.detectChanges();
    expect(component.movies.length).toBe(10);
    //TODO check order in table
  });
  it('should apply top 10 to movies list', () => {
    component.applyTop10(moviesMock);
    fixture.detectChanges();
    expect(component.movies.length).toBe(10);
    //TODO check order in table
  });
  it('should apply reset filter', () => {
    component.applyOrResetFilters(resetMockFilter)
    fixture.detectChanges();
    expect(component.movies).toBe(moviesMock);
    //TODO check order in table
  });


  // it('should subscribe a filter', () => {
  //   filterService.getSubject.and.returnValue(of(yearMockFilter));
  //   filterService.getSubject();
  //   fixture.detectChanges();
  //   console.log(component.movies.length)
  //   expect(component.movies).toBe(moviesMock);
  // });
});
