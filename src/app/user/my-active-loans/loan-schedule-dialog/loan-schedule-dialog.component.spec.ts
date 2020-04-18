import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanScheduleDialogComponent } from './loan-schedule-dialog.component';

describe('LoanScheduleDialogComponent', () => {
  let component: LoanScheduleDialogComponent;
  let fixture: ComponentFixture<LoanScheduleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanScheduleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanScheduleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
