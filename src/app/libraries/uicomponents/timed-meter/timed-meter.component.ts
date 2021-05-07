import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
export interface IscaleLevel {
    level: number,
    scales: number[]
}
@Component({
  selector: 'timed-meter',
  templateUrl: './timed-meter.component.html',
  styleUrls: ['./timed-meter.component.css']
})
export class TimedMeterComponent {
    meterScaleUpperLimit = 20;
    meterScales: number[] = Array.from({length: 20}, (_, i) => i + 1).sort((a, b) => b - a);
    meterScale: number = 0;
    timeScale: number = 1000;
    meterRunning: boolean = false;
    @Input() set add(val: number) {
        if (val > 0) {
            this.meterScale = this.meterScale + val;
            if (this.meterScale > this.meterScaleUpperLimit) this.meterScale = this.meterScaleUpperLimit;
            if (!this.meterRunning) this.runTimedMeter();
        }
    }
    @Output() currentValue: EventEmitter<number> = new EventEmitter();
    constructor() {}
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
    getClassForScale(scale: number): string {
        let currentLevel: IscaleLevel = this.getCurrentMeterScaleLevel(scale);
        let level: IscaleLevel = this.getMeterScaleLevel();
        let cssBase: string = "meter-item";
        let cssLevel: string = cssBase + " meter-level-" + currentLevel.level.toString();
        let cssEmpty: string  = cssBase + " meter-empty";
        if (currentLevel.scales.includes(scale) && scale <= this.meterScale) return cssLevel;
        if (level.level == 0) return cssEmpty;
        return cssBase;        
    }
    getScaleClass(scale: number): string {
        let level: IscaleLevel = this.getMeterScaleLevel();
        let cssBase: string = "meter-item";
        let cssLevel: string = cssBase + " meter-level-" + level.level.toString();
        if (level.scales.includes(scale) && scale <= this.meterScale) return cssLevel;
        return cssBase;
    }
    getMeterScaleLevel(): IscaleLevel {
        if (this.meterScale >= 16) return { level: 4, scales: Array.from({length: 20}, (_, i) => i + 1)};
        if (this.meterScale >= 11 && this.meterScale <= 15) return { level: 3, scales: Array.from({length: 15}, (_, i) => i + 1)};
        if (this.meterScale >= 6 && this.meterScale <= 10) return { level: 2, scales: Array.from({length: 10}, (_, i) => i + 1)};
        if (this.meterScale >= 1 && this.meterScale <= 5) return { level: 1, scales: Array.from({length: 5}, (_, i) => i + 1)};
        if (this.meterScale < 1) return { level: 0, scales: []};
    }
    getCurrentMeterScaleLevel(scale: number): IscaleLevel {
        const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
        if (scale >= 16) return { level: 4, scales: range(16, 20, 1)};
        if (scale >= 11 && scale <= 15) return { level: 3, scales: range(11, 15, 1)};
        if (scale >= 6 && scale <= 10) return { level: 2, scales: range(6, 10, 1)};
        if (scale >= 1 && scale <= 5) return { level: 1, scales: range(1, 5, 1)};
        if (scale < 1) return { level: 0, scales: []};
    }
}
