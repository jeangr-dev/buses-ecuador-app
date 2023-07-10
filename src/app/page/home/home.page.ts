import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  onClickDestinos() {
    this.navCtrl.navigateForward('/destinos-user');
  }
  onClickBoletosCompr() {
    this.navCtrl.navigateForward('/boletos-user');
  }
  onClickComprBoletos() {
    this.navCtrl.navigateForward('/comprar-boletos');
  }
  onClickLogout() {
    this.navCtrl.navigateForward('/login');
  }

}
