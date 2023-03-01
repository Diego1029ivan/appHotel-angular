import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../../interfaces/usuario';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  usuario: Usuario;
  constructor(private fb: FormBuilder) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      tipousuario: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  register() {
    this.usuario.username = this.registerForm.value.username.trim();
    this.usuario.password = this.registerForm.value.password.trim();
    this.usuario.nombre = this.registerForm.value.nombre.trim();
    this.usuario.apellido = this.registerForm.value.apellido.trim();
    this.usuario.celular = this.registerForm.value.celular;
    this.usuario.email = this.registerForm.value.email.trim();
    console.log(this.usuario);
  }
}
