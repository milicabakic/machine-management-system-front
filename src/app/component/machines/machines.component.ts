import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Machine} from "../../model";
import {MachineService} from "../../service/machine.service";

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css']
})
export class MachinesComponent implements OnInit {

  name: string;
  status: string;
  dateFrom: Date;
  dateTo: Date;
  machines: Machine[];
  destroyPermission: boolean;
  startPermission: boolean;
  restartPermission: boolean;
  stopPermission: boolean;
  actionPermission: boolean;

  constructor(private machineService: MachineService, private router: Router) {
    this.name = "";
    this.status = "";
    this.dateFrom = new Date();
    this.dateTo = new Date();
    this.machines = [];
    this.destroyPermission = false;
    this.startPermission = false;
    this.restartPermission = false;
    this.stopPermission = false;
    this.actionPermission = false;
  }

  ngOnInit(): void {
    console.log("ngOnInit")
    this.machineService.get_machines().subscribe( res => {
      this.machines = res;
    });

    if(localStorage.getItem("can_destroy_machines") === "true"){
      this.destroyPermission = true;
    }
    if(localStorage.getItem("can_start_machines") === "true"){
      this.startPermission = true;
      this.actionPermission = true;
    }
    if(localStorage.getItem("can_restart_machines") === "true"){
      this.restartPermission = true;
      this.actionPermission = true;
    }
    if(localStorage.getItem("can_stop_machines") === "true"){
      this.stopPermission = true;
      this.actionPermission = true;
    }
  }

  searchMachine(): void {
    if(this.name == "" && this.status == ""){

    }

    this.machineService.search_machines(this.name, this.status, this.dateFrom, this.dateTo).subscribe(res => {
      this.machines = res;
    })
  }

  destroy(machine_id: number): void {
    this.machineService.destroy_machine(machine_id).subscribe(res => {
      this.machineService.get_machines().subscribe( r => {
        this.machines = r;
      })
    });
  }

  start(machine_id: number): void {
    this.machineService.start_machine(machine_id).subscribe(res => {
      setTimeout(() => {
        this.ngOnInit()
      }, 5000);
      setTimeout(() => {
        this.ngOnInit()
      }, 10000);
      setTimeout(() => {
        this.ngOnInit()
      }, 15000);
    });
  }

  restart(machine_id: number): void {
    this.machineService.restart_machine(machine_id).subscribe(res => {
      setTimeout(() => {
        this.ngOnInit()
      }, 5000);
      setTimeout(() => {
        this.ngOnInit()
      }, 10000);
      setTimeout(() => {
        this.ngOnInit()
      }, 15000);
    });
  }

  stop(machine_id: number): void {
    this.machineService.stop_machine(machine_id).subscribe(res => {
      setTimeout(() => {
        this.ngOnInit()
      }, 5000);
      setTimeout(() => {
        this.ngOnInit()
      }, 10000);
      setTimeout(() => {
        this.ngOnInit()
      }, 15000);
    });
  }

  schedule(): void {
    this.router.navigate(['schedule']);
  }

}
