import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-agriculture',
  templateUrl: './agriculture.component.html',
  styleUrls: ['./agriculture.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class AgricultureComponent implements OnInit {
  selectedTabIndex = 0;
  encapsulation: ViewEncapsulation.None | undefined;
  videoUrl='';
  videoUrl2='';
  videoUrl3= '';
  videoUrl4= '';
  videoUrl5= '';
  videoUrl6= '';
  videoUrl7= '';
  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private titleService: Title) {
    // this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://drive.google.com/uc?export=download&id=10C5g2bUKLaZy_CiX7by0y_Zp89a4YZI6');
    // this.videoUrl2 = this.sanitizer.bypassSecurityTrustResourceUrl('https://drive.google.com/uc?export=download&id=13_OXfd0hXp74RXnggKIyFZO6eaQPpwZO');
    this.titleService.setTitle("Explore Fields | Careerdrishti");
  }

  ngOnInit(): void {
    this.videoUrl = 'https://drive.google.com/uc?export=download&id=10C5g2bUKLaZy_CiX7by0y_Zp89a4YZI6';
    this.videoUrl2 = 'https://drive.google.com/uc?export=download&id=13_OXfd0hXp74RXnggKIyFZO6eaQPpwZO';
    this.videoUrl3 = 'https://drive.google.com/uc?export=download&id=10lzYa52YjSAH___x0H-qHklsAv_yJBM0';
    this.videoUrl4 = 'https://drive.google.com/uc?export=download&id=10FPNGGf8HhK7CoFXQdkt3QB1DpOv3Q_D';
    this.videoUrl5 = 'https://drive.google.com/uc?export=download&id=13aogSuTCbeWsUhY0ABw75jy62FpYXLeb';
    this.videoUrl6 = 'https://drive.google.com/uc?export=download&id=10lPGHU8aY12_1Ry9DdkU3Kgmp45HgvvX';
    this.videoUrl7 = 'https://drive.google.com/uc?export=download&id=10n5maQEpryFkKPfSoT_GgPpuPvZ7BX5r';

    this.route.queryParams.subscribe((params) => {
      const index = +params['tabIndex'];
      if (index >= 0 && index <= 7) {
        this.selectedTabIndex = index;
      }
    });
  }
}
