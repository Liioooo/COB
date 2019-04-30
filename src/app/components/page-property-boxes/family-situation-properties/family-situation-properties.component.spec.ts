import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilySituationPropertiesComponent } from './family-situation-properties.component';

describe('FamilySituationPropertiesComponent', () => {
  let component: FamilySituationPropertiesComponent;
  let fixture: ComponentFixture<FamilySituationPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilySituationPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilySituationPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
