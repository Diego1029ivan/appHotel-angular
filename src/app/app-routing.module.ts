import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  
  {
    path: 'sistema-hotel',
    loadChildren: () =>
      import('./client/client.module').then((m) => m.ClientModule),
  },

  {
    path: '**',
    redirectTo: 'sistema-hotel',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
