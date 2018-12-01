import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeGodfatherPage } from './home-godfather';

@NgModule({
  declarations: [
    HomeGodfatherPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeGodfatherPage),
  ],
})
export class HomeGodfatherPageModule {}
