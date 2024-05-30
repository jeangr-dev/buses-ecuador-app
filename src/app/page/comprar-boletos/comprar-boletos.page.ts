import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { DataSharingService } from '../../services/data-sharing.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { NavController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-comprar-boletos',
  templateUrl: './comprar-boletos.page.html',
  styleUrls: ['./comprar-boletos.page.scss'],
})
export class ComprarBoletosPage implements OnInit {

  matrizVIP: any[][] = [];
  matrizGen: any[][] = [];

  showBackdrop: boolean = false;
  @ViewChild('modal') modal!: IonModal;
  @ViewChild('modalQR') modalQR!: IonModal;

  private receivedData: any = this.dataSharingService.getDataViaje();
  private receivedDataUser: any = this.dataSharingService.getJsonData();

  cantAsien: any;
  precGen: any;
  precVIP: any;
  total: any;
  cantAsienCompr: any;
  fecHorSal: any;
  totalPagar: any;

  qrCodeValue: any = [];

  constructor(private http: HttpClient, private dataSharingService: DataSharingService,
    private payPal: PayPal, private navCtrl: NavController, private file: File,
    private alertController: AlertController) {
    this.buildSeatVIP();
    this.buildSeatGen();
    this.loadData();
  }

  ngOnInit() {
  }

  iniciarPago() {

    this.payPal.init({
      PayPalEnvironmentProduction: 'Ac7C0cHkl0EqQe0b7Memj4ox0QxhFFkUn0iWCo97zmCZaI3-UCZUtfqlcCOdFA3fW7Czh3yqMbqwLvN2',
      PayPalEnvironmentSandbox: 'YYLX63LKXHGEQ'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment(this.totalPagar, 'USD', 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then(() => {
          this.venderBoleto()
          this.openModalQR()

        }, () => {
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration 
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
    });

  }

  venderBoleto() {
    const idRutaBol = this.receivedData.idRuta;
    const idPersBol = this.receivedDataUser.idPers;
    const idAsienBol = "851";
    const fechaCompraBol = this.receivedData.fechaHoraSaliRuta;
    const precioBol = this.totalPagar;
    const comprobPagoBol = "123453"

    const url = 'http://localhost:8080/boletos/insertar-boleto';

    const data = JSON.stringify({
      idRutaBol: idRutaBol,
      idPersBol: idPersBol,
      idAsienBol: idAsienBol,
      fechaCompraBol: fechaCompraBol,
      precioBol: precioBol,
      comprobPagoBol: comprobPagoBol,
    });

    const headers = {
      'Content-Type': 'application/json'
    };

    this.http.post(url, data, { headers, observe: 'response' }).subscribe(
      (response: HttpResponse<any>) => {
        if (response && response.status == 200 && response.body) {
          try {
            this.qrCodeValue = response.body;
            console.log(this.qrCodeValue);
            this.navCtrl.navigateForward('/home');
            //this.openModalQR()
          } catch (error) {
            console.error('Error al procesar la respuesta:', error);
          }
        } else {
          console.error('Respuesta HTTP nula o vacía recibida');
        }
      },
      (error) => {
        console.error(error);
      }
    );

  }

  toggleBackdrop() {
    this.showBackdrop = !this.showBackdrop;
  }

  loadData() {
    this.cantAsien = 0;
    this.precGen = 0;
    this.precVIP = 0;
    this.total = 0.00;
    this.cantAsienCompr = 0;
    this.fecHorSal = 0;
    this.totalPagar = 0.00;
    this.precGen = (parseFloat(this.receivedData.precioRuta) + 0.50);
    this.precVIP = (parseFloat(this.receivedData.precioRuta) + 1.50);
  }

  async ionViewDidEnter() {
    await this.modal.present();
  }

  openModal() {
    this.modal.present();
  }

  openModalQR() {
    this.modalQR.present();
  }

  closeModalQR() {
    this.modalQR.dismiss();
  }


  closeModal() {
    this.cantAsienCompr = this.cantAsien;
    this.fecHorSal = this.receivedData.fechaHoraSaliRuta;
    this.totalPagar = this.total;
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
    const limiteCeldas = this.receivedData.cantAsienBus;
    let identificador = 13;
    const numFilas = Math.ceil(Math.sqrt(limiteCeldas / 4)); // Calcular número de filas en función del límite

    for (let i = 0; i < numFilas; i++) {
      const fila = [];
      for (let j = 0; j < limiteCeldas; j++) {
        if (identificador <= limiteCeldas) {
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
    this.cantAsien++;
    this.total += this.precVIP;
    setTimeout(() => {
    }, 10);
  }

  seleccionarCeldaGen(celda: any) {
    celda.icono = 'checkmark-circle';
    celda.seleccionada = true;
    this.cantAsien++;
    this.total += this.precGen;
    setTimeout(() => {
    }, 10);
  }

  seleccionarFoto() {
    const fileInputElement = document.createElement('input');
    fileInputElement.type = 'file';
    fileInputElement.accept = 'image/*';
    fileInputElement.addEventListener('change', (event: any) => {
      const selectedFile = event.target.files[0];
      this.validarPagoComprob();
      if (selectedFile) {
        this.file.resolveLocalFilesystemUrl(selectedFile.toInternalURL()).then((fileEntry) => {
          this.resolveFile(fileEntry);

        }).catch((error) => {
          console.log('Error al resolver la URL del archivo:', error);

        });
      }
    });
    fileInputElement.click();
  }

  resolveFile(fileEntry: any) {

    if (fileEntry.isFile) {
      fileEntry.file((file: any) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            const fotoBase64 = reader.result.toString();
          } else {
            console.log('Error al leer el archivo: result es nulo');

          }
        };
        reader.readAsDataURL(file);
      });

    }
  }

  async validarPagoComprob() {
    try {
      const alert = await this.alertController.create({
        header: 'Pago exitoso',
        message: '¡El pago se ha realizado correctamente!',
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
             this.venderBoleto()
            }
          }
        ]
      });
      await alert.present();
    } catch (error) {
      console.error('Error al enviar el pago:', error);
    }
  }

}
