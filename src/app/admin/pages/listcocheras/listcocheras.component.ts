import { Cocheras } from './../../../interfaces/cocheras';
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
import { Usuario } from 'src/app/interfaces/usuario';
import { Hoteles } from '../../../interfaces/hoteles';

@Component({
  selector: 'app-listcocheras',
  templateUrl: './listcocheras.component.html',
  styleUrls: ['./listcocheras.component.css'],
})
export class ListcocherasComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public userlogeado: Usuario;
  hotel!: Hoteles[];
  cochera!: Cocheras[];

  hotelSeleccionadoId: number;

  public baseUrl: string = environment.baseUrl; //para mostrar la imagen

  dataSource!: _MatTableDataSource<any>;

  displayedColumns: string[] = ['Descripcion', 'FotoC', 'acciones'];

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

    this.hotelServices.getusuarioxhotel(idlogeado).subscribe(
      (data) => {
        this.hotel = data;
        this.cochera = this.hotel[0].cocheras;
        this.dataSource = new MatTableDataSource(this.cochera);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSelect(cochera: Cocheras) {
    let cocher: any;
    this.hotelSeleccionadoId = +cochera;
    cocher = this.hotel.filter(
      (hotel) => hotel.id === this.hotelSeleccionadoId
    );
    this.cochera = cocher[0].cocheras;
    if (this.cochera.length > 0) {
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
