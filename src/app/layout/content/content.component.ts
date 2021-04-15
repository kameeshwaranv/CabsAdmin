import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { CommonServiceService } from '../../commonFloor/common-service.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  title = 'One Way Cab service - Admin';
  status: boolean;
  isHeaderRequired: boolean = true;
  constructor(private router: Router, 
    private common: CommonServiceService) {
      
    this.status = this.common.loginStatus
    // string path from root to current route. i.e /Root/CurrentRoute
    this.router.events.subscribe((event: Event) => {
      // console.log(event);
      if (event instanceof NavigationStart && (event.url == '/' || event.url == '/home')) {
        this.isHeaderRequired = false;
      }
    });

  }

  ngOnInit(): void {
  }

}
