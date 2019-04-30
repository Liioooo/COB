import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorLoginProprtiesComponent } from './advisor-login-proprties.component';

describe('AdvisorLoginProprtiesComponent', () => {
  let component: AdvisorLoginProprtiesComponent;
  let fixture: ComponentFixture<AdvisorLoginProprtiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorLoginProprtiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorLoginProprtiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
