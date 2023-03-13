import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, MinValidator, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { Hoteles } from 'src/app/interfaces/hoteles';
import { HotelesService } from 'src/app/admin/service/hoteles.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Precioxtipohabitacion } from 'src/app/interfaces/precioxtipohabitacion';
import { PreciosService } from 'src/app/admin/service/precios.service';

@Component({
  selector: 'app-preciosc',
  templateUrl: './preciosc.component.html',
  styleUrls: ['./preciosc.component.css'],
})
export class PrecioscComponent implements OnInit {
  private userlogeado: Usuario;
  titlo: string = 'Registrar Precios';

  public imgurl: string = '';
  public baseUrl: string = environment.baseUrl;
  public editdata: any;
  hotel: Hoteles[];
  public fotoSeleccionada: File;
  imageSrc: string = '';
  precioxtipohabitacion: Precioxtipohabitacion;
  ngSelect: any;
  constructor(
    private builder: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private hotelesServices: HotelesService,
    private authService: AuthService,
    private preciosService: PreciosService
  ) {
    this.precioxtipohabitacion = new Precioxtipohabitacion();
    this.userlogeado = new Usuario();
  }

  companyform = this.builder.group({
    cantidad: this.builder.control('', Validators.required),
    precio: this.builder.control('', Validators.required),
    tipoHabitacion: this.builder.control('', Validators.required),
    hotel: this.builder.control('', Validators.required),
  });

  ngOnInit(): void {
    this.userlogeado = this.authService.usuario;
    this.hotelesServices
      .getusuarioxhotel(this.userlogeado.id)
      .subscribe((data2) => {
        this.hotel = data2;
      });

    if (
      this.data.id != '' &&
      this.data.id != null &&
      this.data.id != undefined
    ) {
      this.titlo = 'Editar Precios';
      this.preciosService.getPrecioOne(this.data.id).subscribe((data) => {
        this.editdata = data;
        this.companyform.patchValue({
          cantidad: this.editdata.cantidad,
          precio: this.editdata.precio,
          tipoHabitacion: this.editdata.tipoHabitacion,
          hotel: this.editdata.hotel.id,
        });
        this.ngSelect = this.data.ide;
      });
    }
  }

  SaveRefenPrecio() {
    if (this.companyform.valid) {
      this.precioxtipohabitacion.cantidad = Number(
        this.companyform.value.cantidad
      );
      this.precioxtipohabitacion.precio = Number(this.companyform.value.precio);
      this.precioxtipohabitacion.tipoHabitacion =
        this.companyform.value.tipoHabitacion;

      if (
        this.data.id != '' &&
        this.data.id != null &&
        this.data.id != undefined
      ) {
        this.functionpermiteEditar();
      } else {
        this.functionpermiteGuardar();
      }
    }
  }
  functionpermiteEditar() {
    this.preciosService
      .updatePrecio(
        this.data.id,
        this.precioxtipohabitacion,
        Number(this.companyform.value.hotel)
      )

      .subscribe((data) => {
        swal.fire(
          'Registro Actualizado',
          'El registro se actualizo correctamente',
          'success'
        );
        this.closepopup();
      });
  }

  functionpermiteGuardar() {
    this.preciosService
      .crearPrecio(
        this.precioxtipohabitacion,
        Number(this.companyform.value.hotel)
      )
      .subscribe((data) => {
        swal.fire(
          'Registro Guardado',
          'El registro se guardo correctamente',
          'success'
        );
        this.closepopup();
      });
  }
  closepopup() {
    this.dialog.closeAll();
  }
}
