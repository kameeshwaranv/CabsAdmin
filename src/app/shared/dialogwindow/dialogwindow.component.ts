import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogwindow',
  templateUrl: './dialogwindow.component.html',
  styleUrls: ['./dialogwindow.component.scss']
})
export class DialogwindowComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogwindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  msg: string = this.data;
  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
