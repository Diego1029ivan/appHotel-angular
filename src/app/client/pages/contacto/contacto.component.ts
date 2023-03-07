import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit{

  constructor(private fb:FormBuilder){}

  miFormulario:FormGroup = this.fb.group({  //reduce el tamño y los news
    nombre:['',[Validators.required,Validators.minLength(3)] ],//validadores sincronos, asíncronos
    email:[,[Validators.required]],
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

  guardar(){
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched(); //revisa si todos los campos fueron toche
      return;
    }
    console.log(this.miFormulario.value)
    this.miFormulario.reset()
  }
}
