import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  MatTableDataSource,
  _MatTableDataSource,
} from '@angular/material/table';

import { AuthService } from './../../../auth/service/auth.service';
import { HotelesService } from '../../service/hoteles.service';
import { Hoteles } from '../../../interfaces/hoteles';
import { Reserva } from 'src/app/interfaces/reserva';
import { Usuario } from 'src/app/interfaces/usuario';
import { ReservaService } from '../../service/reserva.service';

@Component({
  selector: 'app-reservaxhotel',
  templateUrl: './reservaxhotel.component.html',
  styleUrls: ['./reservaxhotel.component.css'],
})
export class ReservaxhotelComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  hotel!: Hoteles[];
  reser: any;
  reservaregistrar: Reserva;
  reserva: Reserva[];
  public userlogeado: Usuario;
  hotelSeleccionadoId: number;
  ngSelect: any;
  dataSource!: _MatTableDataSource<any>;
  displayedColumns: string[] = [
    'fechaEntrada',
    'fechaSalida',
    'adelantoReservas',
    'cantidadHab',
    'cantidad_dias',
    'costo_total',
    'estado',
    'tipoPago',
    'tipohab',
    'acciones',
  ];
  constructor(
    private hotelServices: HotelesService,
    private authService: AuthService,
    private reservaService: ReservaService
  ) {
    this.userlogeado = new Usuario();
    this.reservaregistrar = new Reserva();
  }
  ngOnInit(): void {
    this.LoadReserva();
  }
  LoadReserva() {
    const idlogeado = this.authService.usuario.id;
    this.hotelServices.getusuarioxhotel(idlogeado).subscribe(
      (data) => {
        this.hotel = data;

        this.ngSelect = this.hotel[0].id;
        this.hotelSeleccionadoId = this.hotel[0].id;
        this.reservaService
          .getReservaxHotel(this.ngSelect)
          .subscribe((data) => {
            this.reserva = data;
            this.dataSource = new MatTableDataSource(this.reserva);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onSelect(hotel: Hoteles) {
    this.hotelSeleccionadoId = +hotel;

    this.reservaService
      .getReservaxHotel(this.hotelSeleccionadoId)
      .subscribe((data) => {
        this.reserva = data;
        this.dataSource = new MatTableDataSource(this.reserva);
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
  EditarReserva(idreserva: number, estado: number) {
    if (estado == 1) {
      estado = 2;
    } else {
      estado = 1;
    }
    this.reservaregistrar.estado = Number(estado);
    this.reservaService
      .updateReserva(idreserva, this.reservaregistrar )
      .subscribe(
        (data) => {
          this.reser = data;
          this.LoadReserva();
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
