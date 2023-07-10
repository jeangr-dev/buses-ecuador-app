import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComprarBoletosPageRoutingModule } from './comprar-boletos-routing.module';

import { ComprarBoletosPage } from './comprar-boletos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComprarBoletosPageRoutingModule
  ],
  declarations: [ComprarBoletosPage]
})
export class ComprarBoletosPageModule {}
