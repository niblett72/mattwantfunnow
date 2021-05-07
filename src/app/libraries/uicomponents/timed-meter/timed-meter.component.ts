import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FunMeterService, IfunMeter } from '../../services/fun-meter.service';
@Component({
  selector: 'timed-meter',
  templateUrl: './timed-meter.component.html',
  styleUrls: ['./timed-meter.component.css']
})
export class TimedMeterComponent {
    private meterScaleUpperLimit = 20;
    private meterScale: number = 0;
    private timeScale: number = 1000;
    private meterRunning: boolean = false;
    meterScales: number[] = this.meterService.getAllScales();
    @Input() set add(val: number) {
        if (val > 0) {
            this.meterScale = this.meterScale + val;
            if (this.meterScale > this.meterScaleUpperLimit) this.meterScale = this.meterScaleUpperLimit;
            if (!this.meterRunning) this.runTimedMeter();
        }
    }
    @Output() currentValue: EventEmitter<number> = new EventEmitter();
    constructor(private meterService: FunMeterService) {}
    private runTimedMeter() {
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
        let elementMeter: IfunMeter = this.getFunMeterForScale(scale);
        let currentMeter: IfunMeter = this.getFunMeterForScale(this.meterScale);
        let cssBase: string = "meter-item";
        let cssLevel: string = cssBase + " meter-level-" + elementMeter.level.toString();
        let cssEmpty: string  = cssBase + " meter-empty";
        if (scale <= this.meterScale) return cssLevel;
        if (currentMeter.level == 0) return cssEmpty;
        return cssBase;        
    }
    private getFunMeterForScale(funMeter: number): IfunMeter {
        return this.meterService.getFunMeters().filter(scale => scale.meters.includes(funMeter))[0];
    }
}
