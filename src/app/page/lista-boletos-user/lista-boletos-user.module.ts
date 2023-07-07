import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaBoletosUserPageRoutingModule } from './lista-boletos-user-routing.module';

import { ListaBoletosUserPage } from './lista-boletos-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaBoletosUserPageRoutingModule
  ],
  declarations: [ListaBoletosUserPage]
})
export class ListaBoletosUserPageModule {}
