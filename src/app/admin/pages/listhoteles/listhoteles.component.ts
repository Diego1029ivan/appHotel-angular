import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  MatTableDataSource,
  _MatTableDataSource,
} from '@angular/material/table';
import swal from 'sweetalert2';
import { Hoteles } from 'src/app/interfaces/hoteles';
import { environment } from 'src/environments/environment';
import { HotelesService } from '../../service/hoteles.service';

@Component({
  selector: 'app-listhoteles',
  templateUrl: './listhoteles.component.html',
  styleUrls: ['./listhoteles.component.css'],
})
export class ListhotelesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  hoteles: Hoteles[];
  public baseUrl: string = environment.baseUrl;

  dataSource!: _MatTableDataSource<any>;

  displayedColumns: string[] = [
    'Dueño',
    'nombre',
    'ruc',
    'cantidadH',
    'descripH',
    'logo',
    'acciones',
  ];
  constructor(private hotelServices: HotelesService) {}

  ngOnInit(): void {
    this.LoadHoteles();
  }

  LoadHoteles() {
    this.hotelServices.getHoteles().subscribe((data) => {
      this.hoteles = data;
      this.dataSource = new MatTableDataSource(this.hoteles);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  eliminarHotel(hotel: Hoteles) {
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
              this.LoadHoteles();
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
