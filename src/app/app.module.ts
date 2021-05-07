import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './libraries/material.module';
import { UIComponentsModule } from './libraries/uicomponents/uicomponents.module';
import { FunMeterService } from './libraries/services/fun-meter.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UIComponentsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [
      FunMeterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
