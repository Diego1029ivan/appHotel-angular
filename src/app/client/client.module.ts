import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

import { HomeComponent } from './pages/home/home.component';
import { HotelindexComponent } from './pages/hotelindex/hotelindex.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { AuthRoutingModule } from './auth-routing.module';
import { NgBoostrapModule } from './ng-boostrap/ng-boostrap.module';
import { SliderPrincipalComponent } from './components/slider-principal/slider-principal.component';
import { FormCompraComponent } from './components/form-compra/form-compra.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { RegionesComponent } from './pages/regiones/regiones.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { SliderFotosComponent } from './components/slider-fotos/slider-fotos.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TestimonioComponent } from './components/testimonio/testimonio.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DetalleHotelComponent } from './pages/detalle-hotel/detalle-hotel.component';
import { ReservaHotelComponent } from './pages/reserva-hotel/reserva-hotel.component';

@NgModule({
  declarations: [
    HomeComponent,
    HotelindexComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    SliderPrincipalComponent,
    FormCompraComponent,
    NosotrosComponent,
    RegionesComponent,
    ContactoComponent,
    SliderFotosComponent,
    TestimonioComponent,
    DetalleHotelComponent,
    ReservaHotelComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NgbCarouselModule,
    NgIf,
    NgBoostrapModule,
    NgbCarouselModule,
    CarouselModule,
    ReactiveFormsModule,
  ],
})
export class ClientModule {}
