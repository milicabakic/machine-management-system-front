import { Component, OnInit } from '@angular/core';
import {Permission, User} from "../../model";
import {ApiService} from "../../service/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[]
  permissions: Permission[]
  deletePermission: boolean
  updatePermission: boolean
  updateForbidden: boolean

  constructor(private apiService: ApiService, private router: Router) {
     this.users = [];
     this.permissions = [];
     this.deletePermission = false;
     this.updatePermission = false;
     this.updateForbidden = false;
  }

  ngOnInit(): void {
    console.log("ngOnInit")
    this.apiService.get_users().subscribe( res => {
      this.users = res;
/*
      this.users.forEach(user => {
        user.permissions = [];
        this.apiService.get_permissions(user.username).subscribe(perm => {
          this.permissions = perm;
          this.permissions.forEach(p => {
            user.permissions.push(p.name);
          })
        })
      })

        */
    })

    if(localStorage.getItem("can_delete_users") === "true"){
      this.deletePermission = true;
    }
    if(localStorage.getItem("can_update_users") === "true"){
      this.updatePermission = true;
    }
    else{
      this.updateForbidden = true;
    }

  }

  delete(user_id: number): void {
    this.apiService.delete_user(user_id).subscribe(res => {
      this.apiService.get_users().subscribe(r => {
        this.users = r;
      })
    });
  }

  update(user: User): void {
    this.apiService.setUserToUpdate(user);
    this.router.navigate(['update-user']);
  }

}
