import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InProgressOrdersComponent } from './in-progress-orders.component';

describe('InProgressOrdersComponent', () => {
  let component: InProgressOrdersComponent;
  let fixture: ComponentFixture<InProgressOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InProgressOrdersComponent]
    });
    fixture = TestBed.createComponent(InProgressOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
