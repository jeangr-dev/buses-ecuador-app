import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-destinos-user',
  templateUrl: './destinos-user.page.html',
  styleUrls: ['./destinos-user.page.scss'],
})
export class DestinosUserPage implements OnInit {

  private urlRutas = 'http://localhost:8080/rutas/obtener-rutas';

  num_bus!: string;
  nom_coop!: string;
  placa_bus!: string;
  destino_final!: string;
  tipo_viaje!: string;
  paradas!: string;
  hora!: string;

  options!: any[];
  selectedOption: any;

  items: any[] = [
    { id: 1, name: 'Item 1', description: 'Descripción del Item 1' },
    { id: 2, name: 'Item 2', description: 'Descripción del Item 2' },
    { id: 3, name: 'Item 3', description: 'Descripción del Item 3' },
  ];

  selectedItems: any[] = [];

  showBackdrop: boolean = false;

  constructor(private http: HttpClient) {
    this.recoverCities();

  }

  ngOnInit() {
  }

  clearSelection() {
    this.selectedOption = null; 
  }

  recoverCities() {
    
    this.http.get<any[]>(this.urlRutas).subscribe(
      (response) => {
        if (response !== null) {
          this.options = this.cleanOptionsCities(response);
        }
      },
      (error) => {
        console.error('Error al recuperar ciudades:', error);
      }
    );
  }

  cleanOptionsCities(response: any): any[] {
    const propertyName = 'ciudadIniRuta';
    const listCities: any[] = [];
    const seenProperties: Set<any> = new Set();
    for (const json of response) {
      const property = json[propertyName];
      if (!seenProperties.has(property)) {
        seenProperties.add(property);
        listCities.push(property);
      }
    }
    return listCities;
  }

 

  mostrarDestinos() {
    


  }


}
