import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-rutas-super-admin',
  templateUrl: './rutas-super-admin.component.html',
  styleUrls: ['./rutas-super-admin.component.css'],
})
export class RutasSuperAdminComponent {
  constructor(private authService: AuthService) {}

  //ROLE_SUPADMIN
  rolSuperAdmin() {
    return this.authService.hasRole('ROLE_SUPADMIN'); //carlos
  }
}
