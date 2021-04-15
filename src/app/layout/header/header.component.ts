import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../../commonFloor/common-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = 'One Way Cab service - Admin';
  status: boolean;
  constructor(
    private common: CommonServiceService
  ) {
    this.status = this.common.loginStatus
  }

  ngOnInit(): void {
  }

}
