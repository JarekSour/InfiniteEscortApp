import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateContactPage } from './update-contact';

@NgModule({
  declarations: [
    UpdateContactPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateContactPage),
  ],
})
export class UpdateContactPageModule {}
