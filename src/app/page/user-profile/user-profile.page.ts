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

  
  constructor(private dataSharingService: DataSharingService) { }

  ngOnInit() {
    this.receivedData = this.dataSharingService.getJsonData();
    this.names = this.receivedData.nombrePers;
    this.username = this.receivedData.usernamePers;
    this.phone = this.receivedData.telfPers;
    this.email = this.receivedData.correoPers;
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
