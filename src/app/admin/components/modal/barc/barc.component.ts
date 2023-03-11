import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { Hoteles } from 'src/app/interfaces/hoteles';
import { Bares } from 'src/app/interfaces/bares';
import { HotelesService } from 'src/app/admin/service/hoteles.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/auth/service/auth.service';
import { BarService } from 'src/app/admin/service/bar.service';

@Component({
  selector: 'app-barc',
  templateUrl: './barc.component.html',
  styleUrls: ['./barc.component.css'],
})
export class BarcComponent implements OnInit {
  private userlogeado: Usuario;
  titlo: string = 'Registrar Bar';

  public imgurl: string = '';
  public baseUrl: string = environment.baseUrl;
  public editdata: any;
  hotel: Hoteles[];
  public fotoSeleccionada: File;
  imageSrc: string = '';
  bar: Bares[];
  ngSelect: any;
  constructor(
    private builder: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private hotelesServices: HotelesService,
    private authService: AuthService,
    private barService: BarService
  ) {
    this.userlogeado = new Usuario();
  }

  companyform = this.builder.group({
    descripcionBar: this.builder.control('', Validators.required),
    logo: this.builder.control(''),
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
      this.titlo = 'Editar Bar';
      this.barService.getOneBar(this.data.id).subscribe(
        (data) => {
          this.editdata = data;

          this.companyform.setValue({
            descripcionBar: this.editdata.descripcionBar,
            logo: '',
            hotel: this.editdata.hotel.id,
          });
          this.ngSelect = this.data.ide;
          this.imgurl =
            this.baseUrl + '/api/uploads/img/' + this.editdata.fotoBar;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  seleccionarFoto(event: any) {
    this.imgurl = '';
    this.fotoSeleccionada = event.target.files[0];
    const reader = new FileReader();
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      swal.fire(
        'Error seleccionar imagen: ',
        'El archivo debe ser del tipo imagen',
        'error'
      );
      //resetiar solo el campo de la foto
      // this.companyform.get('logo').setValue('');
      this.fotoSeleccionada = null;
    } else {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
  }

  SaveRefenBar() {}

  closepopup() {
    this.dialog.closeAll();
  }
}
