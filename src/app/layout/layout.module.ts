import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { SharedModules } from '../shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, ContentComponent],
  imports: [
    CommonModule,
    SharedModules,
    RouterModule 
  ],
  exports:[
    ContentComponent,
    FooterComponent,
    ContentComponent
  ]
})
export class LayoutModule { }
