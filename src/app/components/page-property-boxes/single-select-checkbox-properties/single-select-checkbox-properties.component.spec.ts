import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSelectCheckboxPropertiesComponent } from './single-select-checkbox-properties.component';

describe('SingleSelectCheckboxPropertiesComponent', () => {
  let component: SingleSelectCheckboxPropertiesComponent;
  let fixture: ComponentFixture<SingleSelectCheckboxPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleSelectCheckboxPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSelectCheckboxPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
