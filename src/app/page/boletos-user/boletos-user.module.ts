import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoletosUserPageRoutingModule } from './boletos-user-routing.module';

import { BoletosUserPage } from './boletos-user.page';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoletosUserPageRoutingModule,
    QRCodeModule
  ],
  declarations: [BoletosUserPage]
})
export class BoletosUserPageModule {}
