import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import swal from 'sweetalert2';
import { Usuario } from 'src/app/interfaces/usuario';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public userlogeado: Usuario;
  constructor(private authService: AuthService, private router: Router) {
    this.userlogeado = new Usuario();
  }

  mostrarNombre(): string {
    this.userlogeado = this.authService.usuario;
    let rol = this.userlogeado.roles[0];
    return this.userlogeado.username + ' (' + rol + ')';
  }
  logeado(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    swal.fire(
      'Logout',
      `Hola ${username}, has cerrado sesión con éxito!`,
      'success'
    );

    this.router.navigate(['sistema-hotel/index']);
  }
}
