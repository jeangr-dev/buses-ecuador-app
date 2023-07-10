import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-boletos-user',
  templateUrl: './lista-boletos-user.page.html',
  styleUrls: ['./lista-boletos-user.page.scss'],
})
export class ListaBoletosUserPage implements OnInit {
  public itemsRoutesFilter=[
    { ciudadFinRuta: 'Nombre destino', numBus:"1", cooperativa:"Santa",fechaHora:"fecha y hora"},

  ];
  constructor() { }

  ngOnInit() {
  }

}
