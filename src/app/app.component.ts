import { Component } from '@angular/core';
export interface IfunLevel {
    level: number,
    meters: number[],
    message: string,
    icon: string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    funMeter: number = 20;
    funLevel: IfunLevel = this.getFunLevel(this.funMeter);
    addFunTimes(value: number) {
        this.funMeter = value;
    }
    setFunLevel(val: number): void {
        this.funLevel = this.getFunLevel(val);
    }
    getFunLevel(meter): IfunLevel {
        let funLevels: IfunLevel[] = [{
            level: 4,
            meters: [16, 17, 18, 19, 20],
            message: "Matt is having fun!",
            icon: "mood"
        }, {
            level: 3,
            meters: [11, 12, 13, 14, 15],
            message: "Matt is whelmed by the fun",
            icon: "sentiment_satisfied"
        }, {
            level: 2,
            meters: [6, 7, 8, 9, 10],
            message: "Matt needs fun times, now!",
            icon: "sentiment_neutral"
        }, {
            level: 1,
            meters: [1, 2, 3, 4, 5],
            message: "Matt will power down soon...",
            icon: "sentiment_very_dissatisfied"
        }, {
            level: 0,
            meters: [0],
            message: "Matt has powered down...",
            icon: "mood_bad"
        }];
        return funLevels.filter(fl => fl.meters.includes(meter))[0];
    }
}