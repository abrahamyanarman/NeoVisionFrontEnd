import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyActiveLoansComponent } from './my-active-loans.component';

describe('MyActiveLoansComponent', () => {
  let component: MyActiveLoansComponent;
  let fixture: ComponentFixture<MyActiveLoansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyActiveLoansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyActiveLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
