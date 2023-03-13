import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HotelindexComponent } from './pages/hotelindex/hotelindex.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { RegionesComponent } from './pages/regiones/regiones.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { DetalleHotelComponent } from './pages/detalle-hotel/detalle-hotel.component';
import { ReservaHotelComponent } from './pages/reserva-hotel/reserva-hotel.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ReservasComponent } from './pages/reservas/reservas.component';
import { LoginComponent } from '../auth/pages/login/login.component';
import { RegisterComponent } from '../auth/pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'index',
        component: HotelindexComponent,
      },
      {
        path: 'nosotros',
        component: NosotrosComponent,
      },
      {
        path: 'regiones',
        component: RegionesComponent,
      },
      {
        path: 'reservas',
        component: ReservasComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'regiones/detalle-hotel/:id',
        component: DetalleHotelComponent,
      },

      {
        path: 'regiones/detalle-hotel/:id/reserva-hotel',
        component: ReservaHotelComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'contacto',
        component: ContactoComponent,
      },
      {
        path: 'auth/login',
        component: LoginComponent,
      },
      {
        path: 'auth/login/registro',
        component: RegisterComponent,
      },

      {
        path: '**',
        redirectTo: 'index',
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
