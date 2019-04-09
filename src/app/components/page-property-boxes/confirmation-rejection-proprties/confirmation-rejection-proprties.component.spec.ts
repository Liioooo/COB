import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationRejectionProprtiesComponent } from './confirmation-rejection-proprties.component';

describe('ConfirmationRejectionProprtiesComponent', () => {
  let component: ConfirmationRejectionProprtiesComponent;
  let fixture: ComponentFixture<ConfirmationRejectionProprtiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationRejectionProprtiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationRejectionProprtiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
