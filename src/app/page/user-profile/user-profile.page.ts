import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../../services/data-sharing.service';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  private receivedData: any;
  names!: string;
  username!: string;
  phone!: string;
  email!: string;

  showBackdrop: boolean = false;

  passwordCurrent!: string;
  passwordNew!: string;
  confPassword!: string;

  wrongPasswCurrent = new FormControl('', Validators.required);
  isEmptyInputText = new FormControl('', Validators.required);
  wrongPassword = new FormControl('', Validators.required);

  constructor(private dataSharingService: DataSharingService,
    private http: HttpClient, private modalController: ModalController,
    private alertController: AlertController,
    private navCtrl: NavController) { 

    }

  constructor(private dataSharingService: DataSharingService,
    private http: HttpClient, private modalController: ModalController) { }

  ngOnInit() {
    this.initDataUser();
  }

  toggleBackdrop() {
    this.showBackdrop = !this.showBackdrop;
  }

  initDataUser() {
    this.receivedData = this.dataSharingService.getJsonData();
    this.names = this.receivedData.nombrePers;
    this.username = this.receivedData.usernamePers;
    this.phone = this.receivedData.telfPers;
    this.email = this.receivedData.correoPers;
  }

  changePassword() {
    const passwordCurrent = this.passwordCurrent;
    const passwordNew = this.passwordNew;
    const confPassword = this.confPassword;

    if (this.isEmptyInput(passwordCurrent, passwordNew, confPassword)) {
      if (passwordCurrent === this.receivedData.passwordPers) {
        if (passwordNew === confPassword) {
          const dataUser = JSON.stringify({
            idPers: this.receivedData.idPers,
            nombrePers: this.receivedData.nombrePers,
            cedPers: this.receivedData.cedPers,
            usernamePers: this.receivedData.usernamePers,
            passwordPers: passwordNew,
            correoPers: this.receivedData.correoPers,
            telfPers: this.receivedData.telfPers,
            rolPers: this.receivedData.rolPers
          });

          this.consumeService(dataUser);

        } else {

          this.clearMsjDanger();

          this.wrongPassword.markAsTouched();
          this.clearInput();
        }
      } else {

        this.clearMsjDanger();
        this.wrongPasswCurrent.markAsTouched();
        this.clearInput();
      }
    }
  }

  clearMsjDanger() {
    this.wrongPasswCurrent.markAsUntouched();
    this.isEmptyInputText.markAsUntouched();
    this.wrongPassword.markAsUntouched();
  }


  consumeService(dataUser: string) {
    const url = 'http://localhost:8080/personas/actualizar-persona';
    const headers = {
      'Content-Type': 'application/json'
    };

    this.http.put(url, dataUser, { headers, observe: 'response' }).subscribe(
      (response: HttpResponse<any>) => {
        if (response && response.status == 200 && response.body) {
          try {
            this.closeModal();

            this.presentAlert();
            this.clearInput();
            this.clearMsjDanger();
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

  isEmptyInput(
    passwordCurrent: string,
    passwordNew: string,
    confpassword: string
  ) {
    if (!passwordCurrent || !passwordNew || !confpassword ||
      !this.isEmptyInputText.invalid ||
      /^\s+|\s+$/g.test(passwordCurrent) ||
      /^\s+|\s+$/g.test(passwordNew) ||
      /^\s+|\s+$/g.test(confpassword)) {

      this.clearMsjDanger();

      this.isEmptyInputText.markAsTouched();
      return false;
    } else {
      return true;
    }
  }

  async closeModal() {
    await this.modalController.dismiss({
      dismissed: true
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¿Desea cerrar sesión?',
      buttons: [
        {
          text: 'No',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Sí',
          cssClass: 'alert-button-confirm',
          handler: () => {
            // Acción a realizar cuando se selecciona "Sí"
            this.cerrarSesion();
          }
        },
      ]
    });
  
    await alert.present();
  }

  cerrarSesion() {
    this.navCtrl.navigateForward('/login');
  }

  clearInput() {
    this.passwordCurrent = "";
    this.passwordNew = "";
    this.confPassword = "";
  }

  editNames() { }

  editUsername() { }

  editPhone() { }

  editEmail() { }
}
