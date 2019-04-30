import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MiniPageMenuComponent} from './mini-page-menu.component';

describe('MiniPageMenuComponent', () => {
  let component: MiniPageMenuComponent;
  let fixture: ComponentFixture<MiniPageMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MiniPageMenuComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniPageMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
