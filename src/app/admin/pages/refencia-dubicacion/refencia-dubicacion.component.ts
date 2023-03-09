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
import { MatDialog } from '@angular/material/dialog';
import { RefeubicacionComponent } from '../../components/modal/refeubicacion/refeubicacion.component';

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

  constructor(
    private refenciaDUbicacionService: RefenciaDUbicacionService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.LoadRefenciaUbicacion();
  }
  LoadRefenciaUbicacion() {
    this.refenciaDUbicacionService.getRefenciaDUbicacion().subscribe((data) => {
      this.referenciaHotel = data;
      this.dataSource = new MatTableDataSource(this.referenciaHotel);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  Openpopup(id: any) {
    const _popup = this.dialog.open(RefeubicacionComponent, {
      width: '800px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: id,
      },
      disableClose: true,
    });
    _popup.afterClosed().subscribe((r) => {
      this.LoadRefenciaUbicacion();
    });
  }

  EditRefenciaUbicacion(id: any) {
    this.Openpopup(id);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
