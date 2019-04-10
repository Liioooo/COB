import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryPropertiesComponent } from './summary-properties.component';

describe('SummaryPropertiesComponent', () => {
  let component: SummaryPropertiesComponent;
  let fixture: ComponentFixture<SummaryPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
