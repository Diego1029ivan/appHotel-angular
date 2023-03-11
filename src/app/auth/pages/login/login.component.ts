import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../../interfaces/usuario';
import swal from 'sweetalert2';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  usuario: Usuario;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login(): void {
    this.usuario.username = this.loginForm.value.username.trim();
    this.usuario.password = this.loginForm.value.password.trim();

    this.authService.login(this.usuario).subscribe(
      (response) => {
        this.authService.guardarUsuario(response.access_token);
        this.authService.guardarToken(response.access_token);
        let usuario = this.authService.usuario;
        if (usuario.roles[0] == 'ROLE_USER') {
          this.router.navigate(['/sistema-hotel/index']);
        } else if (usuario.roles[0] == 'ROLE_ADMIN') {
          this.router.navigate(['admin/listarhotel']);
        } else if (usuario.roles[0] == 'ROLE_SUPADMIN') {
          this.router.navigate(['/admin/listarusuario']);
        }
        swal.fire(
          'Login',
          `Hola ${usuario.username}, has iniciado sesión con éxito!`,
          'success'
        );
      },
      (err) => {
        if (err.status == 400) {
          swal.fire('Error Login', 'Usuario o clave incorrectas!', 'error');
        }
      }
    );
  }
}
