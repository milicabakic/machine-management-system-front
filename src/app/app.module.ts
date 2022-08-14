import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './component/app/app.component';
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './component/login/login.component';
import { UsersComponent } from './component/users/users.component';
import { AddUserComponent } from './component/add-user/add-user.component';
import { HomeComponent } from './component/home/home.component';
import { UpdateUserComponent } from './component/update-user/update-user.component';
import { AddMachineComponent } from './component/add-machine/add-machine.component';
import { MachinesComponent } from './component/machines/machines.component';
import { ScheduleMachineActionComponent } from './component/schedule-machine-action/schedule-machine-action.component';
import { ErrorMessagesComponent } from './component/error-messages/error-messages.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    AddUserComponent,
    HomeComponent,
    UpdateUserComponent,
    AddMachineComponent,
    MachinesComponent,
    ScheduleMachineActionComponent,
    ErrorMessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
