import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupComponent } from './popup.component';
import {MatDialogModule} from '@angular/material/dialog';
import { Movie } from 'src/app/Movie';
import {  MAT_DIALOG_DATA} from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

describe('PopupComponent', () => {
  let component: PopupComponent;
  let fixture: ComponentFixture<PopupComponent>;

  beforeEach(async () => {
    let movie = {
      id: "6019683cf29db7802550f198", 
      title: "Guardians of the Galaxy", 
      year: 2014, 
      rank: 1,
      actors: "Chris Pratt, Vin Diesel, Bradley Cooper, Zoe Saldana",
      description: "A group of intergalactic criminals are forced to work together to stop a fanatical warrior from taking control of the universe.",
      director: "James Gunn",
      genre: "Action,Adventure,Sci-Fi",
      metascore: 76,
      rating: 8.1,
      revenue: 333.13,
      runtime: 121,
      votes: 757074,
    } as Movie;
    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [ PopupComponent ],
      providers: [{provide: MAT_DIALOG_DATA, useValue: movie}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.animate).toBeFalse();
  });

  it('should animate with MouseOver and check elems', () => {
    let animate = fixture.debugElement.query(By.css('.animate'))
    let close = fixture.debugElement.query(By.css('.close'))
    expect(close).toBeTruthy();
    expect(animate).toBeNull();
    
    //simulates MouseOver
    component.onMouseMove(new Event('mouseover'))
    fixture.detectChanges();
    
    animate = fixture.debugElement.query(By.css('.animate'))
    close = fixture.debugElement.query(By.css('.close'))
    expect(animate).toBeTruthy();
    expect(close).toBeNull();
  });

  it('should animate with MouseLeave and check elems', () => {
    //simulates initial state as true
    component.animate = true;
    fixture.detectChanges();

    let animate = fixture.debugElement.query(By.css('.animate'))
    let close = fixture.debugElement.query(By.css('.close'))
    expect(animate).toBeTruthy();
    expect(close).toBeNull();
    
    //simulates MouseLeave
    component.onMouseLeave(new Event('mouseleave'))
    fixture.detectChanges();
    
    animate = fixture.debugElement.query(By.css('.animate'))
    close = fixture.debugElement.query(By.css('.close'))
    expect(close).toBeTruthy();
    expect(animate).toBeNull();
  });

  
});
