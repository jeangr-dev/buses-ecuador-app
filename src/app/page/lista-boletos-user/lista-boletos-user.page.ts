import { HttpClient,HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-boletos-user',
  templateUrl: './lista-boletos-user.page.html',
  styleUrls: ['./lista-boletos-user.page.scss'],
})
export class ListaBoletosUserPage implements OnInit {
  public options=[
    { Nombre: 'MITSUBISHI', id:945},
    { Nombre: 'TOYOTA', id:946},
    { Nombre: 'MITSUBISHI', id:947},
  ];
  isChecked!: boolean;
  boletos!: any[];
  boletosConInfoAdicional: any[] = [];
  backupBoletosConInfoAdicional: any[] = []
  constructor(private http: HttpClient) { }

  ngOnInit() {
    
  }

  selectedValue!: number;
  
  getBoletosBuses(){
    this.boletosConInfoAdicional = [];
    const url = 'http://localhost:8080/asientos/obtener-asientos/';
    this.http.get<any[]>(url).subscribe((boletos: any[]) => {
      const id= this.selectedValue;
      this.boletos=boletos.filter(boleto => boleto.idBusAsien === id);
      this.boletos.forEach(boleto => {
        const busBoleto = boleto['idBusAsien'];
        boleto.tipoBoleto = boleto['tipoAsien'];
        boleto.numBoleto = boleto['numeroAsiento'];
        this.obtenerInformacionAdicional(busBoleto, boleto);
      });      
  });
}

obtenerInformacionAdicional(busBoleto: number, boleto: any) {
  const urlBus = 'http://localhost:8080/buses/obtener-bus-por-id/' + busBoleto;
  this.http.get(urlBus, { observe: 'response' }).subscribe(
    (response: HttpResponse<any>) => {
      boleto.placaBus = response.body.placaBus;
      this.boletosConInfoAdicional.push(boleto);
      this.backupBoletosConInfoAdicional = [...this.boletosConInfoAdicional];
    }
  );
}


onSearchChange(event: any) {
  const searchTerm = event.target.value;
  if (searchTerm) {
    this.boletosConInfoAdicional = this.backupBoletosConInfoAdicional.filter(boleto =>
      boleto.tipoBoleto.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } else {
    // Si no hay un término de búsqueda, restaura la lista original
    this.boletosConInfoAdicional = [...this.backupBoletosConInfoAdicional];
  }
}

}
