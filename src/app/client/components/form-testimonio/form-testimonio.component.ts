import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { TestimonioService } from '../../services/testimonio.service';
import { Testimonio } from '../../../interfaces/testimonio';
import { AuthService } from 'src/app/auth/service/auth.service';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/interfaces/usuario';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-testimonio',
  templateUrl: './form-testimonio.component.html',
  styleUrls: ['./form-testimonio.component.css']
})
export class FormTestimonioComponent implements OnInit{
  constructor(private fb:FormBuilder,
    private testimonioService:TestimonioService,
            public authService: AuthService,
            private calendar: NgbCalendar,
            private router: Router){

    
    this.fecha = calendar.getToday();
		this.user=this.authService.usuario;
    
    }

    
  
  miFormulario:FormGroup = this.fb.group({  //reduce el tamño y los news
  detalle:['',[Validators.required]],
  id:[{value:'',disabled:true}],
  nombre:[{value:'',disabled:true},[Validators.required]]
  
  })

ngOnInit(){
  this.user=this.authService.usuario;
  console.log(this.user)
this.miFormulario.reset({
  nombre:this.user.username,
  id:this.user.id,
  detalle:''
})
}
logeado(): boolean {
    
  return this.authService.isAuthenticated();
}
campoEsValido(campo:string){
return this.miFormulario.controls[campo].errors 
 && this.miFormulario.controls[campo].touched
}


user:Usuario
detalle:string
fecha:NgbDateStruct

testimonioNuevo:Testimonio={
 detalle_testimonio:'',
 estado:1,
 fecha:moment("2022-08-16",'YYYY-MM-DD').toDate(),

 usuario:{
      id: 5,
      username: "lucas",
      nombre: "Ponce de León",
      apellido: "lucas",
      email: "lucas@gmail.com",
      celular: 123456789,
      password: "$2a$10$CEPldsQ7osLiIPsMeYbvjeGNCIMk.IJaakgarjICXcwESzQqyQKs2",
      enabled: 1,
      roles: [
        
    ]
 
 }
 
}

guardarTestimonio(){
if(this.miFormulario.invalid){
  this.miFormulario.markAllAsTouched(); //revisa si todos los campos fueron toche
return;
}else{
document.getElementById("enviar").classList.remove("active")
document.getElementById("cargar").classList.add("active")

this.detalle =this.miFormulario.controls['detalle'].value
this.testimonioNuevo.detalle_testimonio=this.detalle
this.testimonioNuevo.usuario['id']=Number(this.miFormulario?.controls['id'].value)
this.testimonioNuevo.fecha= moment(this.fecha).toDate();
this.testimonioService.crearTestimonio(this.testimonioNuevo,this.user.id)
          .subscribe(repos=>{
            console.log(repos)
          document.getElementById("cargar").classList.remove("active")
          document.getElementById("enviar").classList.add("active")
          this.miFormulario.reset()
          Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Su mensaje fue enviado',
          showConfirmButton: false,
          timer: 1500
          })
          })
          console.log(this.testimonioNuevo,this.user.id,this.detalle)
          this.router.navigate(['sistema-hotel/index']);
          }
          console.log(this.miFormulario.value)


          }
}
