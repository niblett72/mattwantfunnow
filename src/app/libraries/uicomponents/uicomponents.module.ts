import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { TimedMeterComponent } from './timed-meter/timed-meter.component';

@NgModule({
    declarations: [
    TimedMeterComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        MaterialModule
    ],
    exports: [
        TimedMeterComponent
    ],
    providers: []
})
export class UIComponentsModule { }