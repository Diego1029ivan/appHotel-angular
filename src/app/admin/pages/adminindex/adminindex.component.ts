import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  MatTableDataSource,
  _MatTableDataSource,
} from '@angular/material/table';
import { Rating } from 'src/app/interfaces/rating';
import { ReservaService } from '../../service/reserva.service';

@Component({
  selector: 'app-adminindex',
  templateUrl: './adminindex.component.html',
  styleUrls: ['./adminindex.component.css'],
})
export class AdminindexComponent implements OnInit {
  dataSource!: _MatTableDataSource<any>;
  rantingdata: Rating[];
  promedio: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['hotel', 'cali', 'estrellas'];
  constructor(private ranting: ReservaService) {}
  ngOnInit(): void {
    this.LoadRanting();
  }
  LoadRanting() {
    this.ranting.getAllrating().subscribe((ranting1) => {
      this.rantingdata = ranting1;
      this.calcularPrimedios();
    });
  }
  calcularPrimedios() {
    let gropedRating = this.rantingdata.reduce((r, a) => {
      let hotel = a.hotel.nombre;
      let rating = a.clasificacion;
      if (!r[hotel]) {
        r[hotel] = { hotel: hotel, rating: rating, count: 1 };
      } else {
        r[hotel].rating += rating;
        r[hotel].count++;
      }
      return r;
    }, {});
    this.promedio = {};
    for (let hotel in gropedRating) {
      let total = gropedRating[hotel].rating;

      let count = gropedRating[hotel].count;
      let promedio = total / count;
      gropedRating[hotel].rating = promedio;
      gropedRating[hotel].redondeo = Math.ceil(promedio);
    }
    let promedios = Object.values(gropedRating);
    this.dataSource = new MatTableDataSource(promedios);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
