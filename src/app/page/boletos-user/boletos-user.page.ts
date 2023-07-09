import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-boletos-user',
  templateUrl: './boletos-user.page.html',
  styleUrls: ['./boletos-user.page.scss'],
})
export class BoletosUserPage implements OnInit {
  public itemsRoutesFilter=[
    { ciudadFinRuta: 'Nombre destino', numBus:"1", cooperativa:"Santa",fechaHora:"fecha y hora"},

  ];

  constructor(private http: HttpClient) { }
  
  ngOnInit() {
  }

  

}
