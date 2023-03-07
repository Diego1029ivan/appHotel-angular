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
import { Galeria } from './../../../interfaces/galeria';
@Component({
  selector: 'app-listgaleria',
  templateUrl: './listgaleria.component.html',
  styleUrls: ['./listgaleria.component.css'],
})
export class ListgaleriaComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  hotel!: Hoteles[];
  galeria!: Galeria[];
  public userlogeado: Usuario;
  hotelSeleccionadoId: number;

  public baseUrl: string = environment.baseUrl; //para mostrar la imagen

  dataSource!: _MatTableDataSource<any>;

  displayedColumns: string[] = [
    'descripcion',
    'foto',
    'foto2',
    'foto3',
    'acciones',
  ];
  ngOnInit(): void {
    this.LoadHotel();
  }
  constructor(
    private hotelServices: HotelesService,
    private authService: AuthService
  ) {
    this.userlogeado = new Usuario();
  }
  LoadHotel() {
    const idlogeado = this.authService.usuario.id;

    this.hotelServices.getusuarioxhotel(idlogeado).subscribe(
      (data) => {
        this.hotel = data;
        this.galeria = this.hotel[0].galeria;
        this.dataSource = new MatTableDataSource(this.galeria);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onSelect(hotel: Hoteles) {
    let listgaleria: any;
    this.hotelSeleccionadoId = +hotel;
    listgaleria = this.hotel.filter(
      (hotel) => hotel.id === this.hotelSeleccionadoId
    );
    this.galeria = listgaleria[0].galeria;
    if (this.galeria.length > 0) {
      this.LoadHotel();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
