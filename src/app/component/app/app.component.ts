import { Component } from '@angular/core';
import {ConfigService} from "../../service/config.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'domaci3front';

  constructor(private configService: ConfigService) {
  }

  getUsername() {
    return this.configService.getUsername();
  }

}
