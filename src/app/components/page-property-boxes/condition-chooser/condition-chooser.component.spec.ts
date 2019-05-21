import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionChooserComponent } from './condition-chooser.component';

describe('ConditionChooserComponent', () => {
  let component: ConditionChooserComponent;
  let fixture: ComponentFixture<ConditionChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
