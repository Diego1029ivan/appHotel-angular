import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminindexComponent } from './pages/adminindex/adminindex.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ListhotelesComponent } from './pages/listhoteles/listhoteles.component';
import { ListbaresComponent } from './pages/listbares/listbares.component';
import { ListcocherasComponent } from './pages/listcocheras/listcocheras.component';
import { ListpicinaComponent } from './pages/listpicina/listpicina.component';
import { ListgaleriaComponent } from './pages/listgaleria/listgaleria.component';
import { ListpreciosComponent } from './pages/listprecios/listprecios.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { HotelComponent } from './pages/hotel/hotel.component';

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
  ],
  imports: [CommonModule, AuthRoutingModule, MaterialModule],
})
export class AdminModule {}
