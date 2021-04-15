import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss']
})
export class DialogsComponent implements OnInit {
  @ViewChild('minAmt') minAmout: ElementRef;
  @ViewChild('note') note: ElementRef;
  constructor(public dialogRef: MatDialogRef<DialogsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  minAmtfn(): void {
    if (this.minAmout.nativeElement.value.length != 0 && this.note.nativeElement.value.length != 0) {
      let Obj = {};
      Obj['minAmout'] = this.minAmout.nativeElement.value;
      Obj['notes'] = this.note.nativeElement.value
      this.dialogRef.close(Obj);
    }
  }
}
