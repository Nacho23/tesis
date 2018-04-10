import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GodsonDetailsPage } from './godson-details';

@NgModule({
  declarations: [
    GodsonDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(GodsonDetailsPage),
  ],
})
export class GodsonDetailsPageModule {}
