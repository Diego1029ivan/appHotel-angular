import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Hoteles } from 'src/app/interfaces/hoteles';
import { Usuario } from 'src/app/interfaces/usuario';
import { HotelesService } from '../../services/hoteles.service';
import { Reserva } from '../../../interfaces/reserva';
import { ReservaService } from '../../services/reserva.service';
import swal from 'sweetalert2';
import * as moment from 'moment';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';





@Component({
  selector: 'app-reserva-hotel',
  templateUrl: './reserva-hotel.component.html',
  styleUrls: ['./reserva-hotel.component.css'],
  
})
export class ReservaHotelComponent implements OnInit{
  public userlogeado: Usuario;
  hoveredDate: NgbDate | null = null;

	fromDate: NgbDate;
	toDate: NgbDate | null = null;
  constructor(public authService: AuthService, private router: Router,
              private fb:FormBuilder,
              private hotelesService: HotelesService,
              private activatedRoute: ActivatedRoute,
              private reservaService: ReservaService,
              private calendar: NgbCalendar
              ) {
    this.userlogeado = new Usuario();
    this.fromDate = calendar.getToday();
		this.toDate = calendar.getNext(calendar.getToday(), 'd', 2);
    
  }

	/*PRUEBA CALENDARIO */
  
  onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
	}

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
      
		);
    
	}
  formatDate(date: NgbDate) {
    
    const myMoment: moment.Moment = moment(date);
    
    // NgbDates use 1 for Jan, Moement uses 0, must substract 1 month for proper date conversion
    var convertedMoment = myMoment.subtract(1, 'months');
    
    if (convertedMoment.isValid()) {
      return convertedMoment.format('YYYY-MM-DD');
    } else {
      return '';
    }
  }
  selectToday() {
		return this.model = this.calendar.getToday();
	}
  /************* */













  model: NgbDateStruct;
  hotelid: Hoteles 
  user:Usuario
  

  ngOnInit(): void {
    this.user=this.authService.usuario;
    console.log(this.user)
    this.miFormulario.reset({
      nombre:this.user.username,
      id:this.user.id,
      
      condiciones:true,
      recomendaciones:true,
      pagadelantado:500,
      cantidad:2,
      pago:"1",
      tipo:this.hotelid?.precioxtipohabitacion[0].id
      
    })

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

  miFormulario:FormGroup=this.fb.group({
    
    id:['',[Validators.required]],
    
    pagadelantado:['',[Validators.required]],
    cantidad:['',[Validators.required]],
    
    tipo:[null,[Validators.required]],
    pago:['',[Validators.required]],
    condiciones:[true,Validators.requiredTrue],
    recomendaciones:[true,Validators.requiredTrue]

  })
  // mostrarNombre(): string {
  //   this.userlogeado = this.authService.usuario;
  //   let rol = this.userlogeado.roles[0];
  //   return this.userlogeado.username + ' (' + rol + ')';
  // }

  
  guardar(){
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched(); //revisa si todos los campos fueron toche
      return;
    }
    console.log(this.miFormulario.value)
    this.miFormulario.reset()
  }

  arregloCosto=[]
  valorCosto(){
    if(this.miFormulario.controls['tipo']){
      for (let i = 0; i < this.hotelid?.precioxtipohabitacion.length; i++) {
        if(this.hotelid?.precioxtipohabitacion[i].id==this.miFormulario.controls['tipo'].value){
          this.arregloCosto.push(this.hotelid?.precioxtipohabitacion[i].precio)
        }
      }
      //console.log(this.arregloCosto)
      return this.arregloCosto.pop()
      
    }
    
    
  }

  arreglonombreHabitacion=[]
  nombreHab(){
    if(this.miFormulario.controls['tipo']){
      for (let i = 0; i < this.hotelid?.precioxtipohabitacion.length; i++) {
        if(this.hotelid?.precioxtipohabitacion[i].id==this.miFormulario.controls['tipo'].value){
          this.arreglonombreHabitacion.push(this.hotelid?.precioxtipohabitacion[i].tipoHabitacion)
        }
      }
      //console.log(this.arreglonombreHabitacion)
      return this.arreglonombreHabitacion.pop()
      
    }
    
    
  }
  tipoPago:string
  valorTipoPago(){
    if(this.miFormulario.controls['pago']){
      if(this.miFormulario.controls['pago'].value==1){
        this.tipoPago='Efectivo'
      }else if(this.miFormulario.controls['pago'].value==2){
        this.tipoPago='Tarjeta'
      }
           
    }
    //console.log(this.tipoPago)
    return this.tipoPago
    
  }

  campoEsValido(campo:string){
    return this.miFormulario.controls[campo].errors 
           && this.miFormulario.controls[campo].touched
  }

  
  reserva:Reserva={ 
    fechaEntrada: moment("2022-08-16",'YYYY-MM-DD').toDate(),
    fechaSalida: moment("2022-08-17",'YYYY-MM-DD').toDate(),
    adelantoReservas: 500,
    estado: 1,
    cantidadHab: 1,
    tipoPago: {
        id: 1,
        detalle_tipo:''
    },
    tipohab: {
        id: 1       
        
    }
}
  register() {
    if(this.miFormulario.valid){
      
      // console.log(this.miFormulario.controls['fechaentrada'].value,typeof(this.miFormulario.controls['fechaentrada'].value) )
      // const dateen = moment(this.miFormulario.controls['fechaentrada'].value,'YYYY-MM-DD').toDate();
      // console.log(dateen, "valor de la fecha",typeof(dateen))
      this.reserva.fechaEntrada= moment(this.formatDate(this.fromDate)).toDate();
    console.log(this.reserva.fechaEntrada)
    this.reserva.fechaSalida = moment(this.formatDate(this.toDate)).toDate();;
    this.reserva.adelantoReservas = Number(this.miFormulario?.controls['pagadelantado'].value);
    this.reserva.cantidadHab = Number(this.miFormulario?.controls['cantidad'].value);
    this.reserva.tipohab['id'] = Number(this.miFormulario?.controls['tipo'].value);
    this.reserva.tipoPago['id'] = Number(this.miFormulario?.controls['pago'].value);

    this.reservaService.crearReserva(this.reserva,this.hotelid.id,this.user.id).subscribe(
        (response) => {
          swal.fire(
            'Registro',
            `has registrado la reserva con éxito!`,
            'success'
          );

          this.router.navigate(['regiones/']);
          this.miFormulario.reset();
        },
        (err) => {
          swal.fire(
            'Error Registro',
            ` Algo salio mal ingrese bien tus datos !`,
            'error'
          );
        }
      );
      console.log(this.reserva)
  }
}
  
}
