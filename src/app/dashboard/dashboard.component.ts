import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogwindowComponent } from '../shared/dialogwindow/dialogwindow.component';
import { DashboardService } from './dashboard.service';
import { DialogsComponent } from './dialogs/dialogs.component';

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
  newTripColumns: any = ['tripId', 'custName', 'custPhoneNo', 'custEmailID', 'pickupAddress', 'pickupTime', 'serviceType', 'dropAddress', 'carType', 'selectBtn'];
  completedTripColumns: any = ['tripId', 'custName', 'custPhoneNo', 'custEmailID', 'pickupAddress', 'pickupTime', 'serviceType', 'dropAddress', 'carType',
    'driverName', 'driverPhoneNo', 'vehicleNo', 'landmark', 'remarks'];
  paymentInfoColumns: any = ['paymentRefNo', 'paymentType', 'vendorName', 'vendorID'];
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
      RecFrom: [null, [Validators.required]],
      vendorId: [null, [Validators.required]]
    })

    const response = this._activatedRoute.snapshot.data['DashboardServices'];
    this.newTrips = response[0].record.list;
    this.completedTrips = response[1].record.list;
    this.paymentInfo = response[2].record.list;

  }
  addToPayment(): void {
    if (!this.addPaymentFG.invalid) {
      this.services.addNewPaymentDetail(this.addPaymentFG.value)
        .subscribe(data => {
          console.log(data)

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
       * PN will be send to vendor and record will be saved in Activated table
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
}
