import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShopItemDialogComponent } from './add-shop-item-dialog.component';

describe('AddShopItemDialogComponent', () => {
  let component: AddShopItemDialogComponent;
  let fixture: ComponentFixture<AddShopItemDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddShopItemDialogComponent]
    });
    fixture = TestBed.createComponent(AddShopItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
