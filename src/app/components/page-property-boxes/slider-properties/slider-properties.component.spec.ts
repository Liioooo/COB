import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderPropertysComponent } from './slider-properties.component';

describe('SliderPropertysComponent', () => {
  let component: SliderPropertysComponent;
  let fixture: ComponentFixture<SliderPropertysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderPropertysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderPropertysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
