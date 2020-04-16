import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingLoanRequestsComponent } from './waiting-loan-requests.component';

describe('WaitingLoanRequestsComponent', () => {
  let component: WaitingLoanRequestsComponent;
  let fixture: ComponentFixture<WaitingLoanRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingLoanRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingLoanRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
