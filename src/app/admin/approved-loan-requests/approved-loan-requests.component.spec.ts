import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedLoanRequestsComponent } from './approved-loan-requests.component';

describe('ApprovedLoanRequestsComponent', () => {
  let component: ApprovedLoanRequestsComponent;
  let fixture: ComponentFixture<ApprovedLoanRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedLoanRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedLoanRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
