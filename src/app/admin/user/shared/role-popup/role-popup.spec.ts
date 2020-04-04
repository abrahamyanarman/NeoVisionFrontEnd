import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolePopup } from './role-popup';

describe('RolePopup', () => {
  let component: RolePopup;
  let fixture: ComponentFixture<RolePopup>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolePopup ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolePopup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
