import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/admin/service/usuarios.service';
@Component({
  selector: 'app-usuarios-crud',
  templateUrl: './usuarios-crud.component.html',
  styleUrls: ['./usuarios-crud.component.css'],
})
export class UsuariosCrudComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usuariosServices: UsuariosService
  ) {}
  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this.usuariosServices.getUsuario(this.data.id).subscribe((data) => {
        console.log(data);
        // this.form.patchValue(data);
      });
    }
  }
  // solo se cierra el modal cuando se da click en el boton de cerrar
  disableClose = false;

  closepopup() {
    this.dialog.closeAll();
  }
}
