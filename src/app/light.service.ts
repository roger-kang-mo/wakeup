import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from "@angular/http";
import { environment } from '../environments/environment'

@Injectable()
export class LightService {
  lightUrl: String;
  transitiontime = 100;
  defaultOnBrightness = 200;

  constructor(private http:Http) {
    this.lightUrl = `http://${environment.bridge_ip}/api/${environment.dash_username}/groups/${environment.room_group_id}/action`;
  }

  public off(): void {
    this.makeRequest({on: false});
  }

  public on(params): void {
    let options = {
      on: true,
      transitiontime: this.transitiontime,
      bri: this.defaultOnBrightness
    }
    if(params.transitiontime) options.transitiontime = params.transitiontime;
    if(params.bri) options.bri = params.bri;

    // transitiontime only works when changing brightness, make sure lights are on
    this.makeRequest({on: true, bri: 1, transitiontime: 0});

    console.log("Turning lights on to " + options.bri + " brightness over " + (options.transitiontime/10) + " seconds.");
    this.makeRequest(options);
  }

  private makeRequest(params) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let request = this.http.put(
      `${this.lightUrl}`,
      params,
      options
    ).subscribe(null, error => console.log(error));

    return request;
  }
}
