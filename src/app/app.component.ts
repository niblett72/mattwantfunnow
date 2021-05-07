import { Component } from '@angular/core';
import { FunMeterService, IfunMeter } from './libraries/services/fun-meter.service';
export interface IfunLevel {
    level: number,
    meters: number[],
    message: string,
    icon: string,
    image: string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    funTimes: number = 20;
    funLevel: IfunLevel = this.getFunLevel(this.funTimes);
    constructor(private meterService: FunMeterService) {}
    addFunTimes(value: number) {
        this.funTimes = value;
    }
    setFunLevel(val: number): void {
        this.funLevel = this.getFunLevel(val);
    }
    getFunLevel(funMeter): IfunMeter {
        return this.meterService.getFunMeters().filter(meter => meter.meters.includes(funMeter))[0];
    }
}