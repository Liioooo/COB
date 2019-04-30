import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashScreenPropertiesComponent } from './splash-screen-properties.component';

describe('SplashScreenPropertiesComponent', () => {
  let component: SplashScreenPropertiesComponent;
  let fixture: ComponentFixture<SplashScreenPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplashScreenPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashScreenPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
