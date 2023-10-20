import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { Review, ShopItem } from '../shop-item.model';
import { UserService } from 'src/app/auth/users.service';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {
  onSubmit() {
    throw new Error('Method not implemented.');
  }



  averageScore: number = 0;

  get formattedAverageScore(): string {
    return this.averageScore.toFixed(2);
  }

  constructor(
    public dialogRef: MatDialogRef<ReviewsComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { item: ShopItem },
    public userService: UserService,
    private shopService: ShopService

  ) {

    this.averageScore = shopService.calculateAverageScore(data.item);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }


  addReview(form: NgForm): void {
    if (form.valid) {
      const review: Review = {
        text: form.value.text,
        score: form.value.score
      };
      this.shopService.addReview(this.data.item, review);

      this.averageScore = this.shopService.calculateAverageScore(this.data.item);
      form.resetForm();
      this.closeDialog();

    }
  }



}
