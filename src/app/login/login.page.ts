import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username!: string;
  password!: string;

  constructor(private http: HttpClient, private navCtrl: NavController) { }

  ngOnInit() {
  }

  ingresar() {
    const url = 'http://localhost:8080/personas/login';
    const username = this.username;
    const password = this.password;

    const credentials = {
      Authorization: 'Basic ' + btoa(username + ':' + password)
    };

    this.http.post(url, { credentials }).subscribe(
      (response) => {
        this.navCtrl.navigateForward('/home');
      },
      (error) => {
        console.error(error);
        
      }
    );
  }

  register_user() {
    this.navCtrl.navigateForward('/register-user')
  }
}
