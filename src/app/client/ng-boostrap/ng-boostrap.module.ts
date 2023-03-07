import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { allIcons } from 'ng-bootstrap-icons/icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BootstrapIconsModule.pick(allIcons),
    FontAwesomeModule
    
  ],
  exports:[
    NgbCarouselModule,
    BootstrapIconsModule
    
  ]
})
export class NgBoostrapModule { }
