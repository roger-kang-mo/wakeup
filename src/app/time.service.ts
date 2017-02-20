import { Injectable } from '@angular/core';

@Injectable()
export class TimeService {
  cycleInterval: number;

  constructor() {
    this.cycleInterval = 1.5 * 3600000;
  }

  getTimes(offset): Date[]{
    let convertedOffset = offset * 1000 * 60;

    let dates = [];
    let base = (new Date()).getTime() + 840000 + convertedOffset;
    for (let i of [1,2,3,4,5]) {
      let pizza = this.cycleInterval * i;
      let sampleDate = new Date(base + pizza);
      dates.push(sampleDate);
    }

    return dates;
  }

}
