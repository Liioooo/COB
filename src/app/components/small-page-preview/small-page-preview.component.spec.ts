import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallPagePreviewComponent } from './small-page-preview.component';

describe('SmallPagePreviewComponent', () => {
  let component: SmallPagePreviewComponent;
  let fixture: ComponentFixture<SmallPagePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallPagePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallPagePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
