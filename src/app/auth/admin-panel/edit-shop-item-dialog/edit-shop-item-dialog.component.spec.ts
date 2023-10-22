import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShopItemDialogComponent } from './edit-shop-item-dialog.component';

describe('EditShopItemDialogComponent', () => {
  let component: EditShopItemDialogComponent;
  let fixture: ComponentFixture<EditShopItemDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditShopItemDialogComponent]
    });
    fixture = TestBed.createComponent(EditShopItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
