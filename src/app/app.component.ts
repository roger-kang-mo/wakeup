import { Component } from '@angular/core';
import { TimeService } from './time.service';
import { LightService } from './light.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentDate: Date;
  sleepNow: boolean;
  availableTimes: Date[];
  riseTime: Date;
  SLOW_LIGHTS_ON_DURATION = 9000;
  timer;

  constructor(private timeService: TimeService, private lightService: LightService) {
    this.currentDate = new Date();
    this.availableTimes = [];
  }

  generateTimes(): void {
    this.availableTimes = this.timeService.getTimes();
  }

  setTime(time): void {
    if(!this.riseTime || this.riseTime.getTime() != time.getTime()){
      if(this.timer) clearTimeout(this.timer);

      this.riseTime = time;
      let currentTime = new Date();
      let timerTime = (time.getTime() - currentTime.getTime())/1000;

      console.log("I'll turn the lights on in "+ timerTime + " seconds...");
      this.timer = setTimeout(() => {
        this.turnOnLightsSlowly();
      }, 5000)
    }
  }

  turnOffLights(): void {
    this.lightService.off();
  }

  turnOnLights(): void {
    this.lightService.on({});
  }

  turnOnLightsSlowly(): void {
    this.lightService.on({transitiontime: 100});
  }
}
