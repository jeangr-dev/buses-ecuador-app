import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoletosUserPageRoutingModule } from './boletos-user-routing.module';

import { BoletosUserPage } from './boletos-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoletosUserPageRoutingModule
  ],
  declarations: [BoletosUserPage]
})
export class BoletosUserPageModule {}
