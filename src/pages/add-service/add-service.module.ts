import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddServicePage } from './add-service';

@NgModule({
  declarations: [
    AddServicePage,
  ],
  imports: [
    IonicPageModule.forChild(AddServicePage),
  ],
})
export class AddServicePageModule {}
