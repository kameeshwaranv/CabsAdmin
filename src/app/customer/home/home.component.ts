import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from '../../commonFloor/http.service';
import { DialogwindowComponent } from '../../shared/dialogwindow/dialogwindow.component';
import { HomeService } from './home.service';
// import { HttpService } from '../commonFloor/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  bookingFrom: FormGroup;
  isError: boolean = false;
  @ViewChildren('menuBlock') menus: QueryList<ElementRef>;
  hours = 5;
  hours2 = [];
  minutes = 8;
  selected = 'ANY';
  curDate = new Date();
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    public dialog: MatDialog,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    for (let i = 0; i <= 23; i++) {
      this.hours2.push(`${i}:00`);
    }
    this.hours = this.curDate.getHours();
    this.minutes = this.curDate.getMinutes();

    this.bookingFrom = this.formBuilder.group({
      custName: [null, [Validators.required]],
      custPhoneNo: [null, [Validators.required]],
      pickupAddress: [null, [Validators.required]],
      dropAddress: [null, [Validators.required]],
      serviceType: [null, [Validators.required]],
      carType: [null, [Validators.required]],
      pickUpdate: [null, [Validators.required]],
    })
  }
  menuSelected(menuIndex: number): void {
    const _menu = this.menus.toArray();
    if (menuIndex == 0) {
      _menu[menuIndex].nativeElement.style.display = 'block';
      _menu[1].nativeElement.style.display = 'none';
    } else {
      _menu[menuIndex].nativeElement.style.display = 'block';
      _menu[0].nativeElement.style.display = 'none';
      //servicetype  cartype
    }
  }

  bookNew(): void {
    if (this.bookingFrom.invalid) {
      this.isError = true;
    } else {
      this.isError = false;
      let requestData = this.bookingFrom.value;
      requestData.pickupTime = this.hours + ':' + this.minutes;
      this.homeService.confirmBooking(requestData)
        .subscribe(Response => {
          console.log(Response.status)
          let _Status = (Response.status == 100) ? 'Thanks for using our Service. Our Customer executive will reach you imediately. You can also reach us by +91-9739377457.' : 'Somethng went wrong!. Kindly contact +91-9739377457 for direct booking. Sorry for inconvinience.'
          this.dialog.open(DialogwindowComponent, {
            data: _Status
          })
        })
    }
  }


  /// TIMER

  increaseHours() {
    this.hours++;
    if (this.hours >= 24) {
      this.hours = 0;
    }
  }

  decreaseHours() {
    if (this.hours) {
      this.hours--;
    } else {
      this.hours = 23;
    }
  }

  increaseMinutes() {
    this.minutes++;
    if (this.minutes === 60) {
      this.minutes = 0;
      this.increaseHours();
    }
  }

  decreaseMinutes() {
    if (this.minutes) {
      this.minutes--;
    } else {
      this.minutes = 59;
      this.decreaseHours();
    }
  }

}
