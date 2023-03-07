import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FontAwesomeModule
    
  ],
  exports:[
    NgbCarouselModule,
    
    
  ]
})
export class NgBoostrapModule { }
