import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  MatTableDataSource,
  _MatTableDataSource,
} from '@angular/material/table';
import swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { RefenciaDUbicacionService } from '../../service/refencia-dubicacion.service';
import { Ubicacion } from 'src/app/interfaces/ubicacion';

@Component({
  selector: 'app-refencia-dubicacion',
  templateUrl: './refencia-dubicacion.component.html',
  styleUrls: ['./refencia-dubicacion.component.css'],
})
export class RefenciaDUbicacionComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  referenciaHotel: Ubicacion[];

  public baseUrl: string = environment.baseUrl;

  dataSource!: _MatTableDataSource<any>;

  displayedColumns: string[] = [
    'cuidad',
    'departamento',
    'descripcionCiudad',
    'fotoCuidad',
    'pais',
    'acciones',
  ];

  constructor(private refenciaDUbicacionService: RefenciaDUbicacionService) {}

  ngOnInit(): void {
    this.LoadRefenciaHotel();
  }
  LoadRefenciaHotel() {
    this.refenciaDUbicacionService.getRefenciaDUbicacion().subscribe((data) => {
      this.referenciaHotel = data;
      this.dataSource = new MatTableDataSource(this.referenciaHotel);
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
