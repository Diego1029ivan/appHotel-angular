import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Usuario } from 'src/app/interfaces/usuario';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
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
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['../sistema-hotel/index']);
  }
}
//andres   (ROLE_USER)
