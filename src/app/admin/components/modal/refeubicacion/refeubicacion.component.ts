import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ubicacion } from 'src/app/interfaces/ubicacion';
import { RefenciaDUbicacionService } from 'src/app/admin/service/refencia-dubicacion.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-refeubicacion',
  templateUrl: './refeubicacion.component.html',
  styleUrls: ['./refeubicacion.component.css'],
})
export class RefeubicacionComponent implements OnInit {
  titlo: string = 'Agregar Referencia de Ubicacion';
  public imgurl: string = '';
  public baseUrl: string = environment.baseUrl;
  public editdata: any;
  refeUbicacion: Ubicacion;
  public fotoSeleccionada: File;
  imageSrc: string = '';

  constructor(
    private builder: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private refeciaUbicacion: RefenciaDUbicacionService
  ) {
    this.refeUbicacion = new Ubicacion();
  }

  companyform = this.builder.group({
    id: this.builder.control(''),
    cuidad: this.builder.control('', Validators.required),
    departamento: this.builder.control('', Validators.required),
    descripcionCuidad: this.builder.control('', Validators.required),
    pais: this.builder.control('', Validators.required),
    foto: this.builder.control(''),
  });
  ngOnInit(): void {
    if (
      this.data.id != '' &&
      this.data.id != null &&
      this.data.id != undefined
    ) {
      this.titlo = 'Editar Referencia de Ubicacion';
      this.refeciaUbicacion.getRefenciaDUbicacionOne(this.data.id).subscribe(
        (data) => {
          this.editdata = data;
          this.companyform.setValue({
            id: this.editdata.id,
            cuidad: this.editdata.ciudad,
            departamento: this.editdata.departamento,
            descripcionCuidad: this.editdata.descripcionCiudad,
            pais: this.editdata.pais,
            foto: '',
          });
          this.imgurl =
            this.baseUrl + '/api/uploads/img/' + this.editdata.fotoCiudad;
          this.companyform.invalid == false;
        },
        (err) => {
          console.log(err);
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
      this.companyform.get('foto').setValue('');
      this.fotoSeleccionada = null;
    } else {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
  }
  SaveRefenUbicacion() {
    if (this.companyform.valid) {
      //obtener los datos del formulario
      this.refeUbicacion.pais = this.companyform.value.pais.trim();
      this.refeUbicacion.departamento =
        this.companyform.value.departamento.trim();
      this.refeUbicacion.ciudad = this.companyform.value.cuidad.trim();
      this.refeUbicacion.descripcionCiudad =
        this.companyform.value.descripcionCuidad.trim();
      this.refeUbicacion.fotoCiudad = '';

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
      this.refeciaUbicacion
        .updateRefereciaDUbicacion(this.refeUbicacion, this.data.id)
        .subscribe(
          (data) => {
            this.refeciaUbicacion
              .subirFotoRefereciaDUbicacion(this.fotoSeleccionada, this.data.id)
              .subscribe(
                (data) => {
                  swal.fire(
                    'Referencia de Ubicacion',
                    'Se ha editado la referencia de ubicacion con exito',
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
      //si no se selecciono una foto
      this.refeciaUbicacion
        .updateRefereciaDUbicacion(this.refeUbicacion, this.data.id)
        .subscribe(
          (data) => {
            swal.fire(
              'Referencia de Ubicacion',
              'Se ha editado la referencia de ubicacion con exito',
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
    this.refeciaUbicacion
      .crearteRefereciaDUbicacion(this.refeUbicacion)
      .subscribe(
        (data) => {
          this.refeciaUbicacion
            .subirFotoRefereciaDUbicacion(this.fotoSeleccionada, data.id)
            .subscribe(
              (data) => {
                swal.fire(
                  'Referencia de Ubicacion',
                  'Se ha creado la referencia de ubicacion con exito',
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
  }
  closepopup() {
    this.dialog.closeAll();
  }
}
