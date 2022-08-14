import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../service/api.service";
import {JWT, Permission} from "../../model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  username: string;
  password: string;
  permissions: Permission[];
  response: JWT = {
    jwt: ""
  }

  constructor(private apiService: ApiService, private router: Router) {
    this.username = this.apiService.getUsername();
    this.password = "";
    this.permissions = [];
  }

  setConfiguration() {
    if(this.password == "" || this.username == ""){
      alert('All fields are required!');
      return;
    }

    this.apiService.login(this.username, this.password).subscribe( res => {
        this.response = res;
        localStorage.setItem("jwt", this.response.jwt);
        const payload = JSON.parse(atob(this.response.jwt.split('.')[1]));
        localStorage.setItem("username", payload.sub)
        this.apiService.get_permissions(this.username).subscribe(res => {
          this.permissions = res;
          this.apiService.setPermissions(this.permissions);

          if(this.permissions.length === 0){
            alert("You don't have any permission! All actions are disabled")
          }
          this.router.navigate(['']);
        });

      }, (error) => {
        alert("Bad credentials");
        localStorage.clear();
      }
    );


  }

  ngOnInit(): void {
  }

}
