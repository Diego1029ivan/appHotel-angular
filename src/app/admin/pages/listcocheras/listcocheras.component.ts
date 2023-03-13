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
import { CocheracComponent } from '../../components/modal/cocherac/cocherac.component';
import { MatDialog } from '@angular/material/dialog';

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
  ngSelect: any;
  hotelSeleccionadoId: number;

  public baseUrl: string = environment.baseUrl; //para mostrar la imagen

  dataSource!: _MatTableDataSource<any>;

  displayedColumns: string[] = ['Descripcion', 'FotoC', 'acciones'];

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

    this.hotelServices.getusuarioxhotel(idlogeado).subscribe(
      (data) => {
        this.hotel = data;
        this.cochera = this.hotel[0].cocheras;
        this.ngSelect = this.hotel[0].id;
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

    this.dataSource = new MatTableDataSource(this.cochera);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  EditCochera(id: any, ide: any) {
    this.Openpopup(id, ide);
  }
  Openpopup(id: any, ide: any) {
    const _popup = this.dialog.open(CocheracComponent, {
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
