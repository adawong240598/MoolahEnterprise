import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCurrentPayableComponent } from './view-current-payable.component';

describe('ViewCurrentPayableComponent', () => {
  let component: ViewCurrentPayableComponent;
  let fixture: ComponentFixture<ViewCurrentPayableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCurrentPayableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCurrentPayableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
