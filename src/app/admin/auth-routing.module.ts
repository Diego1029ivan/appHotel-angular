import { HotelComponent } from './pages/hotel/hotel.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RefenciaDUbicacionComponent } from './pages/refencia-dubicacion/refencia-dubicacion.component';
import { AdminindexComponent } from './pages/adminindex/adminindex.component';
import { HomeComponent } from './pages/home/home.component';

import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ListhotelesComponent } from './pages/listhoteles/listhoteles.component';
import { ListbaresComponent } from './pages/listbares/listbares.component';
import { ListcocherasComponent } from './pages/listcocheras/listcocheras.component';
import { ListpicinaComponent } from './pages/listpicina/listpicina.component';
import { ListgaleriaComponent } from './pages/listgaleria/listgaleria.component';
import { ListpreciosComponent } from './pages/listprecios/listprecios.component';

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
        path: 'listarreferencias',
        component: RefenciaDUbicacionComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'ROLE_SUPADMIN' },
      },
      {
        path: 'listarhotel',
        component: HotelComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'ROLE_ADMIN' },
      },
      {
        path: 'listarbares',
        component: ListbaresComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'ROLE_ADMIN' },
      },
      {
        path: 'listarcocheras',
        component: ListcocherasComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'ROLE_ADMIN' },
      },
      {
        path: 'listarpicina',
        component: ListpicinaComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'ROLE_ADMIN' },
      },
      {
        path: 'listargaleria',
        component: ListgaleriaComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'ROLE_ADMIN' },
      },
      {
        path: 'listarprecios',
        component: ListpreciosComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'ROLE_ADMIN' },
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
