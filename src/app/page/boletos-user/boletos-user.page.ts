import { HttpClient,HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-boletos-user',
  templateUrl: './boletos-user.page.html',
  styleUrls: ['./boletos-user.page.scss'],
})

export class BoletosUserPage implements OnInit {
  private receivedData: any;
  user!:number;
  idRoute!:number;
  boletos!: any[];
  boletosConInfoAdicional: any[] = [];
  backupBoletosConInfoAdicional: any[] = []
  rutas!: any[];
  nombreRuta!:string;
  marcaChasisBus!:string;
  nombreCoop!:string;
  qrCodeValue!: string;
  showBackdrop: boolean = false;
  public itemsRoutesFilter=[
    { ciudadFinRuta: 'Nombre destino', numBus:"1", cooperativa:"Santa",fechaHora:"fecha y hora"},

  ];

  constructor(private http: HttpClient,private dataSharingService: DataSharingService,private modalController: ModalController) { }
  
  ngOnInit() {
    this.initBoletos();
    this.getBoletos();
    
  }
  
  toggleBackdrop() {
    this.showBackdrop = !this.showBackdrop;
  }

  getBoletos() {
    const url = 'http://localhost:8080/boletos/obtener-boletos'; 
    this.http.get<any[]>(url).subscribe((boletos: any[]) => {
      const id= this.user;
      this.boletos=boletos.filter(boleto => boleto.idPersBol === id);
      this.boletos.forEach(boleto => {
        const rutaBoleto = boleto['idRutaBol'];
        const asientoBoleto = boleto['idAsienBol'];
        const urlRuta = 'http://localhost:8080/rutas/obtener-ruta-por-id/'+ rutaBoleto;
        this.http.get(urlRuta,{observe: 'response' }).subscribe(
          (response: HttpResponse<any>) => {
            boleto.nombreRuta=response.body.ciudadFinRuta;
        });
        const urlAsiento = 'http://localhost:8080/asientos/obtener-asiento-por-id/'+ asientoBoleto;
        this.http.get(urlAsiento,{observe: 'response' }).subscribe(
          (response: HttpResponse<any>) => {
            const idBus=response.body.idBusAsien;
            const urlBus = 'http://localhost:8080/buses/obtener-bus-por-id/'+ idBus;
        this.http.get(urlBus,{observe: 'response' }).subscribe(
          (response: HttpResponse<any>) => {
            const coop=response.body.idCoopBus;
            boleto.marcaChasisBus=response.body.marcaChasisBus;
            const urlCoop = 'http://localhost:8080/cooperativas/obtener-cooperativa-por-id/'+ coop;
            this.http.get(urlCoop,{observe: 'response' }).subscribe(
              (response: HttpResponse<any>) => {
                boleto.nombreCoop=response.body.nombreCoop;
                this.boletosConInfoAdicional.push(boleto);
                this.generarQRCode(this.boletosConInfoAdicional);
                this.backupBoletosConInfoAdicional = [...this.boletosConInfoAdicional];
            });
        });
        });   
      });
    }); 
  }

  initBoletos(){
    this.receivedData = this.dataSharingService.getJsonData();
    this.user=this.receivedData.idPers;
  }

  onSearchChange(event: any) {
    const searchTerm = event.target.value;
    if (searchTerm) {
      this.boletosConInfoAdicional = this.backupBoletosConInfoAdicional.filter(boleto =>
        boleto.nombreRuta.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      // Si no hay un término de búsqueda, restaura la lista original
      this.boletosConInfoAdicional = [...this.backupBoletosConInfoAdicional];
    }
  }

  generarQRCode(boleto: any[]) {
    // Obtener los datos necesarios para generar el código QR a partir del objeto 'boleto'
    const qrCodeData = JSON.stringify(boleto);
    console.log(qrCodeData);
    // Asignar el valor a la propiedad 'qrCodeValue' para mostrar el código QR en el HTML
    this.qrCodeValue = qrCodeData;
  
  }

  async closeModal() {
    await this.modalController.dismiss({
      dismissed: true
    });
  }
}