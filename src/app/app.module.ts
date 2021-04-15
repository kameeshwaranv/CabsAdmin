import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModules } from './shared.module';
import { LayoutModule } from './layout/layout.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModules,
    BrowserModule,
    BrowserAnimationsModule, 
    HttpClientModule,
    FlexLayoutModule,
    
    // LayoutModule,
    
  ],
  exports:[
    SharedModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
