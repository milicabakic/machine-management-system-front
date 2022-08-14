import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../service/api.service";
import {Router} from "@angular/router";
import {MachineService} from "../../service/machine.service";

@Component({
  selector: 'app-add-machine',
  templateUrl: './add-machine.component.html',
  styleUrls: ['./add-machine.component.css']
})
export class AddMachineComponent implements OnInit {

  name: string;

  constructor(private machineService: MachineService, private router: Router) {
    this.name = "";
  }

  ngOnInit(): void {
  }

  addMachine(): void {
    this.machineService.add_machine(this.name).subscribe( res => {
         this.router.navigate(['']);
      }, (error) => {
        alert("Could not create machine. Try again");
        this.name = "";
      }
    );
  }
}
