import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MachineService} from "../../service/machine.service";

@Component({
  selector: 'app-schedule-machine-action',
  templateUrl: './schedule-machine-action.component.html',
  styleUrls: ['./schedule-machine-action.component.css']
})
export class ScheduleMachineActionComponent implements OnInit {

  selectedMachine: string;
  selectedAction: string;
  date: Date;
  startPermission: boolean;
  restartPermission: boolean;
  stopPermission: boolean;
  machines_string: string[];

  constructor(private router: Router, private machineService: MachineService) {
    this.selectedMachine = "";
    this.selectedAction = "";
    this.date = new Date();
    this.startPermission = false;
    this.stopPermission = false;
    this.restartPermission = false;
    this.machines_string = [];
  }

  ngOnInit(): void {
    this.machineService.get_machines().subscribe( res => {
      res.forEach(p => {
        this.machines_string.push(p.id + " " + p.name + ", status: " + p.status);
      });
    });

    if(localStorage.getItem("can_start_machines") === "true"){
      this.startPermission = true;
    }
    if(localStorage.getItem("can_restart_machines") === "true"){
      this.restartPermission = true;
    }
    if(localStorage.getItem("can_stop_machines") === "true"){
      this.stopPermission = true;
    }
  }

  schedule_action() {
    if(this.selectedMachine == "" || this.selectedAction == ""){
      alert("All fields are required!")
      return;
    }

    let str = (this.selectedMachine.toString().split(" "))[0];
    let id = parseInt(str)
    this.machineService.schedule_action(id, this.selectedAction, this.date).subscribe(res => {
      console.log(res);
    })
  }

}
