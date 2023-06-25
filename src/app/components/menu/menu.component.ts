import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../../services/data-sharing.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public items = [
    { name: 'Inicio', image: 'assets/casa.svg', redirect:"user-profile"},
    { name: 'Boletos Comprados', image: 'assets/boleto.svg', redirect:"#" },
    { name: 'Comprar Boletos', image: 'assets/compra.svg', redirect:"#" },
    { name: 'Destinos', image: 'assets/destino.svg', redirect:"#" },
    { name: 'Perfil', image: 'assets/user.svg' , redirect:"#"},
    { name: 'Cerrar Sesión', image: 'assets/cerrar.svg', redirect:"#" }
  ];

  private receivedData: any;
  namesUser!: string;
  rolUser!: string;

  constructor(private dataSharingService: DataSharingService) {}

  ngOnInit() { }

  onMenuOpen() {
    this.receivedData = this.dataSharingService.getJsonData();
    this.namesUser = this.receivedData.nombrePers;
    this.rolUser = this.receivedData.rolPers;
  }


}
