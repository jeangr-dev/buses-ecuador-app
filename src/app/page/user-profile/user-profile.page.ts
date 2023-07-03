import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../../services/data-sharing.service';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';

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

  isEditingNom = false;
  isEditingUser = false;
  isEditingPhone = false;
  isEditingEmail = false;

  isEmptyInputTextL = new FormControl('', Validators.required);
  isEmptyInputTextD = new FormControl('', Validators.required);
  isEmptyInputTextE = new FormControl('', Validators.required);
  isEmptyInputEmail = new FormControl('', Validators.required);

  constructor(
    private dataSharingService: DataSharingService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.receivedData = this.dataSharingService.getJsonData();
    this.names = this.receivedData.nombrePers;
    this.username = this.receivedData.usernamePers;
    this.phone = this.receivedData.telfPers;
    this.email = this.receivedData.correoPers;
  }

  cambiarEstado1(): void {
    this.isEditingNom = !this.isEditingNom;
    this.isEditingUser = false;
    this.isEditingPhone = false;
    this.isEditingEmail = false;
  }
  cambiarEstado2(): void {
    this.isEditingUser = !this.isEditingUser;
    this.isEditingNom = false;
    this.isEditingPhone = false;
    this.isEditingEmail = false;
  }
  cambiarEstado3(): void {
    this.isEditingPhone = !this.isEditingPhone;
    this.isEditingUser = false;
    this.isEditingNom = false;
    this.isEditingEmail = false;
  }
  cambiarEstado4(): void {
    this.isEditingEmail = !this.isEditingEmail;
    this.isEditingUser = false;
    this.isEditingNom = false;
    this.isEditingPhone = false;
  }

  editNames() {
    const names = this.names;
    if (this.isEditingNom) {
      if (this.isEmptyInputName(names)) {
        this.cambiarEstado1();
        const dataUser = JSON.stringify({
          idPers: this.receivedData.idPers,
          nombrePers: names,
          cedPers: this.receivedData.cedPers,
          usernamePers: this.receivedData.usernamePers,
          passwordPers: this.receivedData.passwordPers,
          correoPers: this.receivedData.correoPers,
          telfPers: this.receivedData.telfPers,
          rolPers: this.receivedData.rolPers,
        });

        this.consumeService(dataUser);
      } else {
        this.clearMsjDangerEdit();
        this.isEmptyInputTextL.markAsTouched();
      }
    } else {
      this.cambiarEstado1();
    }
  }

  editUsername() {
    const username = this.username;
    if (this.isEditingUser) {
      if (this.isEmptyInputUsername(username)) {
        this.cambiarEstado2();
        const dataUser = JSON.stringify({
          idPers: this.receivedData.idPers,
          nombrePers: this.receivedData.nombrePers,
          cedPers: this.receivedData.cedPers,
          usernamePers: username,
          passwordPers: this.receivedData.passwordPers,
          correoPers: this.receivedData.correoPers,
          telfPers: this.receivedData.telfPers,
          rolPers: this.receivedData.rolPers,
        });

        this.consumeService(dataUser);
      } else {
        this.clearMsjDangerEdit();
        this.isEmptyInputTextE.markAsTouched();
      }
    } else {
      this.cambiarEstado2();
    }
  }

  editPhone() {
    const phone = this.phone;
    if (this.isEditingPhone) {
      if (this.isEmptyInputPhone(phone)) {
        this.cambiarEstado3();
        const dataUser = JSON.stringify({
          idPers: this.receivedData.idPers,
          nombrePers: this.receivedData.nombrePers,
          cedPers: this.receivedData.cedPers,
          usernamePers: this.receivedData.usernamePers,
          passwordPers: this.receivedData.passwordPers,
          correoPers: this.receivedData.correoPers,
          telfPers: phone,
          rolPers: this.receivedData.rolPers,
        });

        this.consumeService(dataUser);
      } else {
        this.clearMsjDangerEdit();
        this.isEmptyInputTextD.markAsTouched();
      }
    } else {
      this.cambiarEstado3();
    }
  }

  editEmail() {
    const email = this.email;
    if (this.isEditingEmail) {
      if (this.isValidEmailEdit(email)) {
        this.cambiarEstado4();
        const dataUser = JSON.stringify({
          idPers: this.receivedData.idPers,
          nombrePers: this.receivedData.nombrePers,
          cedPers: this.receivedData.cedPers,
          usernamePers: this.receivedData.usernamePers,
          passwordPers: this.receivedData.passwordPers,
          correoPers: email,
          telfPers: this.receivedData.telfPers,
          rolPers: this.receivedData.rolPers,
        });

        this.consumeService(dataUser);
      } else {
        this.clearMsjDangerEdit();
        this.isEmptyInputEmail.markAsTouched();
      }
    } else {
      this.cambiarEstado4();
    }
  }

  changePassword() {
    
  }

  isEmptyInputName(names: string) {
    if (
      !names ||
      !this.isEmptyInputTextL.invalid ||
      !this.containsOnlyLettersName(names)
    ) {
      this.clearMsjDangerEdit();
      this.isEmptyInputTextL.markAsTouched();
      return false;
    } else {
      return true;
    }
  }

  isEmptyInputUsername(username: string) {
    if (
      !username ||
      !this.isEmptyInputTextE.invalid ||
      !this.containsOnlyLettersUser(username)
    ) {
      this.clearMsjDangerEdit();
      this.isEmptyInputTextE.markAsTouched();
      return false;
    } else {
      return true;
    }
  }

  isEmptyInputPhone(phone: string) {
    if (
      !phone ||
      !this.isEmptyInputTextD.invalid ||
      !this.containsOnlyDigits(phone)
    ) {
      this.clearMsjDangerEdit();
      this.isEmptyInputTextD.markAsTouched();
      return false;
    } else {
      return true;
    }
  }

  isValidEmailEdit(email: string) {
    if (
      !email ||
      !this.isEmptyInputEmail.invalid ||
      !this.isValidEmail(email)
    ) {
      this.clearMsjDangerEdit();
      this.isEmptyInputEmail.markAsTouched();
      return false;
    } else {
      return true;
    }
  }

  clearMsjDangerEdit() {
    this.isEmptyInputTextD.markAsUntouched();
    this.isEmptyInputTextE.markAsUntouched();
    this.isEmptyInputTextL.markAsUntouched();
    this.isEmptyInputEmail.markAsUntouched();
  }

  containsOnlyLettersName(input: string): boolean {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(input);
  }

  containsOnlyLettersUser(input: string): boolean {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(input);
  }

  containsOnlyDigits(input: string): boolean {
    if (input.length ===10 && !isNaN(Number(input))) {
      return true;
    } else {
      return false;
    }
  }

  isValidEmail(input: string): boolean {
    const atIndex = input.indexOf('@');
    const dotIndex = input.lastIndexOf('.');
  
    if (atIndex < 1 || dotIndex < atIndex + 2 || dotIndex + 2 >= input.length) {
      return false;
    } else {
      return true;
    }
  }

  consumeService(dataUser: string) {
    const url = 'http://localhost:8080/personas/actualizar-persona';
    const headers = {
      'Content-Type': 'application/json',
    };

    this.http.put(url, dataUser, { headers, observe: 'response' }).subscribe(
      (response: HttpResponse<any>) => {
        if (response && response.status == 200 && response.body) {
          try {
            this.clearMsjDangerEdit();
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
}
