import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-destinos-user',
  templateUrl: './destinos-user.page.html',
  styleUrls: ['./destinos-user.page.scss'],
})
export class DestinosUserPage implements OnInit {

  num_bus!: string;
  nom_coop!: string;
  placa_bus!: string;
  destino_final!: string;
  tipo_viaje!: string;
  paradas!: string; 
  hora!: string;



  items: any[] = [
    { id: 1, name: 'Item 1', description: 'Descripción del Item 1' },
    { id: 2, name: 'Item 2', description: 'Descripción del Item 2' },
    { id: 3, name: 'Item 3', description: 'Descripción del Item 3' },
  ];

  selectedItems: any[] = [];

  showBackdrop: boolean = false;

  constructor() { }

  ngOnInit() {
  }


}
