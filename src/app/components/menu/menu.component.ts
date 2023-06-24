import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {
  public items = [
    { name: 'Inicio', image: 'assets/casa.svg' },
    { name: 'Boletos Comprados', image: 'assets/boleto.svg' },
    { name: 'Comprar Boletos', image: 'assets/compra.svg' },
    { name: 'Destinos', image: 'assets/destino.svg' },
    { name: 'Perfil', image: 'assets/user.svg' },
    { name: 'Cerrar Sesión', image: 'assets/cerrar.svg' }
  ];
  constructor() { }

  ngOnInit() {}

}
