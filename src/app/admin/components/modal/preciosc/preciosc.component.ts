import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  precioxtipohabitacion: Precioxtipohabitacion[];

  constructor(
    private builder: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private hotelesServices: HotelesService,
    private authService: AuthService,
    private preciosService: PreciosService
  ) {
    this.userlogeado = new Usuario();
  }
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
      console.log(this.data.id, '-', this.data.ide);
      this.preciosService.getPrecioOne(this.data.id).subscribe((data) => {
        this.editdata = data;
        console.log(this.editdata);
        // this.companyform.patchValue({
        //   descripcionPiscina: this.editdata.descripcionPiscina,
        //   hotel: this.editdata.hotel.id,
        // });
        // this.imgurl = this.baseUrl + this.editdata.logo;
      });
    }
  }

  SaveRefenPrecio() {
    // console.log(this.companyform.value.hotel);
  }

  closepopup() {
    this.dialog.closeAll();
  }
}
