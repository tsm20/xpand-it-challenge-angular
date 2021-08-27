import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'xpand-it-challenge-angular'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('xpand-it-challenge-angular');
  });

  it('should render h2 element', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const h2 = fixture.nativeElement.querySelector('h2')
    expect(h2.textContent).toContain('Movie ranking');
  });
});
