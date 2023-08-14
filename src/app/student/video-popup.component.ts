import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-video-popup',
  template: `
    <iframe
      [src]="data.videoUrl"
      width="560"
      height="315"
      frameborder="0"
      allowfullscreen
    ></iframe>
  `,
})
export class VideoPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<VideoPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { videoUrl: string }
  ) {}
}
