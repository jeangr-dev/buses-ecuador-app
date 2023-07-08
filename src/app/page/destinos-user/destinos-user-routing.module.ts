import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DestinosUserPage } from './destinos-user.page';

const routes: Routes = [
  {
    path: '',
    component: DestinosUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DestinosUserPageRoutingModule {}
