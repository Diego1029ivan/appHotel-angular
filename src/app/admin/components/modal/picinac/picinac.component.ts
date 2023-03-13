import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { Hoteles } from 'src/app/interfaces/hoteles';
import { HotelesService } from 'src/app/admin/service/hoteles.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Piscinas } from 'src/app/interfaces/piscinas';
import { PicinaService } from 'src/app/admin/service/picina.service';

@Component({
  selector: 'app-picinac',
  templateUrl: './picinac.component.html',
  styleUrls: ['./picinac.component.css'],
})
export class PicinacComponent implements OnInit {
  private userlogeado: Usuario;
  titlo: string = 'Registrar Picina';

  public imgurl: string = '';
  public baseUrl: string = environment.baseUrl;
  public editdata: any;
  hotel: Hoteles[];
  public fotoSeleccionada: File;
  imageSrc: string = '';
  piscinas: Piscinas;
  ngSelect: any;
  constructor(
    private builder: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private hotelesServices: HotelesService,
    private authService: AuthService,
    private piscinasService: PicinaService
  ) {
    this.userlogeado = new Usuario();
    this.piscinas = new Piscinas();
  }
  companyform = this.builder.group({
    precioPicina: this.builder.control('', Validators.required),
    horarioInicio: this.builder.control('', Validators.required),
    horarioCierre: this.builder.control('', Validators.required),
    descripcionPicina: this.builder.control('', Validators.required),
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
      this.titlo = 'Editar Picina';
      this.piscinasService.getPicinaOne(this.data.id).subscribe((data) => {
        this.editdata = data;

        console.log(this.editdata.horarioCierre);
        this.companyform.patchValue({
          precioPicina: this.editdata.precioPicina,
          horarioInicio: this.editdata.horarioInicio,
          horarioCierre: this.editdata.horarioCierre,
          descripcionPicina: this.editdata.descripcionPicina,
          logo: '',
          hotel: this.editdata.hotel.id,
        });
        console.log(this.editdata.hotel.id);
        this.ngSelect = this.data.ide;
        this.imgurl =
          this.baseUrl + '/api/uploads/img/' + this.editdata.fotoPicina;
      });
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

  SaveRefenPicina() {
    if (this.companyform.valid) {
      this.piscinas.precioPicina = Number(this.companyform.value.precioPicina);
      this.piscinas.horarioInicio = this.companyform.value.horarioInicio;
      this.piscinas.horarioCierre = this.companyform.value.horarioCierre;
      this.piscinas.descripcionPicina =
        this.companyform.value.descripcionPicina;
      this.piscinas.fotoPicina = '';

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
    if (this.fotoSeleccionada != null) {
      //si se selecciono una foto
      this.piscinasService
        .updatePicina(
          this.data.id,
          this.piscinas,
          Number(this.companyform.value.hotel)
        )
        .subscribe(
          (data) => {
            this.piscinasService
              .subirFotoPicina(this.fotoSeleccionada, this.data.id)
              .subscribe(
                (data) => {
                  swal.fire(
                    'Picina Actualizada',
                    `Picina  actualizada con éxito`,
                    'success'
                  );
                  this.closepopup();
                },
                (err) => {
                  console.log(err);
                }
              );
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      this.piscinasService
        .updatePicina(
          this.data.id,
          this.piscinas,
          Number(this.companyform.value.hotel)
        )
        .subscribe(
          (data) => {
            swal.fire(
              'Picina Actualizada',
              `Picina  actualizada con éxito`,
              'success'
            );
            this.closepopup();
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

  functionpermiteGuardar() {
    if (this.fotoSeleccionada != null) {
      //si se selecciono una foto
      this.piscinasService
        .crearPicina(this.piscinas, Number(this.companyform.value.hotel))
        .subscribe(
          (data) => {
            this.piscinasService
              .subirFotoPicina(this.fotoSeleccionada, data.id)
              .subscribe(
                (data) => {
                  swal.fire(
                    'Picina Registrada',
                    `Picina  registrada con éxito`,
                    'success'
                  );
                  this.closepopup();
                },
                (err) => {
                  console.log(err);
                }
              );
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      this.piscinasService
        .crearPicina(this.piscinas, Number(this.companyform.value.hotel))
        .subscribe(
          (data) => {
            swal.fire(
              'Picina Registrada',
              `Picina  registrada con éxito`,
              'success'
            );
            this.closepopup();
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }
  closepopup() {
    this.dialog.closeAll();
  }
}
