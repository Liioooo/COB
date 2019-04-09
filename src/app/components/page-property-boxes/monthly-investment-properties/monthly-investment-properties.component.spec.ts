import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyInvestmentPropertiesComponent } from './monthly-investment-properties.component';

describe('MonthlyInvestmentPropertiesComponent', () => {
  let component: MonthlyInvestmentPropertiesComponent;
  let fixture: ComponentFixture<MonthlyInvestmentPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyInvestmentPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyInvestmentPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
