import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { HotelesService } from '../../services/hoteles.service';
import { Hoteles } from '../../../interfaces/hoteles';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Bares } from '../../../interfaces/bares';
import { Piscinas } from '../../../interfaces/piscinas';
import { Cocheras } from '../../../interfaces/cocheras';
import { Precioxtipohabitacion } from '../../../interfaces/precioxtipohabitacion';
import { RatingService } from '../../services/rating.service';
import { Rating } from 'src/app/interfaces/rating';


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
              private router:Router,
              private ratingService : RatingService){}
  
  
  Arraybares:Bares[]=[]
  Arraypiscina:Piscinas[]=[]
  Arraycochera:Cocheras[]=[]
  Arrayprecio:Precioxtipohabitacion[]=[]

  ratingTotal:Rating[]=[]
  ratingHotel:Rating[]=[]
  promedio:number=0
  valor
  ngOnInit() :void {
    
    this.activatedRoute.params
    .pipe(
      switchMap((param) => this.hotelesService.getHotelPorId(param['id'])))
    .subscribe(
        (hotel)=>{
        this.hotelid = hotel
        console.log(this.hotelid)
        //console.log(this.hotelid.cantidadHabitacion, 'cantidad')

        this.Arraybares = this.hotelid.bares
        this.Arraypiscina = this.hotelid.piscinas
        this.Arraycochera = this.hotelid.cocheras
        this.Arrayprecio = this.hotelid.precioxtipohabitacion
        
        
          this.ratingService.getRating()
              .subscribe((rating)=>{
                this.ratingTotal=rating
                
                for(let i = 0 ; i < this.ratingTotal.length ; i++){
                  (this.ratingTotal[i].hotel.id==this.hotelid.id)?this.ratingHotel.push(this.ratingTotal[i]):false
                }
      
               
                for(let j = 0 ; j < this.ratingHotel.length ; j++){
                  this.promedio+=this.ratingHotel[j].clasificacion
                }
               
                this.valor= Math.ceil(Number((this.promedio/this.ratingHotel.length).toFixed(2)) )
                console.log(this.valor)
                
              })
        }
      
      
      )
      
      
      
    }
   
    
    
    
  
}
