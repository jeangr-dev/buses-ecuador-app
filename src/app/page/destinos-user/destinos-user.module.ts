import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DestinosUserPageRoutingModule } from './destinos-user-routing.module';

import { DestinosUserPage } from './destinos-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DestinosUserPageRoutingModule
  ],
  declarations: [DestinosUserPage]
})
export class DestinosUserPageModule {}
