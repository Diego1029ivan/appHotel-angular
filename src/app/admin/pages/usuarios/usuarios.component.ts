import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import swal from 'sweetalert2';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosService } from '../../service/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { UsuariosCrudComponent } from '../../components/modal/usuarios-crud/usuarios-crud.component';

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

  constructor(
    private usuariosServices: UsuariosService,
    private dialog: MatDialog
  ) {}

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

  Openpopup(id: any) {
    const _popup = this.dialog.open(UsuariosCrudComponent, {
      width: '600px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: id,
      },
      disableClose: true,
    });
    _popup.afterClosed().subscribe((r) => {
      this.LoadUsuarios();
    });
  }
  editar(id: any) {
    this.Openpopup(id);
  }

  eliminar(id: any) {
    swal
      .fire({
        title: '¿Estas seguro?',
        text: 'No podras revertir esta acción',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'Cancelar',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.usuariosServices.deleteUsuario(id).subscribe(
            (data) => {
              console.log(data);
              swal.fire('Eliminado', 'El usuario ha sido eliminado', 'success');
              this.LoadUsuarios();
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
    this.finaldata.filter = filterValue.trim().toLowerCase();

    if (this.finaldata.paginator) {
      this.finaldata.paginator.firstPage();
    }
  }
}
