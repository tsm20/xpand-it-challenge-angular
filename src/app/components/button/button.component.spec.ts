import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('inputs should contain default values', () => {
    expect(component.text).toBe('button');
    expect(component.contained).toBe(false);
  });
  
  it('should modified text of button', () => {
    component.text = 'modified';
    const button = fixture.nativeElement.querySelector('button')
    expect(button.textContent).toContain('button');  //toEqual or toBe fails Why? it shows ' button\n'
    fixture.detectChanges();
    expect(button.textContent).toContain('modified');
  });
  
  it('should modified value of contained and check different button style', () => {
    const outlinedButton = fixture.debugElement.query(By.css('.btn.outlined'));
    expect(outlinedButton).toBeTruthy();
    component.contained = true;
    fixture.detectChanges();
    const containedButton = fixture.debugElement.query(By.css('.btn.contained'));
    expect(containedButton).toBeTruthy();
  });
  
  it('show click', () => {
    spyOn(component.btnClick, 'emit');
    component.onClick();
    fixture.detectChanges();
    expect(component.btnClick.emit).toHaveBeenCalled();
  });
  
});
