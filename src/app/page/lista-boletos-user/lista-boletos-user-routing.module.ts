import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaBoletosUserPage } from './lista-boletos-user.page';

const routes: Routes = [
  {
    path: '',
    component: ListaBoletosUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaBoletosUserPageRoutingModule {}
