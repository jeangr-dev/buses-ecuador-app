import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private userData: any;
  private dataViaje: any;

  constructor() { }

  setJsonData(data: any) {
    this.userData = data;
  }

  getJsonData() {
    return this.userData;
  }

  setDataViaje(data: any) {
    this.dataViaje = data;
  }

  getDataViaje() {
    return this.dataViaje;
  }

}
