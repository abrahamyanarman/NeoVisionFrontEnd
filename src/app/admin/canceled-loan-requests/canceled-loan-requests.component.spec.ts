import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanceledLoanRequestsComponent } from './canceled-loan-requests.component';

describe('CanceledLoanRequestsComponent', () => {
  let component: CanceledLoanRequestsComponent;
  let fixture: ComponentFixture<CanceledLoanRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanceledLoanRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanceledLoanRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
