import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {MatMenuModule} from '@angular/material/menu';
import { FiltersComponent } from './filters.component';
import { ButtonComponent } from '../button/button.component';
import { DebugElement } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { FilterService } from 'src/app/services/filter.service';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;
  let mockButton: ButtonComponent;
  
  let createButton: DebugElement;
  let buttons: Array<any>;

  beforeEach(async () => {
    // const filterService = jasmine.createSpyObj('FilterService', ['applyFilters', 'resetFilters', 'getSubject']);

    await TestBed.configureTestingModule({
      imports: [MatMenuModule, BrowserAnimationsModule],
      declarations: [ FiltersComponent],
      // providers: [ {provide: FilterService, useValue: filterService} ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    buttons = findComponents(fixture, 'app-button')
  });

  it('menulist should have 17 elements', () => {
    expect(component.list.length).toBe(17)
  })

  it('should render both filter buttons', () => {
    expect(buttons[0]).toBeTruthy();
    expect(buttons[0].properties.text).toBe('Top 10 Revenue');
    expect(buttons[1]).toBeTruthy();
    expect(buttons[1].properties.text).toBe('Top 10 Revenue per Year');
  });
  
  it('should (click) and check different button style', () => {
    buttons[0].triggerEventHandler('click', null);
    expect(buttons[0].properties.contained).toBe(false);
    fixture.detectChanges();
    expect(buttons[0].properties.contained).toBe(true);
  });

  it('should (click) and open select year menu', () => {
    buttons[1].triggerEventHandler('click', null);
    fixture.detectChanges();
    const menu = fixture.debugElement.query(By.css('.mat-menu-content'))
    expect(menu).toBeTruthy();
  });
  
  it('should filter top 10 and check button style', () => {
    expect(buttons[0].properties.contained).toBe(false);
    component.onApplyAllTime()
    fixture.detectChanges();
    expect(buttons[0].properties.contained).toBe(true);
  });
  
  it('should filter top 10 per Year and check button style', () => {
    expect(buttons[1].properties.contained).toBe(false);
    component.onApplyPerYear(2014) 
    fixture.detectChanges();
    expect(buttons[1].properties.contained).toBe(true);
    expect(buttons[1].properties.text).toBe('Top 10 Revenue 2014');
  });
  
  it('should filter top 10 and check if reset button shows', () => {
    component.onApplyAllTime()
    fixture.detectChanges();
    const reset = fixture.debugElement.query(By.css('img'));
    expect(reset.attributes.alt).toBe('reset_filter');
  });
  
  it('should filter top 10, then reset and check buttons', () => {
    component.onApplyAllTime()
    fixture.detectChanges();
    //shows button reset
    let reset = fixture.debugElement.query(By.css('img'));
    expect(reset.attributes.alt).toBe('reset_filter');
    component.onResetFilter();
    fixture.detectChanges();
    //disappear button reset and deselect top 10 button
    reset = fixture.debugElement.query(By.css('img'));
    expect(reset).toBeNull();
    expect(buttons[0].properties.contained).toBe(false);
  });
  
  it('should filter top 10, then top 10 per year and check buttons', () => {
    component.onApplyAllTime()
    fixture.detectChanges();
    expect(buttons[0].properties.contained).toBe(true);
    component.onApplyPerYear(2010);
    fixture.detectChanges();
    expect(buttons[0].properties.contained).toBe(false);
    expect(buttons[1].properties.contained).toBe(true);
  });
  it('should filter top 10 per year, then top 10 and check buttons', () => {
    component.onApplyPerYear(2010);
    fixture.detectChanges();
    expect(buttons[1].properties.contained).toBe(true);
    component.onApplyAllTime()
    fixture.detectChanges();
    expect(buttons[0].properties.contained).toBe(true);
    expect(buttons[1].properties.contained).toBe(false);
    expect(buttons[1].properties.text).toBe('Top 10 Revenue per Year');
  });

});

export function findComponents<T>(
  fixture: ComponentFixture<T>,
  selector: string,
): DebugElement[] {
  return fixture.debugElement.queryAll(By.css(selector));
}