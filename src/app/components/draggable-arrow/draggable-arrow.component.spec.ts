import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggableArrowComponent } from './dragable-arrow.component';

describe('DragableArrowComponent', () => {
  let component: DraggableArrowComponent;
  let fixture: ComponentFixture<DraggableArrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraggableArrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraggableArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
