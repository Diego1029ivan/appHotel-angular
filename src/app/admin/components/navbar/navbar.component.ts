import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  validarRol: boolean = false;
  constructor(private authService: AuthService) {}

  //ROLE_SUPADMIN
  rolSuperAdmin() {
    return this.authService.hasRole('ROLE_SUPADMIN'); //carlos
  }
  rolAdmin() {
    return this.authService.hasRole('ROLE_ADMIN'); //Sara
  }
}
