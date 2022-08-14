import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../service/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  name: string;
  surname: string;
  username: string;
  password: string;
  permissions: string[];

  constructor(private apiService: ApiService, private router: Router) {
    this.name = "";
    this.surname = "";
    this.username = "";
    this.password = "";
    this.permissions = [];
  }

  ngOnInit(): void {

  }

  addUser() {
    if (this.name == "" || this.surname == "" || this.password == "" || this.username == "") {
      alert('All fields are required!');
      return;
    }

    this.apiService.add_user(this.username, this.password, this.name, this.surname).subscribe( res => {
        this.apiService.add_permissions(this.username, this.permissions).subscribe( res => {
          this.router.navigate(['']);
        });
      }, (error) => {
        alert("User with this username already exists!");
        this.name = "";
        this.surname = "";
        this.username = "";
        this.password = "";
        this.permissions = [];
      }
    );
  }


}
