import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Hoteles } from '../../../interfaces/hoteles';
import { Usuario } from 'src/app/interfaces/usuario';
import {
  MatTableDataSource,
  _MatTableDataSource,
} from '@angular/material/table';
import { Piscinas } from 'src/app/interfaces/piscinas';
import { environment } from 'src/environments/environment';
import { HotelesService } from '../../service/hoteles.service';
import { AuthService } from './../../../auth/service/auth.service';

@Component({
  selector: 'app-listpicina',
  templateUrl: './listpicina.component.html',
  styleUrls: ['./listpicina.component.css'],
})
export class ListpicinaComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public userlogeado: Usuario;
  hotel!: Hoteles[];
  picina!: Piscinas[];
  hotelSeleccionadoId: number;

  public baseUrl: string = environment.baseUrl; //para mostrar la imagen

  dataSource!: _MatTableDataSource<any>;
  displayedColumns: string[] = [
    'descripcionPicina',
    'fotoPicina',
    'horarioCierre',
    'horarioInicio',
    'precioPicina',
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

    this.hotelServices.getusuarioxhotel(idlogeado).subscribe(
      (data) => {
        this.hotel = data;
        this.picina = this.hotel[0].piscinas;
        // console.log(this.hotel);
        this.dataSource = new MatTableDataSource(this.picina);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSelect(picina: Piscinas) {
    let picinal: any;

    this.hotelSeleccionadoId = +picina;
    picinal = this.hotel.filter(
      (hotel) => hotel.id === this.hotelSeleccionadoId
    );

    this.picina = picinal[0].piscinas;
    console.log(this.picina);
    if (this.picina.length > 0) {
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
