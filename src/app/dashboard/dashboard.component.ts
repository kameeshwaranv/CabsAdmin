import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogwindowComponent } from '../shared/dialogwindow/dialogwindow.component';
import { DashboardService } from './dashboard.service';
import { DialogsComponent } from './dialogs/dialogs.component';
import { ConfirmtripdialogComponent } from './confirmtripdialog/confirmtripdialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  title = 'One Way Cab service - Admin';
  newTrips: any;
  completedTrips: any;
  paymentInfo: any;
  addPaymentFG: FormGroup;
  orderedlists: any;
  @ViewChild('tripID') tripID: ElementRef;
  newTripColumns: any = ['tripId', 'custName', 'custPhoneNo', 'custEmailID', 'pickupAddress', 'pickupTime', 'serviceType', 'dropAddress', 'carType', 'selectBtn'];
  completedTripColumns: any = ['tripId', 'custName', 'custPhoneNo', 'custEmailID', 'pickupAddress', 'pickupTime', 'serviceType', 'dropAddress', 'carType',
    'driverName', 'driverPhoneNo', 'vehicleNo', 'landmark', 'remarks'];
  paymentInfoColumns: any = ['paymentRefNo', 'paymentType', 'amount', 'vendorPhoneNo'];
  orderedListColumns: any = ['device_id', 'phone_no', 'quoted_amt', 'infobtn']
  selectedTripID: any;
  constructor(
    private services: DashboardService,
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.addPaymentFG = this._formBuilder.group({
      RefNo: [null, [Validators.required]],
      PayVia: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      vendorPhoneNo: [null, [Validators.required]]
    })

    const response = this._activatedRoute.snapshot.data['DashboardServices'];
    this.newTrips = response[0].record.list;
    this.completedTrips = response[1].record.list;
    this.paymentInfo = response[2].record.list;

  }

  addToPayment(): void {
    if (!this.addPaymentFG.invalid) {
      this.services.addNewPaymentDetail(this.addPaymentFG.value)
        .subscribe(resp => {
          console.log(resp)
          if (resp.status == 100) {
            this.dialog.open(DialogwindowComponent, {
              data: resp.record
            })
          } else {
            this.dialog.open(DialogwindowComponent, {
              data: resp.error
            })
          }
        })
    }
  }

  /** NewTrip TO Activate Trip */
  activateThisTrip(activateTrip: any) {
    let reqData = {};
    const dialogRef = this.dialog.open(DialogsComponent);
    dialogRef.afterClosed().subscribe(returnedData => {
      reqData = { ...activateTrip, ...returnedData };
      console.log(reqData)
      /***
       * PN will be send to vendor and isActivate field will be changed in newtrips saved in Activated
       */
      this.services.moveToActivate(reqData)
        .subscribe(Response => {
          if (Response.status == 100) {
            this.dialog.open(DialogwindowComponent, {
              data: 'Successfully Activated the New Trips'
            })
            this.newTrips.forEach(element => {
              if (element['_id'] == activateTrip._id)
                element['isActivated'] = true;
            });
          } else {
            this.dialog.open(DialogwindowComponent, {
              data: 'Oops!.. Something went wrong! Error: ${Response.error}'
            })
          }
        })
    })
  }
  searchOrdersByTripId() {
    console.log(this.tripID.nativeElement.value)
    const tripID = this.tripID.nativeElement.value;
    if (tripID.length == 0) {
      this.dialog.open(DialogwindowComponent, {
        data: 'Please enter valid trip ID'
      })
    } else {
      const request = { tripId: tripID }
      this.services.getOrderedList(request)
        .subscribe(response => {
          // console.log(response.resp)
          if (response.status == 100) {
            this.selectedTripID = this.tripID.nativeElement.value;
            this.orderedlists = response.resp.interestedVendor;
            console.log(this.orderedlists)
          } else {
            this.dialog.open(DialogwindowComponent, {
              data: response.error
            })
          }
        })
    }
  }

  checkThisVendorInfo(element) {
    console.log(element.device_id)
    const request = { device_id: element.device_id };
    this.services.checkProfileInfo(request)
      .subscribe(response => {
        let record = response.resp;
        record['selectedTripId'] = this.selectedTripID;
        if (response.status == 100) {
          console.log(response.resp)
          this.dialog.open(ConfirmtripdialogComponent, {
            data: record
          })
        } else {
          this.dialog.open(DialogwindowComponent, {
            data: response.error
          })
        }
      })
  }
}
