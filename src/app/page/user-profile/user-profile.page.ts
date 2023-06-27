import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../../services/data-sharing.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  
  private receivedData: any;
  names!: string;
  username!: string;
  phone!: string;
  email!: string;
  
  isEditingNom = false;
  isEditingUser = false;
  isEditingPhone = false;
  isEditingEmail = false;
  
  
  constructor(private dataSharingService: DataSharingService) { }

  ngOnInit() {
    this.receivedData = this.dataSharingService.getJsonData();
    this.names = this.receivedData.nombrePers;
    this.username = this.receivedData.usernamePers;
    this.phone = this.receivedData.telfPers;
    this.email = this.receivedData.correoPers;
  }


  cambiarEstado1(): void {
    this.isEditingNom = !this.isEditingNom;
    this.isEditingUser = false;
    this.isEditingPhone = false;
    this.isEditingEmail = false;
  }
  cambiarEstado2(): void {
    this.isEditingUser = !this.isEditingUser;
    this.isEditingNom = false;
    this.isEditingPhone = false;
    this.isEditingEmail = false;
  }
  cambiarEstado3(): void {
    this.isEditingPhone = !this.isEditingPhone;
    this.isEditingUser = false;
    this.isEditingNom = false;
    this.isEditingEmail = false;
  }
  cambiarEstado4(): void {
    this.isEditingEmail = !this.isEditingEmail;
    this.isEditingUser = false;
    this.isEditingNom = false;
    this.isEditingPhone = false;
  }
 


  editNames() {

  }

  editUsername() {

  }

  editPhone() {

  }

  editEmail(){
    
  }

  changePassword() {

  }

}
