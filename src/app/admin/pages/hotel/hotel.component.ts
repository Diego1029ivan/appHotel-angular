import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  MatTableDataSource,
  _MatTableDataSource,
} from '@angular/material/table';
import swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

import { AuthService } from '../../../auth/service/auth.service';
import { HotelesService } from '../../service/hoteles.service';

import { Hoteles } from 'src/app/interfaces/hoteles';
import { Usuario } from 'src/app/interfaces/usuario';
import { MatDialog } from '@angular/material/dialog';
import { HotelcComponent } from '../../components/modal/hotelc/hotelc.component';

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
    'logo',
    'fotoCiudad',
    'acciones',
  ];
  constructor(
    private hotelServices: HotelesService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.userlogeado = new Usuario();
  }

  ngOnInit(): void {
    this.LoadHotel();
  }

  LoadHotel() {
    const idlogeado = this.authService.usuario.id;
    this.hotelServices.getusuarioxhotel(idlogeado).subscribe((data) => {
      this.hotel = data;
      this.dataSource = new MatTableDataSource(this.hotel);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  Openpopup(id: any) {
    const _popup = this.dialog.open(HotelcComponent, {
      width: '800px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: id,
      },
      disableClose: true,
    });
    _popup.afterClosed().subscribe((r) => {
      this.LoadHotel();
    });
  }
  EditHotel(id: any) {
    this.Openpopup(id);
  }
  eliminarHotel(hotel: Hoteles) {
    console.log(hotel.id);
    swal
      .fire({
        title: '¿Estas seguro?',
        text: `¿Seguro que desea eliminar el Hotel ${hotel.nombre}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'Cancelar',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.hotelServices.deleteHotel(hotel.id).subscribe(
            (data) => {
              swal.fire(
                'Eliminado',
                `El Hotel ${hotel.nombre} ha sido eliminado`,
                'success'
              );
              this.LoadHotel();
            },
            (err) => {
              console.log(err);
            }
          );
        }
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
