import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmtripdialogComponent } from './confirmtripdialog.component';

describe('ConfirmtripdialogComponent', () => {
  let component: ConfirmtripdialogComponent;
  let fixture: ComponentFixture<ConfirmtripdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmtripdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmtripdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
