import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListGodsonPage } from './list-godson';

@NgModule({
  declarations: [
    ListGodsonPage,
  ],
  imports: [
    IonicPageModule.forChild(ListGodsonPage),
  ],
})
export class ListGodsonPageModule {}
