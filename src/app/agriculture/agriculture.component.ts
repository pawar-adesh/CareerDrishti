import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agriculture',
  templateUrl: './agriculture.component.html',
  styleUrls: ['./agriculture.component.css']
})
export class AgricultureComponent implements OnInit {
  selectedTabIndex = 0;
  encapsulation: ViewEncapsulation.None | undefined
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const index = +params['tabIndex'];
      if (index >= 0 && index <= 7) {
        this.selectedTabIndex = index;
      }
    });
  }

}
