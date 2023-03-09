import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { Hoteles } from 'src/app/interfaces/hoteles';
import { HotelesService } from 'src/app/admin/service/hoteles.service';
@Component({
  selector: 'app-hoteles',
  templateUrl: './hoteles.component.html',
  styleUrls: ['./hoteles.component.css'],
})
export class HotelesComponent implements OnInit {
  titlo: string = '';
  public imgurl: string = '';
  public baseUrl: string = environment.baseUrl;
  public editdata: any;
  hotel: Hoteles;
  public fotoSeleccionada: File;
  imageSrc: string = '';
  constructor(
    private builder: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private hotelesServices: HotelesService
  ) {
    this.hotel = new Hoteles();
  }
  companyform = this.builder.group({
    nombre: this.builder.control('', Validators.required),
    ruc: this.builder.control('', Validators.required),
    cantidadHabitacion: this.builder.control('', Validators.required),
    descripcionHotel: this.builder.control('', Validators.required),
    logo: this.builder.control(''),
  });
  ngOnInit(): void {
    if (
      this.data.id != '' &&
      this.data.id != null &&
      this.data.id != undefined
    ) {
      this.titlo = 'Editar la lista de Hoteles';
      this.hotelesServices.getHotelesOne(this.data.id).subscribe(
        (data) => {
          this.editdata = data;
          this.companyform.setValue({
            nombre: this.editdata.nombre,
            ruc: this.editdata.ruc,
            cantidadHabitacion: this.editdata.cantidadHabitacion,
            descripcionHotel: this.editdata.descripcionHotel,
            logo: '',
          });
          this.imgurl = this.baseUrl + '/api/uploads/img/' + this.editdata.logo;
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
  SaveRefenUbicacion() {
    if (this.companyform.valid) {
      //obtener los datos del formulario
      this.hotel.nombre = this.companyform.value.nombre.trim();
      this.hotel.ruc = Number(this.companyform.value.ruc);
      this.hotel.cantidadHabitacion = Number(
        this.companyform.value.cantidadHabitacion
      );
      this.hotel.descripcionHotel =
        this.companyform.value.descripcionHotel.trim();
      this.hotel.logo = '';

      if (
        this.data.id != '' &&
        this.data.id != null &&
        this.data.id != undefined
      ) {
        this.functionpermiteEditar();
      }
    }
  }
  functionpermiteEditar() {
    if (this.fotoSeleccionada != null) {
      //si se selecciono una foto
      this.hotelesServices.updateHotel(this.hotel, this.data.id).subscribe(
        (data) => {
          this.hotelesServices
            .subirFotoDHoteles(this.fotoSeleccionada, this.data.id)
            .subscribe(
              (data) => {
                swal.fire(
                  'Hoteles',
                  ` Se ha editado el hotel  ${this.hotel.nombre} con exito`,
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
      this.hotelesServices.updateHotel(this.hotel, this.data.id).subscribe(
        (data) => {
          swal.fire(
            'Hoteles',
            ` Se ha editado el hotel  ${this.hotel.nombre} con exito`,
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
