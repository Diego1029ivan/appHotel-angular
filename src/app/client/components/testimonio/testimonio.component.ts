import { Component, OnInit } from '@angular/core';
import { TestimonioService } from '../../services/testimonio.service';
import { Testimonio } from 'src/app/interfaces/testimonio';

@Component({
  selector: 'app-testimonio',
  templateUrl: './testimonio.component.html',
  styleUrls: ['./testimonio.component.css']
})
export class TestimonioComponent implements OnInit{

  constructor(private testimonioService:TestimonioService){}
  ngOnInit(): void {
    this.LoadTestimonio();
  }

  testimonios:Testimonio[]=[]
  ultimosTest:Testimonio[]=[]
  LoadTestimonio(){
    this.testimonioService.getTestimonio()
      .subscribe((testimonios)=>{
        this.testimonios=testimonios.reverse()
        console.log(this.testimonios)
        for (let i = 0; i < 5; i++) {
          this.ultimosTest.push(this.testimonios[i]);
          
        }
        console.log(this.ultimosTest)
      })
  }

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
        item : 1 
      } , 
      400 : { 
        item : 2 
      } , 
      740 : { 
        item : 3 
      } , 
      940 : { 
        item : 4 
      }
      
    },
    nav: false
  }
}
