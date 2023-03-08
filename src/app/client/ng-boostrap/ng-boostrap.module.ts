import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe, NgFor } from '@angular/common';
import { NgbCarouselModule, NgbPaginationModule, NgbTypeaheadModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FontAwesomeModule,
    
    DecimalPipe, NgFor
    
  ],
  exports:[
    NgbCarouselModule,
    JsonPipe,
    FormsModule,
    NgbTypeaheadModule,
    DecimalPipe,
    NgbPaginationModule,
    NgbModule,
    FormsModule,
    
    
    
  ]
})
export class NgBoostrapModule { }
