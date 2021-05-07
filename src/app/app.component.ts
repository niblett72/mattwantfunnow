import { Component } from '@angular/core';
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
    addFunTimes(value: number) {
        this.funTimes = value;
    }
    setFunLevel(val: number): void {
        this.funLevel = this.getFunLevel(val);
    }
    getFunLevel(meter): IfunLevel {
        let funLevels: IfunLevel[] = [{
            level: 4,
            meters: [16, 17, 18, 19, 20],
            message: "Matt is having fun!",
            icon: "mood",
            image: "/assets/images/4.matt-fun.png"
        }, {
            level: 3,
            meters: [11, 12, 13, 14, 15],
            message: "Matt is whelmed by the fun",
            icon: "sentiment_satisfied",
            image: "/assets/images/3.matt-whelmed.png"
        }, {
            level: 2,
            meters: [6, 7, 8, 9, 10],
            message: "Matt needs fun times, now!",
            icon: "sentiment_neutral",
            image: "/assets/images/2.matt-needsfun.png"
        }, {
            level: 1,
            meters: [1, 2, 3, 4, 5],
            message: "Matt will power down soon...",
            icon: "sentiment_very_dissatisfied",
            image: "/assets/images/1.matt-poweringdown.png"
        }, {
            level: 0,
            meters: [0],
            message: "You let Matt power down!",
            icon: "mood_bad",
            image: "/assets/images/0.matt-powerdown.png"
        }];
        return funLevels.filter(fl => fl.meters.includes(meter))[0];
    }
}