import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  MatTableDataSource,
  _MatTableDataSource,
} from '@angular/material/table';

import { environment } from 'src/environments/environment';

import { AuthService } from './../../../auth/service/auth.service';
import { HotelesService } from '../../service/hoteles.service';

import { Hoteles } from 'src/app/interfaces/hoteles';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css'],
})
export class HotelComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  hotel: Hoteles[];
  public userlogeado: Usuario;
  panelOpenState = false;

  public baseUrl: string = environment.baseUrl;

  dataSource!: _MatTableDataSource<any>;

  displayedColumns: string[] = [
    'nombre',
    'ruc',
    'cantidadH',
    'descripH',
    'ciudad',
    'fotoCiudad',
    'acciones',
  ];
  constructor(
    private hotelServices: HotelesService,
    private authService: AuthService
  ) {
    this.userlogeado = new Usuario();
  }

  ngOnInit(): void {
    this.LoadHotel();
  }

  LoadHotel() {
    const idlogeado = this.authService.usuario.id;
    this.hotelServices.getHoteles().subscribe((data) => {
      this.hotel = data.filter((hotel) => hotel.usuario.id === idlogeado);
      this.dataSource = new MatTableDataSource(this.hotel);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
