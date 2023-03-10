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
import { Bares } from './../../../interfaces/bares';
import { MatDialog } from '@angular/material/dialog';
import { BarcComponent } from '../../components/modal/barc/barc.component';

@Component({
  selector: 'app-listbares',
  templateUrl: './listbares.component.html',
  styleUrls: ['./listbares.component.css'],
})
export class ListbaresComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  hotel!: Hoteles[];
  bares!: Bares[];
  public userlogeado: Usuario;
  hotelSeleccionadoId: number;

  public baseUrl: string = environment.baseUrl; //para mostrar la imagen

  dataSource!: _MatTableDataSource<any>;

  displayedColumns: string[] = ['Description', 'Foto', 'acciones'];
  constructor(
    private hotelServices: HotelesService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.userlogeado = new Usuario();
  }

  ngOnInit(): void {
    this.LoadBar();
  }

  LoadBar() {
    const idlogeado = this.authService.usuario.id;

    this.hotelServices.getusuarioxhotel(idlogeado).subscribe(
      (data) => {
        this.hotel = data;
        this.bares = this.hotel[0].bares;
        this.dataSource = new MatTableDataSource(this.bares);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  EditBar(id: any) {
    this.Openpopup(id);
  }
  onSelect(hotel: Hoteles) {
    let bar: any;
    this.hotelSeleccionadoId = +hotel;
    bar = this.hotel.filter((hotel) => hotel.id === this.hotelSeleccionadoId);
    this.bares = bar[0].bares;
    if (this.bares.length > 0) {
      this.LoadBar();
    }
  }

  Openpopup(id: any) {
    const _popup = this.dialog.open(BarcComponent, {
      width: '800px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: id,
      },
      disableClose: true,
    });
    _popup.afterClosed().subscribe((r) => {
      this.LoadBar();
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
