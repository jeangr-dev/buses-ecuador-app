import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-destinos-user',
  templateUrl: './destinos-user.page.html',
  styleUrls: ['./destinos-user.page.scss'],
})
export class DestinosUserPage implements OnInit {

  items: any[] = [
    { id: 1, name: 'Item 1', description: 'Descripción del Item 1' },
    { id: 2, name: 'Item 2', description: 'Descripción del Item 2' },
    { id: 3, name: 'Item 3', description: 'Descripción del Item 3' },
  ];

  selectedItems: any[] = [];

  constructor() { }

  ngOnInit() {
  }

  selectItem(item: any) {
    const index = this.selectedItems.indexOf(item);
    if (index > -1) {
      this.selectedItems.splice(index, 1); // Deseleccionar elemento si ya está seleccionado
    } else {
      this.selectedItems.push(item); // Seleccionar elemento si no está seleccionado
    }
  }

  isSelected(item: any): boolean {
    return this.selectedItems.indexOf(item) > -1;
  }

}
