import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage implements OnInit {

  cedula!: string;
  nomApell!: string;
  username!: string;
  telefono!: string;
  email!: string;
  password!: string;
  confpassword!: string;

  isEmptyInputText = new FormControl('', Validators.required);
  wrongPassword = new FormControl('', Validators.required);

  constructor(private http: HttpClient, private navCtrl: NavController) { }

  ngOnInit() {

    
  }

  isEmptyInput(cedula:string, nomApell:string, username:string, telefono:string,
                email:string, password:string, confpassword:string) {
    
      if (!cedula || !nomApell || !username || !telefono || !email || !password || !confpassword || !this.isEmptyInputText.invalid
                    || /^\s+|\s+$/g.test(cedula) || /^\s+|\s+$/g.test(nomApell) || /^\s+|\s+$/g.test(username) || /^\s+|\s+$/g.test(telefono)
                    || /^\s+|\s+$/g.test(email) || /^\s+|\s+$/g.test(password) || /^\s+|\s+$/g.test(confpassword)) {
           
      this.isEmptyInputText.markAsTouched();
      return false;
    } else {
      return true;
    }
  }

  registrarUser() {
    const cedula = this.cedula;
    const nomApell = this.nomApell;
    const username = this.username;
    const telefono = this.telefono;
    const email = this.email;
    const password = this.password;
    const confpassword = this.confpassword;

    if (this.isEmptyInput(cedula, nomApell, username, telefono, email, password, confpassword)) {
        if (password === confpassword) {

          const dataUser = JSON.stringify({
            nombrePers: nomApell,
            cedPers: cedula,
            usernamePers: username,
            passwordPers: password,
            correoPers: email,
            telfPers: telefono,
            rolPers: "pasajero"
          });
          
          this.consumeService(dataUser);
          
        } else {
          this.clearMsjDanger();
          this.wrongPassword.markAsTouched();
          this.password = "";
          this.confpassword = "";
        }
    } 
  }

  consumeService(dataUser: any) {
    const url = "http://localhost:8080/personas/insertar-persona";
    const headers = {
      'Content-Type': 'application/json'
    };

    this.http.post(url, dataUser, {headers, observe: 'response'}).subscribe(
      (response: HttpResponse<any>) => {
        if (response && response.status == 200 && response.body) {
          try {
            this.navCtrl.navigateForward('/login');
            this.clearInput();
            this.clearMsjDanger()
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

  clearMsjDanger() {
    this.isEmptyInputText.markAsUntouched();
    this.wrongPassword.markAsUntouched();
  }
  
  clearInput() {
    this.cedula = '';
    this.nomApell = '';
    this.username = '';
    this.telefono = '';
    this.email = '';
    this.password = '';
    this.confpassword = '';
  }
}
