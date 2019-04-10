import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectCheckboxPropertiesComponent } from './multi-select-checkbox-properties.component';

describe('MultiSelectCheckboxPropertiesComponent', () => {
  let component: MultiSelectCheckboxPropertiesComponent;
  let fixture: ComponentFixture<MultiSelectCheckboxPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiSelectCheckboxPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiSelectCheckboxPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
