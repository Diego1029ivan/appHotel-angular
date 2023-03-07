import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonio',
  templateUrl: './testimonio.component.html',
  styleUrls: ['./testimonio.component.css']
})
export class TestimonioComponent {
  title = 'hoteles';
  customOptions: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: true,
    autoplayTimeout:2000,
    animateOut:true,
    autoplayHoverPause:true,
    navSpeed: 700,
    
   
    responsive: {
      0: {
        items: 1
      },
      200: {
        items: 2
      },
      940: {
        items: 3
      }
      
    },
    nav: false
  }
}
