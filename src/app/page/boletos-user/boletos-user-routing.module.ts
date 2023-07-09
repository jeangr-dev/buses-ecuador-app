import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoletosUserPage } from './boletos-user.page';

const routes: Routes = [
  {
    path: '',
    component: BoletosUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoletosUserPageRoutingModule {}
