  import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
  import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
  import { DashboardService } from '../dashboard.service';

  @Component({
    selector: 'app-confirmtripdialog',
    templateUrl: './confirmtripdialog.component.html',
    styleUrls: ['./confirmtripdialog.component.scss']
  })
  export class ConfirmtripdialogComponent implements OnInit {
    profileDetail: any;
    errorFlag: boolean = false;
    @ViewChild("detuctAmt") detuctAmt: ElementRef;
    @ViewChild("actualAmt") actualAmt: ElementRef;
    constructor(public dialogRef: MatDialogRef<ConfirmtripdialogComponent>,
      private services: DashboardService,
      @Inject(MAT_DIALOG_DATA) public data: any) {
      this.profileDetail = data;
    }

    ngOnInit(): void {

    }
    giveThisTrip() {
      const detuctAmt = this.detuctAmt.nativeElement.value;
      const actualTripAmout = this.actualAmt.nativeElement.value;
      if (detuctAmt.length == 0 || actualTripAmout.length == 0) {
        this.errorFlag = true;
      } else {
        this.errorFlag = false;
        const request = {
          detuctable_Amt: detuctAmt,
          actual_trip_price: actualTripAmout,
          device_id: this.profileDetail.device_id,
          trip_id: this.profileDetail.selectedTripId,
          vendor_fcm: this.profileDetail.fcm_token,
          vendorObj: this.profileDetail
        }
        this.services.confirmbooking(request)
          .subscribe(response => {
            if (response.status == 100) {
              this.dialogRef.close();
            }
          })
      }
    }
  }
