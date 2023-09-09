
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <div class="p-5 rounded shadow shadow-lg">
      <h2>{{ data.message }}</h2>
      <button class="btn btn-lg btn-success me-5" (click)="dialogRef.close(true)">Yes</button>
      <button class="btn btn-lg btn-warning ms-5" (click)="dialogRef.close(false)">No</button>
    </div>
  `,
})
export class ConfirmationDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }, public dialogRef: MatDialogRef<ConfirmationDialogComponent>) {}
}
