import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminindexComponent } from './pages/adminindex/adminindex.component';
import { AuthRoutingModule } from './auth-routing.module';

import { UsuariosCrudComponent } from './components/modal/usuarios-crud/usuarios-crud.component';
import { TokenInterceptor } from '../auth/interceptors/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth/interceptors/auth.interceptor';
import { RutasAdminComponent } from './components/rutas-admin/rutas-admin.component';
import { RutasSuperAdminComponent } from './components/rutas-super-admin/rutas-super-admin.component';

import { ListhotelesComponent } from './pages/listhoteles/listhoteles.component';
import { ListbaresComponent } from './pages/listbares/listbares.component';
import { ListcocherasComponent } from './pages/listcocheras/listcocheras.component';
import { ListpicinaComponent } from './pages/listpicina/listpicina.component';
import { ListgaleriaComponent } from './pages/listgaleria/listgaleria.component';
import { ListpreciosComponent } from './pages/listprecios/listprecios.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

import { RefenciaDUbicacionComponent } from './pages/refencia-dubicacion/refencia-dubicacion.component';
import { HotelComponent } from './pages/hotel/hotel.component';
import { RefeubicacionComponent } from './components/modal/refeubicacion/refeubicacion.component';
import { HotelesComponent } from './components/modal/hoteles/hoteles.component';

@NgModule({
  declarations: [
    HeaderComponent,
    NavbarComponent,
    HomeComponent,
    AdminindexComponent,
    ListhotelesComponent,
    ListbaresComponent,
    ListcocherasComponent,
    ListpicinaComponent,
    ListgaleriaComponent,
    ListpreciosComponent,
    UsuariosComponent,
    HotelComponent,
    UsuariosCrudComponent,
    RutasAdminComponent,
    RutasSuperAdminComponent,
    RefenciaDUbicacionComponent,
    RefeubicacionComponent,
    HotelesComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, MaterialModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class AdminModule {}
