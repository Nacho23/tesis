import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalPicturePage } from './modal-picture';

@NgModule({
  declarations: [
    ModalPicturePage,
  ],
  imports: [
    IonicPageModule.forChild(ModalPicturePage),
  ],
})
export class ModalPicturePageModule {}
