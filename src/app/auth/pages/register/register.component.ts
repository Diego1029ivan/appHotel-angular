import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Usuario } from '../../../interfaces/usuario';

import { UsuariosService } from '../../../admin/service/usuarios.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  usuario: Usuario;
  errores: string[];
  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private router: Router
  ) {
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

    if (this.registerForm.value.tipousuario == 'Empresa') {
      this.usuariosService.crearteAdmin(this.usuario).subscribe(
        (response) => {
          swal.fire(
            'Registro',
            `has registrado ${this.usuario.username} con éxito!`,
            'success'
          );

          this.router.navigate(['auth/login']);
          this.registerForm.reset();
        },
        (err) => {
          swal.fire(
            'Error Registro',
            ` Algo salio mal ingrese bien tus datos !`,
            'error'
          );
        }
      );
    } else if (this.registerForm.value.tipousuario == 'Cliente') {
      this.usuariosService.crearteClient(this.usuario).subscribe(
        (response) => {
          swal.fire(
            'Registro',
            `has registrado ${this.usuario.username} con éxito!`,
            'success'
          );

          this.router.navigate(['auth/login']);
          this.registerForm.reset();
        },
        (err) => {
          swal.fire(
            'Error Registro',
            ` Algo salio mal ingrese bien tus datos !`,
            'error'
          );
        }
      );
    } else {
      console.log('seleccione un tipo de usuario');
    }
  }
}
