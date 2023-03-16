import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { Hoteles } from 'src/app/interfaces/hoteles';
import { HotelesService } from 'src/app/admin/service/hoteles.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/auth/service/auth.service';
import { GaleriaService } from 'src/app/admin/service/galeria.service';
import { Galeria } from 'src/app/interfaces/galeria';

@Component({
  selector: 'app-galeriac',
  templateUrl: './galeriac.component.html',
  styleUrls: ['./galeriac.component.css'],
})
export class GaleriacComponent implements OnInit {
  private userlogeado: Usuario;
  titlo: string = 'Registrar Galeria';

  public imgurl: string = '';
  public imgurl2: string = '';
  public imgurl3: string = '';
  public baseUrl: string = environment.baseUrl;
  public editdata: any;
  hotel: Hoteles[];
  public fotoSeleccionada: File;
  public fotoSeleccionada2: File;
  public fotoSeleccionada3: File;
  imageSrc: string = '';
  imageSrc2: string = '';
  imageSrc3: string = '';
  galeria: Galeria;
  variable: any;
  ngSelect: any;
  constructor(
    private builder: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private hotelesServices: HotelesService,
    private authService: AuthService,
    private galeriaService: GaleriaService
  ) {
    this.userlogeado = new Usuario();
    this.galeria = new Galeria();
  }
  companyform = this.builder.group({
    descripcion: this.builder.control('', Validators.required),
    foto: this.builder.control(''),
    foto2: this.builder.control(''),
    foto3: this.builder.control(''),
    hotel: this.builder.control('', Validators.required),
    descripcionf1: this.builder.control('', Validators.required),
    descripcionf2: this.builder.control('', Validators.required),
    descripcionf3: this.builder.control('', Validators.required),
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
      this.galeriaService.getGaleriaOne(this.data.id).subscribe((data) => {
        this.editdata = data;

        this.companyform.patchValue({
          descripcion: this.editdata.descripcion,
          descripcionf1: this.editdata.descripcionf1,
          descripcionf2: this.editdata.descripcionf2,
          descripcionf3: this.editdata.descripcionf3,
          foto: '',
          foto2: '',
          foto3: '',
          hotel: this.editdata.hotel.id,
        });
        this.ngSelect = this.data.ide;

        this.imgurl = this.baseUrl + '/api/uploads/img/' + this.editdata.foto;
        this.imgurl2 = this.baseUrl + '/api/uploads/img/' + this.editdata.foto2;
        this.imgurl3 = this.baseUrl + '/api/uploads/img/' + this.editdata.foto3;
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

  seleccionarFoto2(event: any) {
    this.imgurl2 = '';
    this.fotoSeleccionada2 = event.target.files[0];
    const reader = new FileReader();
    if (this.fotoSeleccionada2.type.indexOf('image') < 0) {
      swal.fire(
        'Error seleccionar imagen: ',
        'El archivo debe ser del tipo imagen',
        'error'
      );
      //resetiar solo el campo de la foto
      this.companyform.get('foto2').setValue('');
      this.fotoSeleccionada2 = null;
    } else {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc2 = reader.result as string;
      };
    }
  }

  seleccionarFoto3(event: any) {
    this.imgurl3 = '';
    this.fotoSeleccionada3 = event.target.files[0];
    const reader = new FileReader();
    if (this.fotoSeleccionada3.type.indexOf('image') < 0) {
      swal.fire(
        'Error seleccionar imagen: ',
        'El archivo debe ser del tipo imagen',
        'error'
      );
      //resetiar solo el campo de la foto
      this.companyform.get('foto3').setValue('');
      this.fotoSeleccionada3 = null;
    } else {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc3 = reader.result as string;
      };
    }
  }
  SaveRefenGaleria() {
    this.galeria.descripcion = this.companyform.value.descripcion;
    this.galeria.descripcionf1 = this.companyform.value.descripcionf1;
    this.galeria.descripcionf2 = this.companyform.value.descripcionf2;
    this.galeria.descripcionf3 = this.companyform.value.descripcionf3;

    if (this.companyform.valid) {
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
    // console.log(this.companyform.value.hotel);
  }
  functionpermiteEditar() {
    if (
      this.fotoSeleccionada != null &&
      this.fotoSeleccionada2 != null &&
      this.fotoSeleccionada3 != null
    ) {
      //si se selecciono una foto
      this.galeriaService
        .updateGaleria(
          this.data.id,
          this.galeria,
          Number(this.companyform.value.hotel)
        )
        .subscribe(
          (data) => {
            this.galeriaService
              .subirFotoGaleriatriple(
                this.fotoSeleccionada,
                this.fotoSeleccionada2,
                this.fotoSeleccionada3,
                this.data.id
              )
              .subscribe((data) => {
                swal.fire(
                  'Galeria Actualizada',
                  `Galeria  actualizada con éxito!`,
                  'success'
                );
                this.closepopup();
              });
          },
          (err) => {
            console.log(err);
          }
        );
    } else if (
      this.fotoSeleccionada != null &&
      this.fotoSeleccionada2 != null
    ) {
      this.galeriaService
        .updateGaleria(
          this.data.id,
          this.galeria,
          Number(this.companyform.value.hotel)
        )
        .subscribe(
          (data) => {
            this.galeriaService
              .subirFotoGaleria(this.fotoSeleccionada, this.data.id)
              .subscribe((data) => {
                this.galeriaService
                  .subirFotoGaleria2(this.fotoSeleccionada2, this.data.id)
                  .subscribe(
                    (data) => {
                      swal.fire(
                        'Galeria Actualizada',
                        `Galeria  actualizada con éxito!`,
                        'success'
                      );
                      this.closepopup();
                    },
                    (err) => {
                      console.log(err);
                    }
                  );
              });
          },
          (err) => {
            console.log(err);
          }
        );
    } else if (
      this.fotoSeleccionada != null &&
      this.fotoSeleccionada3 != null
    ) {
      this.galeriaService
        .updateGaleria(
          this.data.id,
          this.galeria,
          Number(this.companyform.value.hotel)
        )
        .subscribe(
          (data) => {
            this.galeriaService
              .subirFotoGaleria(this.fotoSeleccionada, this.data.id)
              .subscribe((data) => {
                this.galeriaService
                  .subirFotoGaleria3(this.fotoSeleccionada3, this.data.id)
                  .subscribe(
                    (data) => {
                      swal.fire(
                        'Galeria Actualizada',
                        `Galeria  actualizada con éxito!`,
                        'success'
                      );
                      this.closepopup();
                    },
                    (err) => {
                      console.log(err);
                    }
                  );
              });
          },
          (err) => {
            console.log(err);
          }
        );
    } else if (
      this.fotoSeleccionada2 != null &&
      this.fotoSeleccionada3 != null
    ) {
      this.galeriaService
        .updateGaleria(
          this.data.id,
          this.galeria,
          Number(this.companyform.value.hotel)
        )
        .subscribe(
          (data) => {
            this.galeriaService
              .subirFotoGaleria2(this.fotoSeleccionada2, this.data.id)
              .subscribe((data) => {
                this.galeriaService
                  .subirFotoGaleria3(this.fotoSeleccionada3, this.data.id)
                  .subscribe(
                    (data) => {
                      swal.fire(
                        'Galeria Actualizada',
                        `Galeria  actualizada con éxito!`,
                        'success'
                      );
                      this.closepopup();
                    },
                    (err) => {
                      console.log(err);
                    }
                  );
              });
          },
          (err) => {
            console.log(err);
          }
        );
    } else if (this.fotoSeleccionada != null) {
      this.galeriaService
        .updateGaleria(
          this.data.id,
          this.galeria,
          Number(this.companyform.value.hotel)
        )
        .subscribe(
          (data) => {
            this.galeriaService
              .subirFotoGaleria(this.fotoSeleccionada, this.data.id)
              .subscribe(
                (data) => {
                  swal.fire(
                    'Galeria Actualizada',
                    `Galeria  actualizada con éxito!`,
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
    } else if (this.fotoSeleccionada2 != null) {
      this.galeriaService
        .updateGaleria(
          this.data.id,
          this.galeria,
          Number(this.companyform.value.hotel)
        )
        .subscribe(
          (data) => {
            this.galeriaService
              .subirFotoGaleria2(this.fotoSeleccionada2, this.data.id)
              .subscribe(
                (data) => {
                  swal.fire(
                    'Galeria Actualizada',
                    `Galeria  actualizada con éxito!`,
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
    } else if (this.fotoSeleccionada3 != null) {
      this.galeriaService
        .updateGaleria(
          this.data.id,
          this.galeria,
          Number(this.companyform.value.hotel)
        )
        .subscribe(
          (data) => {
            this.galeriaService
              .subirFotoGaleria3(this.fotoSeleccionada3, this.data.id)
              .subscribe(
                (data) => {
                  swal.fire(
                    'Galeria Actualizada',
                    `Galeria  actualizada con éxito!`,
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
      this.galeriaService
        .updateGaleria(
          this.data.id,
          this.galeria,
          Number(this.companyform.value.hotel)
        )
        .subscribe(
          (data) => {
            swal.fire(
              'Galeria Actualizada',
              `Galeria  actualizada con éxito!`,
              'success'
            );
            this.closepopup();
          },
          (err) => {
            console.log(err);
          }
        );
      console.log(this.galeria);
    }
  }
  functionpermiteGuardar() {
    if (
      this.fotoSeleccionada != null &&
      this.fotoSeleccionada2 != null &&
      this.fotoSeleccionada3 != null
    ) {
      //si se selecciono una foto
      this.galeriaService
        .crearGaleria(this.galeria, Number(this.companyform.value.hotel))
        .subscribe(
          (data4) => {
            this.galeriaService
              .subirFotoGaleriatriple(
                this.fotoSeleccionada,
                this.fotoSeleccionada2,
                this.fotoSeleccionada3,
                data4.id
              )
              .subscribe((data) => {
                swal.fire(
                  'Galeria Creada',
                  `Galeria  creada con éxito!`,
                  'success'
                );
                this.closepopup();
              });
          },
          (err) => {
            console.log(err);
          }
        );
    } else if (
      this.fotoSeleccionada != null &&
      this.fotoSeleccionada2 != null
    ) {
      this.galeriaService
        .crearGaleria(this.galeria, Number(this.companyform.value.hotel))
        .subscribe(
          (data1) => {
            this.galeriaService
              .subirFotoGaleria(this.fotoSeleccionada, data1.id)
              .subscribe(
                (data) => {
                  this.galeriaService
                    .subirFotoGaleria2(this.fotoSeleccionada2, data1.id)
                    .subscribe(
                      (data) => {
                        swal.fire(
                          'Galeria Creada',
                          `Galeria  creada con éxito!`,
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
          },
          (err) => {
            console.log(err);
          }
        );
    } else if (
      this.fotoSeleccionada != null &&
      this.fotoSeleccionada3 != null
    ) {
      this.galeriaService
        .crearGaleria(this.galeria, Number(this.companyform.value.hotel))
        .subscribe(
          (data1) => {
            this.galeriaService
              .subirFotoGaleria(this.fotoSeleccionada, data1.id)
              .subscribe(
                (data) => {
                  this.galeriaService

                    .subirFotoGaleria3(this.fotoSeleccionada3, data1.id)
                    .subscribe(
                      (data) => {
                        swal.fire(
                          'Galeria Creada',
                          `Galeria  creada con éxito!`,
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
          },
          (err) => {
            console.log(err);
          }
        );
    } else if (
      this.fotoSeleccionada2 != null &&
      this.fotoSeleccionada3 != null
    ) {
      this.galeriaService
        .crearGaleria(this.galeria, Number(this.companyform.value.hotel))
        .subscribe(
          (data1) => {
            this.galeriaService
              .subirFotoGaleria2(this.fotoSeleccionada2, data1.id)
              .subscribe(
                (data) => {
                  this.galeriaService
                    .subirFotoGaleria3(this.fotoSeleccionada3, data1.id)
                    .subscribe(
                      (data) => {
                        swal.fire(
                          'Galeria Creada',
                          `Galeria  creada con éxito!`,
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
          },
          (err) => {
            console.log(err);
          }
        );
    } else if (this.fotoSeleccionada != null) {
      this.galeriaService
        .crearGaleria(this.galeria, Number(this.companyform.value.hotel))
        .subscribe(
          (data1) => {
            this.galeriaService
              .subirFotoGaleria(this.fotoSeleccionada, data1.id)
              .subscribe(
                (data) => {
                  swal.fire(
                    'Galeria Creada',
                    `Galeria  creada con éxito!`,
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
    } else if (this.fotoSeleccionada2 != null) {
      this.galeriaService
        .crearGaleria(this.galeria, Number(this.companyform.value.hotel))
        .subscribe(
          (data1) => {
            this.galeriaService
              .subirFotoGaleria2(this.fotoSeleccionada2, data1.id)
              .subscribe(
                (data) => {
                  swal.fire(
                    'Galeria Creada',
                    `Galeria  creada con éxito!`,
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
    } else if (this.fotoSeleccionada3 != null) {
      this.galeriaService
        .crearGaleria(this.galeria, Number(this.companyform.value.hotel))
        .subscribe(
          (data1) => {
            this.galeriaService
              .subirFotoGaleria3(this.fotoSeleccionada3, data1.id)
              .subscribe(
                (data) => {
                  swal.fire(
                    'Galeria Creada',
                    `Galeria  creada con éxito!`,
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
      this.galeriaService
        .crearGaleria(this.galeria, Number(this.companyform.value.hotel))
        .subscribe((data) => {
          swal.fire('Galeria Creada', `Galeria  creada con éxito!`, 'success');
          this.closepopup();
        });
    }
  }
  closepopup() {
    this.dialog.closeAll();
  }
}
