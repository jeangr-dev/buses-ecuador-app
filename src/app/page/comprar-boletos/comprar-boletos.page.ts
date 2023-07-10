import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonModal } from '@ionic/angular';
import { DataSharingService } from '../../services/data-sharing.service';

@Component({
  selector: 'app-comprar-boletos',
  templateUrl: './comprar-boletos.page.html',
  styleUrls: ['./comprar-boletos.page.scss'],
})
export class ComprarBoletosPage implements OnInit {

  matrizVIP: any[][] = [];
  matrizGen: any[][] = [];
  private limiteCeldas!: any;

  showBackdrop: boolean = false;
  @ViewChild('modal') modal!: IonModal;

  private receivedData: any;

  constructor(private dataSharingService: DataSharingService) {
    this.buildSeatVIP();
    this.buildSeatGen();
    this.receivedData = this.dataSharingService.getDataViaje();

  }

  ngOnInit() {
  }

  toggleBackdrop() {
    this.showBackdrop = !this.showBackdrop;
  }

  openModal() {
    this.modal.present();
  }

  closeModal() {
    this.modal.dismiss();
  }

  buildSeatVIP() {
    const numFilas = 3;
    const numColumnas = 4;
    let identificador = 1;

    for (let i = 0; i < numFilas; i++) {
      const fila = [];
      for (let j = 0; j < numColumnas; j++) {
        const celda = {
          identificador: identificador,
          icono: 'add-circle-outline',
          seleccionada: false,
        };
        fila.push(celda);
        identificador++;
      }
      this.matrizVIP.push(fila);
    }
  }

  buildSeatGen() {
    this.limiteCeldas = 18
    let identificador = 1;
    const numFilas = Math.ceil(Math.sqrt(this.limiteCeldas)); // Calcular número de filas en función del límite

    for (let i = 0; i < numFilas; i++) {
      const fila = [];
      for (let j = 0; j < numFilas; j++) {
        if (identificador <= this.limiteCeldas) {
          const celda = {
            identificador: identificador,
            icono: 'add-circle-outline',
            seleccionada: false,
          };
          fila.push(celda);
          identificador++;
        }
      }
      this.matrizGen.push(fila);
    }
  }

  seleccionarCeldaVIP(celda: any) {
    celda.icono = 'checkmark-circle';
    celda.seleccionada = true;

    // Aquí puedes realizar cualquier acción adicional con la celda seleccionada
    console.log('Celda seleccionada:', celda.identificador);
  }

  seleccionarCeldaGen(celda: any) {
    celda.icono = 'checkmark-circle';
    celda.seleccionada = true;

    // Aquí puedes realizar cualquier acción adicional con la celda seleccionada
    console.log('Celda seleccionada:', celda.identificador);
  }

}
