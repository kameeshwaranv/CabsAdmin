import { NgModule } from "@angular/core";

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import { MatListModule } from '@angular/material/list';
@NgModule({
    declarations: [],
    imports: [
        MatToolbarModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatTabsModule,
        MatTableModule,
        MatGridListModule,
        MatDialogModule,
        MatExpansionModule,
        MatIconModule,
        MatDatepickerModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatListModule
    ],
    exports: [
        MatToolbarModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatTabsModule,
        MatTableModule,
        MatGridListModule,
        MatDialogModule,
        MatExpansionModule,
        MatIconModule,
        MatDatepickerModule,
        FlexLayoutModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatListModule
    ],
    providers: [
        MatDatepickerModule
    ]
})
export class SharedModules { }