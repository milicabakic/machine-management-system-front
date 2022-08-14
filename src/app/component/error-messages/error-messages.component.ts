import { Component, OnInit } from '@angular/core';
import {ErrorMessage} from "../../model";
import {MachineService} from "../../service/machine.service";

@Component({
  selector: 'app-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.css']
})
export class ErrorMessagesComponent implements OnInit {

  errors: ErrorMessage[]

  constructor(private machineService: MachineService) {
    this.errors = []
  }

  ngOnInit(): void {
    this.machineService.get_errors().subscribe( res => {
      this.errors = res;
    });
  }

}
