import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParamProfilePage } from './param-profile';

@NgModule({
  declarations: [
    ParamProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ParamProfilePage),
  ],
})
export class ParamProfilePageModule {}
