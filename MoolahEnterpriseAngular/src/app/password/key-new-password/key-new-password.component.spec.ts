import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyNewPasswordComponent } from './key-new-password.component';

describe('KeyNewPasswordComponent', () => {
  let component: KeyNewPasswordComponent;
  let fixture: ComponentFixture<KeyNewPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyNewPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyNewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
