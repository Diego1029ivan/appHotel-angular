import { OnInit, Component } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Hoteles } from '../../../interfaces/hoteles';
import { HotelesService } from '../../service/hoteles.service';
@Component({
  selector: 'app-rutas-admin',
  templateUrl: './rutas-admin.component.html',
  styleUrls: ['./rutas-admin.component.css'],
})
export class RutasAdminComponent implements OnInit {
  hoteles: Hoteles[];
  constructor(
    private authService: AuthService,
    private hotelServices: HotelesService
  ) {}
  ngOnInit(): void {
    this.cargarHotel();
  }

  //ROLE_ADMIN
  rolAdmin() {
    return this.authService.hasRole('ROLE_ADMIN'); //Sara
  }
  cargarHotel() {
    const idlogeado = this.authService.usuario.id;
    this.hotelServices.getusuarioxhotel(idlogeado).subscribe((data) => {
      this.hoteles = data;
    });
  }
}
