import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-agriculture',
  templateUrl: './agriculture.component.html',
  styleUrls: ['./agriculture.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class AgricultureComponent implements OnInit {
  selectedTabIndex = 0;
  encapsulation: ViewEncapsulation.None | undefined;
  videoUrl: SafeResourceUrl | undefined;
  videoUrl2: SafeResourceUrl | undefined;
  videoUrl3: SafeResourceUrl | undefined;
  videoUrl4: SafeResourceUrl | undefined;
  videoUrl5: SafeResourceUrl | undefined;
  videoUrl6: SafeResourceUrl | undefined;
  videoUrl7: SafeResourceUrl | undefined;
  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('assets/videos/agriculture.mp4');
    // this.videoUrl2 = this.sanitizer.bypassSecurityTrustResourceUrl('assets/videos/OpportunitiesinArt.mp4');
    this.videoUrl3 = this.sanitizer.bypassSecurityTrustResourceUrl('assets/videos/Commerce.mp4');
    this.videoUrl4 = this.sanitizer.bypassSecurityTrustResourceUrl('assets/videos/Fine Art.mp4');
    this.videoUrl7 = this.sanitizer.bypassSecurityTrustResourceUrl('assets/videos/UniformServices.mp4');
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const index = +params['tabIndex'];
      if (index >= 0 && index <= 7) {
        this.selectedTabIndex = index;
      }
    });
  }
}
