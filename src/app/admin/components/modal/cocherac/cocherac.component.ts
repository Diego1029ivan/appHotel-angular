import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { Hoteles } from 'src/app/interfaces/hoteles';
import { HotelesService } from 'src/app/admin/service/hoteles.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Cocheras } from 'src/app/interfaces/cocheras';
import { CocheraService } from 'src/app/admin/service/cochera.service';

@Component({
  selector: 'app-cocherac',
  templateUrl: './cocherac.component.html',
  styleUrls: ['./cocherac.component.css'],
})
export class CocheracComponent implements OnInit {
  private userlogeado: Usuario;
  titlo: string = 'Registrar Cochera';

  public imgurl: string = '';
  public baseUrl: string = environment.baseUrl;
  public editdata: any;
  hotel: Hoteles[];
  public fotoSeleccionada: File;
  imageSrc: string = '';
  cochera: Cocheras;
  ngSelect: any;
  constructor(
    private builder: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private hotelesServices: HotelesService,
    private authService: AuthService,
    private cocheraService: CocheraService
  ) {
    this.cochera = new Cocheras();
    this.userlogeado = new Usuario();
  }

  companyform = this.builder.group({
    descripcionCochera: this.builder.control('', Validators.required),
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
      this.titlo = 'Editar Cochera';

      this.cocheraService.getCocheraOne(this.data.id).subscribe(
        (data) => {
          this.editdata = data;
          console.log(data);
          this.companyform.setValue({
            descripcionCochera: this.editdata.descripcionCochera,
            logo: '',
            hotel: this.editdata.hotel.id,
          });
          this.ngSelect = this.data.ide;
          this.imgurl =
            this.baseUrl + '/api/uploads/img/' + this.editdata.fotoCochera;
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
      this.companyform.get('logo').setValue('');
      this.fotoSeleccionada = null;
    } else {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
  }

  SaveRefenCochera() {
    this.cochera.descripcionCochera = this.companyform.value.descripcionCochera;
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
  functionpermiteEditar() {
    if (this.fotoSeleccionada != null) {
      //si se selecciono una foto
      this.cocheraService
        .updateCochera(
          this.data.id,
          this.cochera,
          Number(this.companyform.value.hotel)
        )
        .subscribe(
          (data) => {
            this.cocheraService
              .subirFotoCochera(this.fotoSeleccionada, this.data.id)
              .subscribe(
                (data) => {
                  swal.fire(
                    'Cochera Actualizada',
                    `Cochera actualizada con éxito`,
                    'success'
                  );
                  this.closepopup();
                },
                (error) => {
                  console.log(error);
                }
              );
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      this.cocheraService
        .updateCochera(
          this.data.id,
          this.cochera,
          Number(this.companyform.value.hotel)
        )
        .subscribe((data) => {
          swal.fire(
            'Cochera Actualizada',
            `Cochera actualizada con éxito`,
            'success'
          );
          this.closepopup();
        });
    }
  }
  functionpermiteGuardar() {
    if (this.fotoSeleccionada != null) {
      //si se selecciono una foto
      this.cocheraService
        .crearCochera(this.cochera, Number(this.companyform.value.hotel))
        .subscribe(
          (data) => {
            this.cocheraService
              .subirFotoCochera(this.fotoSeleccionada, data.id)
              .subscribe(
                (data) => {
                  swal.fire(
                    'Cochera Registrada',
                    `Cochera registrada con éxito`,
                    'success'
                  );
                  this.closepopup();
                },
                (error) => {
                  console.log(error);
                }
              );
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      this.cocheraService
        .crearCochera(this.cochera, Number(this.companyform.value.hotel))
        .subscribe((data) => {
          swal.fire(
            'Cochera Registrada',
            `Cochera registrada con éxito`,
            'success'
          );
          this.closepopup();
        });
    }
  }
  closepopup() {
    this.dialog.closeAll();
  }
}
