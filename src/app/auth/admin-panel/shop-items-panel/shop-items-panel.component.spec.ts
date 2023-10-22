import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopItemsPanelComponent } from './shop-items-panel.component';

describe('ShopItemsPanelComponent', () => {
  let component: ShopItemsPanelComponent;
  let fixture: ComponentFixture<ShopItemsPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopItemsPanelComponent]
    });
    fixture = TestBed.createComponent(ShopItemsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
