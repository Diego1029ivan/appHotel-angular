import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Hoteles } from 'src/app/interfaces/hoteles';
import { Rating } from 'src/app/interfaces/rating';
import { Usuario } from 'src/app/interfaces/usuario';
import Swal from 'sweetalert2';
import { HotelesService } from '../../services/hoteles.service';
import { RatingService } from '../../services/rating.service';

@Component({
  selector: 'app-form-rating',
  templateUrl: './form-rating.component.html',
  styleUrls: ['./form-rating.component.css']
})
export class FormRatingComponent implements OnInit{
  constructor(private fb:FormBuilder,
    private ratingServices:RatingService,
            public authService: AuthService,
            private calendar: NgbCalendar,
            private hotelesService: HotelesService,
            private activatedRoute: ActivatedRoute,
            private router: Router){

    
    this.fecha = calendar.getToday();
		this.user=this.authService.usuario;
    
    }

    
  
  miFormulario:FormGroup = this.fb.group({  //reduce el tamño y los news
  detalle:['',[Validators.required]],
  id:[{value:'',disabled:true}],
  nombre:[{value:'',disabled:true},[Validators.required]],
  idhotel:[{value:'',disabled:true}],
  nombrehotel:[{value:'',disabled:true},[Validators.required]]
  
  })

  /*Variables*/
  hotelid: Hoteles 
  user:Usuario
  detalle:string
  fecha:NgbDateStruct
  clasificacion:Number


ngOnInit(){
  this.activatedRoute.params
  .pipe(
    switchMap((param) => this.hotelesService.getHotelPorId(param['id'])))
  .subscribe(
      (hotel)=>{
      this.hotelid = hotel
      console.log(this.hotelid)
      //console.log(this.hotelid.cantidadHabitacion, 'cantidad')
      this.user=this.authService.usuario;
        console.log(this.user)
      this.miFormulario.reset({
        nombre:this.user.username,
        id:this.user.id,
        nombrehotel:this.hotelid?.nombre,
        idhotel:this.hotelid?.id,
        detalle:''
})
    }
    )
  

 
}
logeado(): boolean {
    
  return this.authService.isAuthenticated();
}
campoEsValido(campo:string){
return this.miFormulario.controls[campo].errors 
 && this.miFormulario.controls[campo].touched
}



ratingNuevo:Rating={
 clasificacion:3.5,
 detalle:''
  
}

guardarRating(){
if(this.miFormulario.invalid){
  this.miFormulario.markAllAsTouched(); //revisa si todos los campos fueron toche
return;
}else{
document.getElementById("enviar").classList.remove("active")
document.getElementById("cargar").classList.add("active")

this.detalle =this.miFormulario.controls['detalle'].value
 this.ratingNuevo.detalle=this.detalle
 this.ratingNuevo.clasificacion=Number(this.ctrl.value)
// this.testimonioNuevo.usuario['id']=Number(this.miFormulario?.controls['id'].value)
// this.testimonioNuevo.fecha= moment(this.fecha).toDate();
 this.ratingServices.crearRating(this.ratingNuevo,this.user.id,this.hotelid.id)
          .subscribe(repos=>{
            console.log(repos)
          document.getElementById("cargar").classList.remove("active")
          document.getElementById("enviar").classList.add("active")
          this.miFormulario.reset()
          Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Su calificación fue enviado',
          showConfirmButton: false,
          timer: 1500
          })
          this.miFormulario.reset();
          this.router.navigate(['sistema-hotel/regiones']);
          })
          console.log(this.ratingNuevo,this.user.id,this.detalle)

          }
          console.log(this.miFormulario.value)


          }

          ctrl = new FormControl<number | null>(null, Validators.required);
          
          
    
}
