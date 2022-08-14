import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../service/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  id: number;
  name: string;
  surname: string;
  username: string;
  password: string;
  permissions: string[];
  selectedPermissions: string[];

  constructor(private apiService: ApiService, private router: Router) {
    this.id = 0;
    this.name = "";
    this.surname = "";
    this.password = "";
    this.username = "";
    this.permissions = [];
    this.selectedPermissions = [];
  }

  ngOnInit(): void {
    let user = this.apiService.getUserToUpdate();
    this.id = user.id;
    this.name = user.name;
    this.surname = user.surname;
    this.username = user.username;
    this.apiService.get_permissions(user.username).subscribe(res => {
      res.forEach( p => {
        this.permissions.push(p.name);
      });
      (<HTMLInputElement>document.getElementById("permissions")).innerText = JSON.stringify(this.permissions);
    })
  }

  updateUser(): void {
    if (this.name == "" || this.surname  == "" || this.username == "") {
      alert('All fields are required!');
      return;
    }

    this.apiService.update_user(this.id, this.username, this.name, this.surname).subscribe( res => {
        this.apiService.add_permissions(this.username, this.selectedPermissions).subscribe(res => {});
        this.router.navigate(['users']);
      }
    );

  }

}
