import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/admin/service/usuarios.service';
import { Usuario } from 'src/app/interfaces/usuario';
@Component({
  selector: 'app-usuarios-crud',
  templateUrl: './usuarios-crud.component.html',
  styleUrls: ['./usuarios-crud.component.css'],
})
export class UsuariosCrudComponent implements OnInit {
  public editdata: any;
  usuario: Usuario;
  constructor(
    private builder: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usuariosServices: UsuariosService
  ) {
    this.usuario = new Usuario();
  }
  companyform = this.builder.group({
    usuername: this.builder.control('', Validators.required),
    nombre: this.builder.control('', Validators.required),
    apellido: this.builder.control('', Validators.required),
    gmail: this.builder.control('', Validators.email),
  });
  ngOnInit(): void {
    if (
      this.data.id != '' &&
      this.data.id != null &&
      this.data.id != undefined
    ) {
      this.usuariosServices.getUsuario(this.data.id).subscribe(
        (data) => {
          this.editdata = data;
          this.companyform.setValue({
            usuername: this.editdata.username,
            nombre: this.editdata.nombre,
            apellido: this.editdata.apellido,
            gmail: this.editdata.email,
          });
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  SaveUsuario() {
    if (this.companyform.valid) {
      this.usuario.username = this.companyform.value.usuername.trim();
      this.usuario.nombre = this.companyform.value.nombre.trim();
      this.usuario.apellido = this.companyform.value.apellido.trim();
      this.usuario.email = this.companyform.value.gmail.trim();
      this.usuario.password = null;
      this.usuario.celular = null;
      this.usuario.id = this.data.id;

      if (
        this.data.id != '' &&
        this.data.id != null &&
        this.data.id != undefined
      ) {
        this.usuariosServices.updateUsuario(this.usuario).subscribe(
          (data) => {
            this.closepopup();
            swal.fire(
              'Modificado',
              `has modificado ${this.usuario.username} con éxito!`,
              'success'
            );
          },
          (err) => {
            console.log(err);
          }
        );
      }
    }
  }

  closepopup() {
    this.dialog.closeAll();
  }
}
