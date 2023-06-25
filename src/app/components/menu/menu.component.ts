import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../../services/data-sharing.service';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public items = [
    { name: 'Inicio', image: 'assets/casa.svg' },
    { name: 'Boletos Comprados', image: 'assets/boleto.svg' },
    { name: 'Comprar Boletos', image: 'assets/compra.svg' },
    { name: 'Destinos', image: 'assets/destino.svg' },
    { name: 'Perfil', image: 'assets/user.svg' },
    { name: 'Cerrar Sesión', image: 'assets/cerrar.svg' },
  ];

  private receivedData: any;
  namesUser!: string;
  rolUser!: string;

  constructor(private dataSharingService: DataSharingService,
                private menuController: MenuController, private navCtrl: NavController) {}

  ngOnInit() { }

  onMenuOpen() {
    this.receivedData = this.dataSharingService.getJsonData();
    this.namesUser = this.receivedData.nombrePers;
    this.rolUser = this.receivedData.rolPers;
  }

  onMenuItemClick(item: any) {
    this.navCtrl.navigateForward('/user-profile');
    this.menuController.close();
  }

}
