import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosService } from '../../service/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;
  usuarios: Usuario[];

  finaldata: any;

  constructor(private usuariosServices: UsuariosService) {}

  displayedColumns: string[] = [
    'username',
    'nombre',
    'apellido',
    'email',
    'rol',
    'acciones',
  ];

  ngOnInit(): void {
    this.LoadUsuarios();
  }

  LoadUsuarios() {
    this.usuariosServices.getUsuarios().subscribe((data) => {
      this.usuarios = data;
      this.finaldata = new MatTableDataSource(this.usuarios);
      this.finaldata.paginator = this._paginator;
      this.finaldata.sort = this._sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.finaldata.filter = filterValue.trim().toLowerCase();

    if (this.finaldata.paginator) {
      this.finaldata.paginator.firstPage();
    }
  }
}
