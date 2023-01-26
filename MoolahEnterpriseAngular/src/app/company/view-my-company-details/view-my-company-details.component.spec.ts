import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyCompanyDetailsComponent } from './view-my-company-details.component';

describe('ViewMyCompanyDetailsComponent', () => {
  let component: ViewMyCompanyDetailsComponent;
  let fixture: ComponentFixture<ViewMyCompanyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMyCompanyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMyCompanyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
