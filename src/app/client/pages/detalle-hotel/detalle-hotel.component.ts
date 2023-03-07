import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { HotelesService } from '../../services/hoteles.service';
import { Hoteles } from '../../../interfaces/hoteles';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-hotel',
  templateUrl: './detalle-hotel.component.html',
  styleUrls: ['./detalle-hotel.component.css']
})
export class DetalleHotelComponent implements OnInit{

  public baseUrl: string = environment.baseUrl;
  hotelid: Hoteles 
  nombreHotel:string=''
  public foto:string=''
  foto2:string=''
  foto3:string=''
  constructor(private hotelesService: HotelesService,
              private activatedRoute: ActivatedRoute,
              private router:Router){}
  
  

  ngOnInit() :void {

    // Swal.fire({
    //   position: 'top-end',
    //   icon: 'success',
    //   title: 'Your work has been saved',
    //   showConfirmButton: false,
    //   timer: 1500
    // })
    
    this.activatedRoute.params
    .pipe(
      switchMap((param) => this.hotelesService.getHotelPorId(param['id'])))
    .subscribe(
        (hotel)=>{
        this.hotelid = hotel
        console.log(this.hotelid)
        
     
      }
      )
      
    }
    
  
}
