import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestNewLoanComponent } from './request-new-loan.component';

describe('RequestNewLoanComponent', () => {
  let component: RequestNewLoanComponent;
  let fixture: ComponentFixture<RequestNewLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestNewLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestNewLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
