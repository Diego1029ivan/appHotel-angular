import { HotelComponent } from './pages/hotel/hotel.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminindexComponent } from './pages/adminindex/adminindex.component';
import { HomeComponent } from './pages/home/home.component';
import { ListbaresComponent } from './pages/listbares/listbares.component';
import { ListhotelesComponent } from './pages/listhoteles/listhoteles.component';
import { ListcocherasComponent } from './pages/listcocheras/listcocheras.component';
import { ListpicinaComponent } from './pages/listpicina/listpicina.component';
import { ListgaleriaComponent } from './pages/listgaleria/listgaleria.component';
import { ListpreciosComponent } from './pages/listprecios/listprecios.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'listar',
        component: AdminindexComponent,
        canActivate: [AuthGuard],
        pathMatch: 'full',
      },
      {
        path: 'listarhotel',
        component: HotelComponent,
        canActivate: [AuthGuard],
        // canActivate: [AuthGuard, RoleGuard],
        //data: { role: "ROLE_ADMIN" },
        //TODO PONER EL ROL QUE SE DESEE A TODAS LAS RUTAS
      },
      {
        path: 'listarusuario',
        component: UsuariosComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'ROLE_SUPADMIN' },
      },
      {
        path: 'listarhoteles',
        component: ListhotelesComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'ROLE_SUPADMIN' },
      },
      {
        path: 'listarbares',
        component: ListbaresComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'listarcocheras',
        component: ListcocherasComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'listarpicina',
        component: ListpicinaComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'listargaleria',
        component: ListgaleriaComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'listarprecios',
        component: ListpreciosComponent,
        canActivate: [AuthGuard],
      },
      {
        path: '**',
        redirectTo: 'listar',
      },
    ],
  },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
