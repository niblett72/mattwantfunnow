import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'timed-meter',
  templateUrl: './timed-meter.component.html',
  styleUrls: ['./timed-meter.component.css']
})
export class TimedMeterComponent {
    meterScaleUpperLimit = 20;
    meterScale: number = 0;
    timeScale: number = 1000;
    meterRunning: boolean = false;
    @Input() set meter(val: number) {
        if (val > 0) {
            this.meterScale = this.meterScale + val;
            if (this.meterScale > this.meterScaleUpperLimit) this.meterScale = this.meterScaleUpperLimit;
            if (!this.meterRunning) this.runTimedMeter();
        }
    }
    @Output() currentValue: EventEmitter<number> = new EventEmitter();
    constructor() { }
    runTimedMeter() {
        this.meterRunning = true;
        setTimeout(() => {
            if (this.meterScale > 0) {
                this.meterScale--
                this.runTimedMeter();
            } else {
                this.meterRunning = false;
            }
            this.currentValue.emit(this.meterScale);
        }, this.timeScale);
    }
}
