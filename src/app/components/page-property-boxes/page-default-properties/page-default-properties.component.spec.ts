import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDefaultPropertiesComponent } from './page-default-properties.component';

describe('PageDefaultPropertiesComponent', () => {
  let component: PageDefaultPropertiesComponent;
  let fixture: ComponentFixture<PageDefaultPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageDefaultPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDefaultPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
