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
import { Precioxtipohabitacion } from '../../../interfaces/precioxtipohabitacion';
import { MatDialog } from '@angular/material/dialog';
import { PrecioscComponent } from '../../components/modal/preciosc/preciosc.component';

@Component({
  selector: 'app-listprecios',
  templateUrl: './listprecios.component.html',
  styleUrls: ['./listprecios.component.css'],
})
export class ListpreciosComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  hotel!: Hoteles[];
  precioxhabitacio!: Precioxtipohabitacion[];
  ngSelect: any;
  public userlogeado: Usuario;
  hotelSeleccionadoId: number;

  public baseUrl: string = environment.baseUrl; //para mostrar la imagen

  dataSource!: _MatTableDataSource<any>;

  displayedColumns: string[] = [
    'cantidad',
    'precio',
    'tipoHabitacion',
    'acciones',
  ];
  ngOnInit(): void {
    this.LoadHotel();
  }
  constructor(
    private hotelServices: HotelesService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.userlogeado = new Usuario();
  }
  LoadHotel() {
    const idlogeado = this.authService.usuario.id;

    this.hotelServices.getusuarioxhotel(idlogeado).subscribe(
      (data) => {
        this.hotel = data;

        this.precioxhabitacio = this.hotel[0].precioxtipohabitacion;
        this.ngSelect = this.hotel[0].id;
        this.dataSource = new MatTableDataSource(this.precioxhabitacio);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onSelect(hotel: any) {
    let listprecio: any;
    this.hotelSeleccionadoId = +hotel;

    listprecio = this.hotel.filter(
      (hotel) => hotel.id === this.hotelSeleccionadoId
    );

    this.precioxhabitacio = listprecio[0].precioxtipohabitacion;

    this.dataSource = new MatTableDataSource(this.precioxhabitacio);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  EditPrecio(id: any, ide: any) {
    this.Openpopup(id, ide);
  }
  Openpopup(id: any, ide: any) {
    const _popup = this.dialog.open(PrecioscComponent, {
      width: '800px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: id,
        ide: ide,
      },
      disableClose: true,
    });
    _popup.afterClosed().subscribe((r) => {
      this.LoadHotel();
      this.ngSelect = this.hotelSeleccionadoId;
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
