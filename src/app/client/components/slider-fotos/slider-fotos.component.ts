import { Component } from '@angular/core';

@Component({
  selector: 'app-slider-fotos',
  templateUrl: './slider-fotos.component.html',
  styleUrls: ['./slider-fotos.component.css']
})
export class SliderFotosComponent {
  title = 'hoteles';
  customOptions: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: true,
    autoplayTimeout:1500,
    animateOut:true,
    autoplayHoverPause:true,
    navSpeed: 700,
   
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }
}
