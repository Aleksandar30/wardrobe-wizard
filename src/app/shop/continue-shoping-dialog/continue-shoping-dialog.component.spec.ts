import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinueShopingDialogComponent } from './continue-shoping-dialog.component';

describe('ContinueShopingDialogComponent', () => {
  let component: ContinueShopingDialogComponent;
  let fixture: ComponentFixture<ContinueShopingDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContinueShopingDialogComponent]
    });
    fixture = TestBed.createComponent(ContinueShopingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
