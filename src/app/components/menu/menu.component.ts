import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../../services/data-sharing.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  
  private receivedData: any;
  namesUser!: string;
  rolUser!: string;
  usuarioLogueado!: boolean;
  public items = [
    { name: 'Inicio', image: 'assets/casa.svg', redirect:"home"},
    { name: 'Boletos Comprados', image: 'assets/boleto.svg', redirect:"boletos-user" },
    { name: 'Comprar Boletos', image: 'assets/destino.svg', redirect:"destinos-user" },
    { name: 'Perfil', image: 'assets/user.svg' , redirect:"user-profile"},
    { name: 'Cerrar Sesión', image: 'assets/cerrar.svg', redirect:"login" }
  ];
  
  public boletos = [
    { name: 'Registrar pasajeros', image: 'assets/lista.svg', redirect:"lista-boletos-user"},
    { name: 'Perfil', image: 'assets/user.svg' , redirect:"user-profile"},
    { name: 'Cerrar Sesión', image: 'assets/cerrar.svg', redirect:"login" }
  ];


  constructor(private dataSharingService: DataSharingService) {}

  ngOnInit() { 


  }

  onMenuOpen() {
    this.receivedData = this.dataSharingService.getJsonData();
    this.namesUser = this.receivedData.nombrePers;
    this.rolUser = this.receivedData.rolPers;
    if(this.rolUser==="aprobador"){
      this.usuarioLogueado=true;
    }else{
      this.usuarioLogueado=false;
    }
  }
  
  
  

}
