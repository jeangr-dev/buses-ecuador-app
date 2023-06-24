import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  names!: string;
  username!: string;
  phone!: string;
  email!: string;
  
  constructor() { }

  ngOnInit() {
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
