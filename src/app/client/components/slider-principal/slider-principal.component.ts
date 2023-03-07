import { Component } from '@angular/core';

@Component({
  selector: 'app-slider-principal',
  templateUrl: './slider-principal.component.html',
  styleUrls: ['./slider-principal.component.css']
})
export class SliderPrincipalComponent {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
}
