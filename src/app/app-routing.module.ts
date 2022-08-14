import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./component/login/login.component";
import {UsersComponent} from "./component/users/users.component";
import {AuthGuard} from "./guard/auth.guard";
import {AddUserComponent} from "./component/add-user/add-user.component";
import {HomeComponent} from "./component/home/home.component";
import {UpdateUserComponent} from "./component/update-user/update-user.component";
import {AddUserGuard} from "./guard/add-user.guard";
import {UpdateUserGuard} from "./guard/update-user.guard";
import {UsersGuard} from "./guard/users.guard";
import {AddMachineComponent} from "./component/add-machine/add-machine.component";
import {MachinesComponent} from "./component/machines/machines.component";
import {ScheduleMachineActionComponent} from "./component/schedule-machine-action/schedule-machine-action.component";
import {AddMachineGuard} from "./guard/add-machine.guard";
import {SearchMachineGuard} from "./guard/search-machine.guard";
import {ErrorMessagesComponent} from "./component/error-messages/error-messages.component";
import {MachinesGuard} from "./guard/machines.guard";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "users",
    component: UsersComponent,
    canActivate: [AuthGuard, UsersGuard]
  },
  {
    path: "add-user",
    component: AddUserComponent,
    canActivate: [AuthGuard, AddUserGuard]
  },
  {
    path: "update-user",
    component: UpdateUserComponent,
    canActivate: [AuthGuard, UpdateUserGuard]
  },
  {
    path: "add-machine",
    component: AddMachineComponent,
    canActivate: [AuthGuard, AddMachineGuard]
  },
  {
    path: "machines",
    component: MachinesComponent,
    canActivate: [AuthGuard, SearchMachineGuard]
  },
  {
    path: "schedule",
    component: ScheduleMachineActionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "errors",
    component: ErrorMessagesComponent,
    canActivate: [AuthGuard, MachinesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
