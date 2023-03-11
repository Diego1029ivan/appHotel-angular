import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ReportesService } from '../../services/reportes.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit{

  constructor(private fb:FormBuilder,
              private reporteService:ReportesService){

              }
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
  miFormulario:FormGroup = this.fb.group({  //reduce el tamño y los news
    nombre:['',[Validators.required,Validators.minLength(3)] ],//validadores sincronos, asíncronos
    email:[,[Validators.required,Validators.email,Validators.pattern(this.emailPattern)]],
    celular:[,[Validators.required,Validators.minLength(9)]],
    mnj:[,[Validators.required]]
  })

  ngOnInit(){
    this.miFormulario.reset({
      nombre:'',
      email:'',
      celular:'',
      mnj:''
    })
  }

  campoEsValido(campo:string){
    return this.miFormulario.controls[campo].errors 
           && this.miFormulario.controls[campo].touched
  }

  nombre:string
  correo:string
  asunto:string
  celular:string
  guardar(){
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched(); //revisa si todos los campos fueron toche
      return;
    }else{
      document.getElementById("enviar").classList.remove("active")
      document.getElementById("cargar").classList.add("active")
      this.nombre =this.miFormulario.controls['nombre'].value
      this.correo =this.miFormulario.controls['email'].value
      this.asunto =this.miFormulario.controls['mnj'].value
      this.celular =String(this.miFormulario.controls['celular'].value)
      this.reporteService.getEmail(this.correo,this.nombre,this.celular,this.asunto)
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
      console.log(this.nombre,this.correo,this.asunto,this.celular)
      
    }
    console.log(this.miFormulario.value)
    
    
  }
}
